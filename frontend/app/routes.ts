import { index, route, type RouteConfig } from "@react-router/dev/routes";
import { jobs } from "./content/jobs";
import { services } from "./content/services";

export default [
  index("routes/home.tsx"),
  route("leistungen", "routes/leistungen.tsx"),
  ...services.map((service) =>
    route(`leistungen/${service.slug}`, "routes/leistung.tsx", { id: `leistung-${service.slug}` }),
  ),
  route("einsatzgebiet", "routes/einsatzgebiet.tsx"),
  route("ueber-uns", "routes/ueber-uns.tsx"),
  route("karriere", "routes/karriere.tsx"),
  route("karriere/bewerben", "routes/bewerben.tsx"),
  ...jobs.map((job) => route(`karriere/${job.slug}`, "routes/stelle.tsx", { id: `stelle-${job.slug}` })),
  route("kontakt", "routes/kontakt.tsx"),
  route("rueckruf", "routes/rueckruf.tsx"),
  route("impressum", "routes/impressum.tsx"),
  route("datenschutz", "routes/datenschutz.tsx"),
  route("barrierefreiheit", "routes/barrierefreiheit.tsx"),
] satisfies RouteConfig;
