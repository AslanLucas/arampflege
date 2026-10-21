import { Link } from "react-router";
import type { OnlineTile } from "../../content/home";
import { useReveal } from "../../hooks/useReveal";
import { cx } from "../../utils/cx";
import {
  ArrowRightIcon,
  FileUpIcon,
  MailIcon,
  MessagesSquareIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
} from "../Icon/icons";
import styles from "./OnlineTiles.module.css";

const icons = {
  phoneCall: PhoneCallIcon,
  message: MessagesSquareIcon,
  mail: MailIcon,
  fileUp: FileUpIcon,
  shield: ShieldCheckIcon,
};

function Tile({ tile, index }: { tile: OnlineTile; index: number }) {
  const ref = useReveal<HTMLLIElement>(index * 90);
  const Icon = icons[tile.icon];

  return (
    <li
      ref={ref}
      className={cx(styles.tile, tile.featured && styles.featured)}
      data-surface={tile.featured ? "brand" : undefined}
    >
      <div className={styles.top}>
        <span className={styles.icon} aria-hidden="true">
          <Icon size={24} />
        </span>
        <span className={styles.chip}>{tile.chip}</span>
      </div>
      <h3 className={styles.title}>{tile.title}</h3>
      <p className={styles.text}>{tile.text}</p>
      <Link to={tile.to} className={styles.link}>
        {tile.linkLabel}
        <ArrowRightIcon size={18} />
      </Link>
    </li>
  );
}

type OnlineTilesProps = {
  tiles: OnlineTile[];
};

/** Tiles for what can be done online; each tile is clickable as a whole via its link. */
export function OnlineTiles({ tiles }: OnlineTilesProps) {
  return (
    <ul className={styles.grid}>
      {tiles.map((tile, index) => (
        <Tile key={tile.id} tile={tile} index={index} />
      ))}
    </ul>
  );
}
