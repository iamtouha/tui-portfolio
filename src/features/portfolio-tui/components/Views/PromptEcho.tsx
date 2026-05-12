interface IPromptEchoProps {
  time: string;
  cmd: string;
}

export function PromptEcho({ time, cmd }: IPromptEchoProps) {
  return (
    <div className="mt-3 text-muted">
      <span className="float-right text-[0.71875rem] text-dim">{time}</span>
      <span className="text-accent">❯</span>{" "}
      <span className="text-fg">{cmd}</span>
    </div>
  );
}
