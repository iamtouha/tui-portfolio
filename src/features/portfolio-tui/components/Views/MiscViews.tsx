import { PROFILE } from "../../data";

export function Whoami() {
  return <div className="mb-1 mt-2">{PROFILE.handle}</div>;
}

interface IUnameProps {
  ua: string;
}

export function Uname({ ua }: IUnameProps) {
  return (
    <div className="mb-1 mt-2 text-muted">
      touha-portfolio 1.0.0 web {ua} TUI
    </div>
  );
}

interface IDateProps {
  iso: string;
}

export function DateView({ iso }: IDateProps) {
  return <div className="mb-1 mt-2">{iso}</div>;
}

interface IEchoProps {
  text: string;
}

export function Echo({ text }: IEchoProps) {
  return <div className="mb-1 mt-2">{text}</div>;
}

export function ExitView() {
  return <div className="mb-1 mt-2 text-muted">stay a while.</div>;
}

interface IErrorViewProps {
  message: string;
}

export function ErrorView({ message }: IErrorViewProps) {
  return (
    <>
      <div className="mb-1 mt-2 text-red">command not found: {message}</div>
      <div className="mb-1 mt-2 text-muted">
        try <span className="text-accent">/help</span> for the list.
      </div>
    </>
  );
}
