import { site } from "./content/site";

export function pageMeta(title: string, description: string) {
  return [{ title: `${title} – ${site.name}` }, { name: "description", content: description }];
}
