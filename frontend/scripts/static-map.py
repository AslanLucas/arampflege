"""Build the self-hosted static map for the contact panel.

Run once by hand when the address changes; the page itself never talks to a map service.
Downloads a handful of standard OpenStreetMap tiles (data © OpenStreetMap contributors,
ODbL), stitches them centred on the office and writes WebP and AVIF next to each other.

    python3 scripts/static-map.py
"""

import io
import math
import subprocess
import time
import urllib.request
from pathlib import Path

from PIL import Image

# Ochtruper Straße 83, 48599 Gronau (Westfalen), geocoded via Nominatim
LAT, LON = 52.2077663, 7.0395116
ZOOM = 15
WIDTH, HEIGHT = 960, 480
TILE = 256
USER_AGENT = "arampflege-website-static-map/1.0 (one-off build script)"
OUT = Path(__file__).resolve().parent.parent / "public" / "images"


def world_pixel(lat: float, lon: float, zoom: int) -> tuple[float, float]:
    scale = TILE * 2**zoom
    x = (lon + 180) / 360 * scale
    sin = math.sin(math.radians(lat))
    y = (0.5 - math.log((1 + sin) / (1 - sin)) / (4 * math.pi)) * scale
    return x, y


def fetch_tile(x: int, y: int) -> Image.Image:
    request = urllib.request.Request(
        f"https://tile.openstreetmap.org/{ZOOM}/{x}/{y}.png", headers={"User-Agent": USER_AGENT}
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        return Image.open(io.BytesIO(response.read())).convert("RGB")


def main() -> None:
    cx, cy = world_pixel(LAT, LON, ZOOM)
    left, top = round(cx - WIDTH / 2), round(cy - HEIGHT / 2)
    canvas = Image.new("RGB", (WIDTH, HEIGHT))
    for tx in range(left // TILE, (left + WIDTH - 1) // TILE + 1):
        for ty in range(top // TILE, (top + HEIGHT - 1) // TILE + 1):
            canvas.paste(fetch_tile(tx, ty), (tx * TILE - left, ty * TILE - top))
            time.sleep(0.2)  # be gentle with the volunteer-run tile servers

    webp = OUT / "karte-standort.webp"
    canvas.save(webp, "WEBP", quality=82, method=6)
    png = OUT / "karte-standort.tmp.png"
    canvas.save(png)
    subprocess.run(["avifenc", "-q", "60", "-s", "4", str(png), str(OUT / "karte-standort.avif")], check=True)
    png.unlink()


if __name__ == "__main__":
    main()
