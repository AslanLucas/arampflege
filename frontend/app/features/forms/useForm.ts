import { useEffect, useRef, useState } from "react";
import type { FieldErrors } from "./submissionErrors";

/**
 * State shared by all forms: values, errors and focus management. After a failed submit the
 * error summary receives focus; after a successful one the confirmation does.
 */
export function useForm<Values extends Record<string, string | boolean>>(initialValues: Values) {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [focusRequest, setFocusRequest] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (focusRequest > 0) {
      summaryRef.current?.focus();
    }
  }, [focusRequest]);

  useEffect(() => {
    if (submitted) {
      confirmationRef.current?.focus();
    }
  }, [submitted]);

  function setValue<Key extends keyof Values>(key: Key, value: Values[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function showErrors(fields: FieldErrors, form?: string) {
    setFieldErrors(fields);
    setFormError(form);
    setFocusRequest((count) => count + 1);
  }

  function clearErrors() {
    setFieldErrors({});
    setFormError(undefined);
  }

  return {
    values,
    setValue,
    fieldErrors,
    formError,
    showErrors,
    clearErrors,
    submitted,
    markSubmitted: () => {
      setSubmitted(true);
    },
    summaryRef,
    confirmationRef,
  };
}
