import { COMMANDS } from "../../data";

export function Help() {
  return (
    <div className="block">
      <div className="muted">
        Available commands — try typing <span className="accent">/</span> to
        see autocomplete.
      </div>
      <table className="tbl mt-2">
        <tbody>
          {COMMANDS.map((c) => (
            <tr key={c.k}>
              <td className="k accent">{c.k}</td>
              <td className="muted">{c.d}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dim mt-1">
        tip: most commands accept arguments — try{" "}
        <span className="accent">/echo</span> hello or{" "}
        <span className="accent">/projects</span> --tag nextjs
      </div>
    </div>
  );
}
