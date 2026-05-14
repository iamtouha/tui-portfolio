import {
  EChatStatus,
  ETerminalEntryKind,
  type TTerminalEntry,
} from "../../../types";

interface IChatResponseProps {
  entry: Extract<TTerminalEntry, { kind: ETerminalEntryKind.CHAT_RESPONSE }>;
}

export function ChatResponse({ entry }: IChatResponseProps) {
  const isStreaming = entry.status === EChatStatus.STREAMING;
  const isError = entry.status === EChatStatus.ERROR;

  return (
    <div className="mb-2 mt-2">
      <div className="whitespace-pre-wrap wrap-break-word text-fg max-w-[80ch]">
        {entry.text}
        {isStreaming && (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.1em] animate-pulse bg-accent align-middle"
          />
        )}
      </div>
      {isStreaming && !entry.text && <div className="text-dim">thinking…</div>}
      {isError && (
        <div className="mt-1 text-red">
          chat error: {entry.errorMessage ?? "unknown"}
        </div>
      )}
    </div>
  );
}
