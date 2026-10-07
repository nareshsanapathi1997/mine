export function WorkflowDiagram({
  steps,
  label = "Workflow",
}: {
  steps: string[];
  label?: string;
}) {
  return (
    <ol aria-label={label} className="m-0 flex list-none flex-col gap-2 p-0 sm:flex-row sm:flex-wrap sm:items-center">
      {steps.map((step, index) => (
        <li key={`${step}-${index}`} className="flex items-center gap-2">
          <span className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-3 text-sm font-semibold text-ink">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden="true" className="text-accent sm:px-0.5">
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
