import { Link } from "react-router";
import { jobPath, type Job } from "../../content/jobs";
import { formatDate } from "../../utils/formatDate";
import { ArrowRightIcon } from "../Icon/icons";
import styles from "./JobList.module.css";

type JobListProps = {
  jobs: Job[];
};

export function JobList({ jobs }: JobListProps) {
  return (
    <ul className={styles.list}>
      {jobs.map((job) => (
        <li key={job.slug} className={styles.item}>
          <h3 className={styles.title}>
            <Link to={jobPath(job)} className={styles.link}>
              {job.title}
              <ArrowRightIcon size={20} />
            </Link>
          </h3>
          <p className={styles.meta}>
            {job.scope} · {job.location} · Veröffentlicht am <time dateTime={job.postedOn}>{formatDate(job.postedOn)}</time>
          </p>
        </li>
      ))}
    </ul>
  );
}
