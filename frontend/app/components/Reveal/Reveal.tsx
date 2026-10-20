import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
};

/** Wrapper that fades its content in on scroll (see useReveal). */
export function Reveal({ children, delayMs = 0, className }: RevealProps) {
  const ref = useReveal<HTMLDivElement>(delayMs);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
