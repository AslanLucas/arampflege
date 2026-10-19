import type { Step } from "../../content/home";
import styles from "./StepList.module.css";

type StepListProps = {
  steps: Step[];
};

export function StepList({ steps }: StepListProps) {
  return (
    <ol className={styles.list}>
      {steps.map((step) => (
        <li key={step.title} className={styles.step}>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.text}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
