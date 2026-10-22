"""Build the data for the interactive service area map (components/ServiceAreaMap).

Run once by hand when the service area changes; the page itself never talks to a map service.
Downloads the administrative boundaries from OpenStreetMap (Overpass API, data © OpenStreetMap
contributors, ODbL), simplifies them to SVG paths and computes driving distance and time from
the office once (OSRM demo server). Writes app/content/serviceAreaMap.ts.

    python3 scripts/service-area-map.py
"""

import json
import math
import time
import urllib.parse
import urllib.request
from pathlib import Path

USER_AGENT = "arampflege-website-service-area-map/1.0 (one-off build script)"
OUT = Path(__file__).resolve().parent.parent / "app" / "content" / "serviceAreaMap.ts"

# Ochtruper Straße 83, 48599 Gronau (Westfalen), geocoded via Nominatim
OFFICE = (52.2077663, 7.0395116)

# OSM relation ids: municipalities (admin_level 8) and the district of Epe (admin_level 9)
REGIONS = [
    ("gronau", "Gronau", "48599", 162865),
    ("epe", "Gronau-Epe", "48599", 9370379),
    ("ochtrup", "Ochtrup", "48607", 155790),
    ("heek", "Heek", "48619", 162873),
    ("ahaus", "Ahaus", "48683", 162877),
]

WIDTH = 640
PADDING = 16
TOLERANCE_PX = 0.6


def http_json(url: str, data: bytes | None = None):
    request = urllib.request.Request(url, data=data, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=120) as response:
        return json.load(response)


def overpass(query: str):
    body = urllib.parse.urlencode({"data": query}).encode()
    return http_json("https://overpass-api.de/api/interpreter", body)


def stitch(ways: list[list[tuple[float, float]]]) -> list[list[tuple[float, float]]]:
    """Joins the member ways of a boundary into closed rings."""
    rings, pending = [], [list(way) for way in ways]
    while pending:
        ring = pending.pop(0)
        while ring[0] != ring[-1]:
            for index, way in enumerate(pending):
                if way[0] == ring[-1]:
                    ring += way[1:]
                elif way[-1] == ring[-1]:
                    ring += list(reversed(way))[1:]
                else:
                    continue
                pending.pop(index)
                break
            else:
                raise ValueError("Boundary ring does not close")
        rings.append(ring)
    return rings


def simplify(points, tolerance):
    """Douglas-Peucker on projected points."""
    if len(points) < 3:
        return points
    (x1, y1), (x2, y2) = points[0], points[-1]
    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy) or 1e-9
    distances = [abs(dy * x - dx * y + x2 * y1 - y2 * x1) / length for x, y in points[1:-1]]
    index = max(range(len(distances)), key=distances.__getitem__)
    if distances[index] <= tolerance:
        return [points[0], points[-1]]
    split = index + 1
    return simplify(points[: split + 1], tolerance)[:-1] + simplify(points[split:], tolerance)


def simplify_ring(points, tolerance):
    """A closed ring starts and ends on the same point; split it at the point farthest from the start."""
    if len(points) < 4 or points[0] != points[-1]:
        return simplify(points, tolerance)
    x0, y0 = points[0]
    far = max(range(len(points)), key=lambda i: math.hypot(points[i][0] - x0, points[i][1] - y0))
    return simplify(points[: far + 1], tolerance)[:-1] + simplify(points[far:], tolerance)


def main() -> None:
    ids = ",".join(str(region[3]) for region in REGIONS)
    data = overpass(f"[out:json][timeout:90];relation(id:{ids});out geom;")
    relations = {element["id"]: element for element in data["elements"]}

    rings, centres = {}, {}
    for key, _, _, osm_id in REGIONS:
        relation = relations[osm_id]
        outer = [
            [(node["lat"], node["lon"]) for node in member["geometry"]]
            for member in relation["members"]
            if member["type"] == "way" and member["role"] in ("outer", "")
        ]
        rings[key] = stitch(outer)
        centre = next(
            (m for m in relation["members"] if m["type"] == "node" and m["role"] in ("admin_centre", "label")),
            None,
        )
        if centre is None:
            all_points = [p for ring in rings[key] for p in ring]
            centres[key] = (sum(p[0] for p in all_points) / len(all_points), sum(p[1] for p in all_points) / len(all_points))
        else:
            centres[key] = (centre["lat"], centre["lon"])

    river = overpass(
        '[out:json][timeout:60];way["waterway"="river"]["name"="Dinkel"](52.02,6.90,52.30,7.30);out geom;'
    )
    river_lines = [[(n["lat"], n["lon"]) for n in way["geometry"]] for way in river["elements"]]

    all_points = [p for key in rings for ring in rings[key] for p in ring]
    min_lat, max_lat = min(p[0] for p in all_points), max(p[0] for p in all_points)
    min_lon, max_lon = min(p[1] for p in all_points), max(p[1] for p in all_points)
    kx = math.cos(math.radians((min_lat + max_lat) / 2))
    scale = (WIDTH - 2 * PADDING) / ((max_lon - min_lon) * kx)
    height = round((max_lat - min_lat) * scale + 2 * PADDING)

    def project(point):
        lat, lon = point
        return ((lon - min_lon) * kx * scale + PADDING, (max_lat - lat) * scale + PADDING)

    def path(ring_list, closed=True):
        parts = []
        for ring in ring_list:
            points = simplify_ring([project(p) for p in ring], TOLERANCE_PX)
            coords = " ".join(f"{x:.1f} {y:.1f}" for x, y in points)
            parts.append(f"M{coords}{'Z' if closed else ''}")
        return "".join(parts)

    regions = []
    for key, name, postal_code, _ in REGIONS:
        lat, lon = centres[key]
        route = http_json(
            "https://router.project-osrm.org/route/v1/driving/"
            f"{OFFICE[1]},{OFFICE[0]};{lon},{lat}?overview=false"
        )["routes"][0]
        time.sleep(1)  # the OSRM demo server asks for at most one request per second
        x, y = project(centres[key])
        ring_list = rings[key] + (rings["epe"] if key == "gronau" else [])
        regions.append(
            {
                "id": key,
                "name": name,
                "postalCode": postal_code,
                "path": path(ring_list),
                "centre": {"x": round(x, 1), "y": round(y, 1)},
                "distanceKm": max(1, round(route["distance"] / 1000)),
                "durationMin": max(1, round(route["duration"] / 60)),
            }
        )

    ox, oy = project(OFFICE)
    result = {
        "width": WIDTH,
        "height": height,
        "office": {"x": round(ox, 1), "y": round(oy, 1)},
        "river": path(river_lines, closed=False),
        "regions": regions,
    }
    OUT.write_text(
        "// Generated by scripts/service-area-map.py from OpenStreetMap data (© OpenStreetMap contributors,\n"
        "// ODbL) and OSRM routes. Do not edit by hand; run the script again instead.\n"
        f"export const serviceAreaMap = {json.dumps(result, ensure_ascii=False, indent=2)} as const;\n"
    )
    print(f"Wrote {OUT} ({WIDTH}x{height})")


if __name__ == "__main__":
    main()
