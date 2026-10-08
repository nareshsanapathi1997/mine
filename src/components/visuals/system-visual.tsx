const stages = [
  { step: "01", label: "Customer", status: "Request in" },
  { step: "02", label: "AI Agent", status: "Reading context", focus: true },
  { step: "03", label: "Automation", status: "Workflow running" },
  { step: "04", label: "Action", status: "Confirmation sent" },
];

export function SystemVisual() {
  return (
    <div className="system-board">
      <div className="system-board-bar">
        <span className="live-pip" aria-hidden="true" />
        Example system
        <span className="ml-auto tracking-[0.14em] text-accent-ink">Live</span>
      </div>
      <ol className="flow-grid m-0 list-none p-0" aria-label="Customer, AI agent, automation, action">
        {stages.map((stage) => (
          <li key={stage.label} className={stage.focus ? "flow-card is-focus" : "flow-card"}>
            <span>{stage.step}</span>
            <strong>{stage.label}</strong>
            <em>{stage.status}</em>
          </li>
        ))}
      </ol>
      <div className="system-branch mt-3" aria-label="Connected records">
        <span>CRM</span>
        <span>Database</span>
        <span>WhatsApp</span>
      </div>
    </div>
  );
}
