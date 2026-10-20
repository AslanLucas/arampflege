// Job postings maintained as website content (see backend/AGENTS.md). Only real postings
// confirmed by the client go here; remove them as soon as a position is filled.
export type Job = {
  slug: string;
  title: string;
  /** e.g. "Teilzeit, 20 Stunden pro Woche" */
  scope: string;
  location: string;
  /** ISO date of publication, shown on the page */
  postedOn: string;
  tasks: string[];
  requirements: string[];
  /** Only conditions the client has confirmed; never invented benefits or salaries. */
  offer: string[];
};

export const jobs: Job[] = [];

export const INITIATIVE = "initiativ";

export function jobPath(job: Job): string {
  return `/karriere/${job.slug}`;
}

export function applyPath(slug?: string): string {
  return slug ? `/karriere/bewerben?stelle=${encodeURIComponent(slug)}` : "/karriere/bewerben";
}

export function jobBySlug(slug: string | null | undefined): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
