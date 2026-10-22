import { useState, type CSSProperties } from "react";
import { serviceAreaMap } from "../../content/serviceAreaMap";
import { site } from "../../content/site";
import { useReveal } from "../../hooks/useReveal";
import { cx } from "../../utils/cx";
import { MapPinIcon } from "../Icon/icons";
import styles from "./ServiceAreaMap.module.css";

type Region = (typeof serviceAreaMap.regions)[number];

const { width, height, office, river, regions } = serviceAreaMap;

// Label positions inside the shapes; the administrative centre of Gronau sits right next to the office pin.
const labelPositions: Partial<Record<string, { x: number; y: number }>> = {
  gronau: { x: 212, y: 110 },
  ochtrup: { x: 450, y: 130 },
  heek: { x: 385, y: 330 },
};

function labelAt(region: Region) {
  return labelPositions[region.id] ?? region.centre;
}

/** A gentle arc from the office to the place, bending to the right of the straight line. */
function routePath(region: Region) {
  const target = labelAt(region);
  const mx = (office.x + target.x) / 2;
  const my = (office.y + target.y) / 2;
  const dx = target.x - office.x;
  const dy = target.y - office.y;
  return `M${String(office.x)} ${String(office.y)} Q${String(mx - dy * 0.25)} ${String(my + dx * 0.25)} ${String(target.x)} ${String(target.y)}`;
}

function distanceText(region: Region) {
  return `ca. ${String(region.distanceKm)}\u00a0km · ca. ${String(region.durationMin)}\u00a0Min. mit dem Auto`;
}

/**
 * The places served on a map with their real outlines. Hovering a place lifts it, draws the
 * route from the office and shows the driving distance. The list below is the accessible
 * version: keyboard, touch and screen readers select the same places there.
 */
type ServiceAreaMapProps = {
  /**
   * "side" puts the list of places next to the map on wide screens, "below" under it. "hidden"
   * shows no list; screen readers still get the places from a visually hidden one.
   */
  listPosition?: "below" | "side" | "hidden";
};

export function ServiceAreaMap({ listPosition = "below" }: ServiceAreaMapProps) {
  const ref = useReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState<string | undefined>(undefined);
  const [focused, setFocused] = useState<string | undefined>(undefined);
  const [pinned, setPinned] = useState<string | undefined>(undefined);
  const activeId = hovered ?? focused ?? pinned;
  const active = regions.find((region) => region.id === activeId);

  return (
    <div ref={ref} className={cx(styles.wrapper, listPosition === "side" && styles.side)}>
      <div className={styles.frame} data-active={active ? "true" : undefined}>
        <svg
          viewBox={`0 0 ${String(width)} ${String(height)}`}
          className={styles.map}
          aria-hidden="true"
          focusable="false"
          onPointerLeave={() => {
            setHovered(undefined);
          }}
        >
          <g>
            {regions.map((region, index) => (
              <path
                key={region.id}
                d={region.path}
                fillRule="evenodd"
                className={styles.region}
                data-active={region.id === activeId ? "true" : undefined}
                style={{ "--i": index } as CSSProperties}
                onPointerEnter={() => {
                  setHovered(region.id);
                }}
              />
            ))}
          </g>
          {active && <path d={active.path} fillRule="evenodd" className={styles.lifted} />}
          <path d={river} className={styles.river} />
          {regions.map((region) => {
            const label = labelAt(region);
            return (
              <text
                key={region.id}
                x={label.x}
                y={label.y}
                className={styles.label}
                data-active={region.id === activeId ? "true" : undefined}
              >
                {region.name}
              </text>
            );
          })}
          {active && (
            <g key={active.id} className={styles.route}>
              <path d={routePath(active)} className={styles.routeLine} />
              <circle cx={labelAt(active).x} cy={labelAt(active).y + 10} r={5} className={styles.routeEnd} />
            </g>
          )}
          <g className={styles.office}>
            <circle cx={office.x} cy={office.y} r={14} className={styles.pulse} />
            <circle cx={office.x} cy={office.y} r={7} className={styles.officeDot} />
          </g>
        </svg>

        {/* Office badge in the empty corner; shows the route to the active place */}
        <div className={styles.badge} aria-hidden="true">
          <div className={styles.badgeOffice}>
            <img src="/images/logo-aram-160.png" width={160} height={160} alt="" className={styles.badgeLogo} />
            <span className={styles.badgeText}>
              <span className={styles.badgeTitle}>Standort Gronau</span>
              <span>{site.address.street}</span>
            </span>
          </div>
          {active ? (
            <div key={active.id} className={styles.badgeRoute}>
              <span className={styles.routeName}>
                {active.name} <span className={styles.routeMeta}>{active.postalCode}</span>
              </span>
              <span className={styles.routeDistance}>{distanceText(active)}</span>
            </div>
          ) : (
            <p className={styles.badgeHint}>Zeigen Sie auf einen Ort.</p>
          )}
        </div>
      </div>

      {listPosition === "hidden" ? (
        <ul className="visually-hidden" aria-label="Orte im Einsatzgebiet">
          {regions.map((region) => (
            <li key={region.id}>
              {region.name}, {region.postalCode}
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.list} aria-label="Orte und Entfernungen vom Büro">
          {regions.map((region) => (
            <li key={region.id}>
              <button
                type="button"
                className={styles.place}
                aria-pressed={region.id === pinned}
                data-active={region.id === activeId ? "true" : undefined}
                onPointerEnter={() => {
                  setHovered(region.id);
                }}
                onPointerLeave={() => {
                  setHovered(undefined);
                }}
                onFocus={() => {
                  setFocused(region.id);
                }}
                onBlur={() => {
                  setFocused(undefined);
                }}
                onClick={() => {
                  setPinned((current) => (current === region.id ? undefined : region.id));
                }}
              >
                <span className={styles.placeIcon} aria-hidden="true">
                  <MapPinIcon size={24} />
                </span>
                <span className={styles.placeName}>{region.name}</span>
                <span className={styles.placeMeta}>{region.postalCode}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className={styles.source}>
        Zeigen Sie auf einen Ort, um die ungefähre Fahrstrecke vom Büro in der {site.address.street} zu sehen.
        Kartendaten ©{" "}
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>
      </p>
    </div>
  );
}
