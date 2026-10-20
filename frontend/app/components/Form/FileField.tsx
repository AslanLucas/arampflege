import { useRef } from "react";
import { formatFileSize } from "../../utils/formatDate";
import { FieldShell, type Requirement } from "./FieldShell";
import styles from "./Form.module.css";

type FileFieldProps = {
  id: string;
  name: string;
  label: string;
  requirement: Requirement;
  accept: string;
  hint: string;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

export function FileField({ id, name, label, requirement, accept, hint, file, onChange, error }: FileFieldProps) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <FieldShell id={id} label={label} requirement={requirement} hint={hint} error={error}>
      {(control) => (
        <>
          <input
            {...control}
            ref={input}
            className={styles.file}
            type="file"
            name={name}
            accept={accept}
            onChange={(event) => {
              onChange(event.target.files?.[0] ?? null);
            }}
          />
          <div className={styles.selectedFile} aria-live="polite">
            {file && (
              <>
                <span>
                  Ausgewählt: <strong>{file.name}</strong> ({formatFileSize(file.size)})
                </span>
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={() => {
                    if (input.current) {
                      input.current.value = "";
                      input.current.focus();
                    }
                    onChange(null);
                  }}
                >
                  Datei entfernen
                </button>
              </>
            )}
          </div>
        </>
      )}
    </FieldShell>
  );
}
