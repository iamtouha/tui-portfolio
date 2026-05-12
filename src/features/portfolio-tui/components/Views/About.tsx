import { PROFILE } from "../../data";

export function About() {
  return (
    <div className="block">
      <div className="b accent">{PROFILE.name}</div>
      <div className="muted">
        {PROFILE.role} · {PROFILE.location}
      </div>
      <p className="line my-3 max-w-[64ch] text-fg">
        {PROFILE.tagline}
      </p>
      <table className="tbl">
        <tbody>
          <tr>
            <td className="k">handle</td>
            <td>@{PROFILE.handle}</td>
          </tr>
          <tr>
            <td className="k">email</td>
            <td>
              <a className="link" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
            </td>
          </tr>
          <tr>
            <td className="k">status</td>
            <td>
              <span className="ok">● open to work / freelance</span>
            </td>
          </tr>
          <tr>
            <td className="k">timezone</td>
            <td>UTC+6 (Asia/Dhaka)</td>
          </tr>
          <tr>
            <td className="k">stack</td>
            <td className="muted">
              TypeScript · Next.js · Node.js · Postgres · Tailwind
            </td>
          </tr>
        </tbody>
      </table>
      <div className="dim mt-2">
        Run <span className="accent">/experience</span>,{" "}
        <span className="accent">/projects</span>, or{" "}
        <span className="accent">/contact</span> for more.
      </div>
    </div>
  );
}
