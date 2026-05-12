interface IPromptEchoProps {
  time: string;
  cmd: string;
}

export function PromptEcho({ time, cmd }: IPromptEchoProps) {
  return (
    <div className="past-prompt">
      <span className="ptime">{time}</span>
      <span className="accent">❯</span> <span className="pcmd">{cmd}</span>
    </div>
  );
}
