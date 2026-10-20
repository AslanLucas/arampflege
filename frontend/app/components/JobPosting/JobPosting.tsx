import { applyPath, type Job } from "../../content/jobs";
import { formatDate } from "../../utils/formatDate";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import styles from "./JobPosting.module.css";

type JobPostingProps = {
  job: Job;
};

function Section({ id, title, items, fallback }: { id: string; title: string; items: string[]; fallback: string }) {
  return (
    <section aria-labelledby={id} className={styles.section}>
      <h2 id={id}>{title}</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{fallback}</p>
      )}
    </section>
  );
}

export function JobPosting({ job }: JobPostingProps) {
  return (
    <div className={styles.posting}>
      <Breadcrumbs trail={[{ label: "Karriere", to: "/karriere" }]} current={job.title} />
      <h1>{job.title}</h1>
      <dl className={styles.facts}>
        <div>
          <dt>Umfang</dt>
          <dd>{job.scope}</dd>
        </div>
        <div>
          <dt>Ort</dt>
          <dd>{job.location}</dd>
        </div>
        <div>
          <dt>Veröffentlicht</dt>
          <dd>
            <time dateTime={job.postedOn}>{formatDate(job.postedOn)}</time>
          </dd>
        </div>
      </dl>
      <p>
        <ButtonLink to={applyPath(job.slug)}>Auf diese Stelle bewerben</ButtonLink>
      </p>

      <Section id="aufgaben" title="Ihre Aufgaben" items={job.tasks} fallback="[[INHALT FEHLT: Aufgaben]]" />
      <Section
        id="voraussetzungen"
        title="Was Sie mitbringen"
        items={job.requirements}
        fallback="[[INHALT FEHLT: Voraussetzungen]]"
      />
      <Section
        id="angebot"
        title="Was wir Ihnen bieten"
        items={job.offer}
        fallback="[[INHALT FEHLT: Arbeitsbedingungen vom Kunden bestätigen]]"
      />

      <p className={styles.closing}>
        <ButtonLink to={applyPath(job.slug)}>Auf diese Stelle bewerben</ButtonLink>
      </p>
    </div>
  );
}
