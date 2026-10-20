import type { Step } from "../../content/home";
import { useReveal } from "../../hooks/useReveal";
import styles from "./StepList.module.css";

type StepItemProps = {
  step: Step;
  index: number;
};

function StepItem({ step, index }: StepItemProps) {
  const ref = useReveal<HTMLLIElement>(index * 160);
  return (
    <li ref={ref} className={styles.step}>
      <h3 className={styles.title}>{step.title}</h3>
      <p className={styles.text}>{step.text}</p>
    </li>
  );
}

type StepListProps = {
  steps: Step[];
};

export function StepList({ steps }: StepListProps) {
  return (
    <ol className={styles.list}>
      {steps.map((step, index) => (
        <StepItem key={step.title} step={step} index={index} />
      ))}
    </ol>
  );
}
