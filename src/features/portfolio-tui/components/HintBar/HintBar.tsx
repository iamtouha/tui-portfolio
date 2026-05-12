export function HintBar() {
  return (
    <div className="flex justify-between border-t border-(--hint-border) px-5.5 pb-2.5 pt-1.5 text-[0.71875rem] text-dim max-[32.5rem]:px-3.5 max-[32.5rem]:pb-2 max-[32.5rem]:text-[0.65625rem]">
      <div className="hidden sm:block [&>span]:mr-3.5">
        <span>
          <kbd className="rounded-[0.1875rem] border border-b-2 border-border-token bg-panel px-1.25 text-[0.6875rem] font-[inherit] text-muted">
            Tab
          </kbd>{" "}
          complete
        </span>
        <span>
          <kbd className="rounded-[0.1875rem] border border-b-2 border-border-token bg-panel px-1.25 text-[0.6875rem] font-[inherit] text-muted">
            ↑
          </kbd>
          <kbd className="rounded-[0.1875rem] border border-b-2 border-border-token bg-panel px-1.25 text-[0.6875rem] font-[inherit] text-muted">
            ↓
          </kbd>{" "}
          history
        </span>
        <span>
          <kbd className="rounded-[0.1875rem] border border-b-2 border-border-token bg-panel px-1.25 text-[0.6875rem] font-[inherit] text-muted">
            Enter
          </kbd>{" "}
          run
        </span>
        <span>
          <kbd className="rounded-[0.1875rem] border border-b-2 border-border-token bg-panel px-1.25 text-[0.6875rem] font-[inherit] text-muted">
            Ctrl
          </kbd>
          +
          <kbd className="rounded-[0.1875rem] border border-b-2 border-border-token bg-panel px-1.25 text-[0.6875rem] font-[inherit] text-muted">
            L
          </kbd>{" "}
          clear
        </span>
      </div>
      <div>
        <span className="text-dim">type</span>{" "}
        <span className="text-accent">/help</span>{" "}
        <span className="text-dim">for commands</span>
      </div>
    </div>
  );
}
