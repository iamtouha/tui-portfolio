export function HintBar() {
  return (
    <div className="hintbar">
      <div className="keys hidden sm:block">
        <span>
          <kbd>Tab</kbd> complete
        </span>
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> history
        </span>
        <span>
          <kbd>Enter</kbd> run
        </span>
        <span>
          <kbd>Ctrl</kbd>+<kbd>L</kbd> clear
        </span>
      </div>
      <div>
        <span className="dim">type</span> <span className="accent">/help</span>{" "}
        <span className="dim">for commands</span>
      </div>
    </div>
  );
}
