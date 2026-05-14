import { COMMANDS } from "../../data";

export function Help() {
  return (
    <div className="mb-1 mt-2">
      <div className="text-muted">
        Available commands — try typing <span className="text-accent">/</span>{" "}
        to see autocomplete.
      </div>
      <table className="mb-2.5 mt-2 w-full border-collapse">
        <tbody>
          {COMMANDS.map((c) => (
            <tr key={c.k}>
              <td className="w-[1%] whitespace-nowrap py-1 pr-3 align-top text-accent">
                {c.k}
              </td>
              <td className="py-1 pr-3 align-top text-muted">{c.d}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-1 text-dim">
        tip: most commands accept arguments — try{" "}
        <span className="text-accent">/echo</span> hello or{" "}
        <span className="text-accent">/projects</span> --tag nextjs
      </div>
      <div className="mt-1 text-dim">
        tip: anything not starting with <span className="text-accent">/</span>{" "}
        goes to the AI assistant — try{" "}
        <span className="text-accent">tell me about your react work</span>
      </div>
    </div>
  );
}
