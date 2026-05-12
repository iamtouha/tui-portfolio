import { PROFILE } from "../../data";

export function Whoami() {
  return <div className="block">{PROFILE.handle}</div>;
}

interface IUnameProps {
  ua: string;
}

export function Uname({ ua }: IUnameProps) {
  return (
    <div className="block muted">
      touha-portfolio 1.0.0 web {ua} TUI
    </div>
  );
}

interface IDateProps {
  iso: string;
}

export function DateView({ iso }: IDateProps) {
  return <div className="block">{iso}</div>;
}

interface IEchoProps {
  text: string;
}

export function Echo({ text }: IEchoProps) {
  return <div className="block">{text}</div>;
}

export function ExitView() {
  return <div className="block muted">stay a while.</div>;
}

interface IErrorViewProps {
  message: string;
}

export function ErrorView({ message }: IErrorViewProps) {
  return (
    <>
      <div className="block err">command not found: {message}</div>
      <div className="block muted">
        try <span className="accent">/help</span> for the list.
      </div>
    </>
  );
}
