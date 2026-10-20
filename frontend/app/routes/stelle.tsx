import { useLocation, type MetaFunction } from "react-router";
import { Container } from "../components/Container/Container";
import { JobPosting } from "../components/JobPosting/JobPosting";
import { jobBySlug, type Job } from "../content/jobs";
import { pageMeta } from "../meta";

// routes.ts registers this module once per job, so every path has a matching job.
function jobAt(pathname: string): Job {
  const job = jobBySlug(pathname.split("/").filter(Boolean).pop());
  if (!job) {
    throw new Error(`No job for path ${pathname}`);
  }
  return job;
}

// Generic type: without any jobs this module is not registered, so no route types are generated.
export const meta: MetaFunction = ({ location }) =>
  pageMeta(jobAt(location.pathname).title, "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Stelle() {
  return (
    <Container>
      <JobPosting job={jobAt(useLocation().pathname)} />
    </Container>
  );
}
