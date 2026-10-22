import type { Service } from "../../content/services";

type ServicePhotoProps = {
  service: Service;
  /** Rendered width of the image, for choosing between the 640 and 1280 px files. */
  sizes: string;
  /** Load right away instead of lazily; for a photo in the visible top area. */
  priority?: boolean;
  className?: string;
};

const WIDTHS = [640, 1280];

function srcSet(slug: string, format: "avif" | "webp") {
  return WIDTHS.map((width) => `/images/leistungen/${slug}-${String(width)}.${format} ${String(width)}w`).join(", ");
}

/** Photo of a service; files and licenses in public/images/leistungen/. */
export function ServicePhoto({ service, sizes, priority = false, className }: ServicePhotoProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(service.slug, "avif")} sizes={sizes} />
      <img
        src={`/images/leistungen/${service.slug}-640.webp`}
        srcSet={srcSet(service.slug, "webp")}
        sizes={sizes}
        width={1280}
        height={853}
        alt={service.photoAlt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
