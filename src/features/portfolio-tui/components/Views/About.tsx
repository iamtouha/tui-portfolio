import { PROFILE } from "../../data";

export function About() {
  return (
    <div className="mb-1 mt-2">
      <div className="font-bold text-accent">{PROFILE.name}</div>
      <div className="text-muted">
        {PROFILE.role} · {PROFILE.location}
      </div>
      <p className="m-0 my-3 max-w-[72ch] whitespace-pre-wrap wrap-break-word p-0 text-fg">
        {PROFILE.tagline}
      </p>
      <table className="mb-2.5 mt-1 w-full border-collapse">
        <tbody>
          <tr>
            <td className="w-[1%] whitespace-nowrap py-1 pr-3 align-top text-muted">
              handle
            </td>
            <td>@{PROFILE.handle}</td>
          </tr>
          <tr>
            <td className="w-[1%] whitespace-nowrap py-1 pr-3 align-top text-muted">
              email
            </td>
            <td>
              <a
                className="border-b border-dotted border-blue text-blue no-underline hover:border-accent hover:text-accent"
                href={`mailto:${PROFILE.email}`}
              >
                {PROFILE.email}
              </a>
            </td>
          </tr>
          <tr>
            <td className="w-[1%] whitespace-nowrap py-1 pr-3 align-top text-muted">
              status
            </td>
            <td>
              <span className="text-green">● open to work</span>
            </td>
          </tr>
          <tr>
            <td className="w-[1%] whitespace-nowrap py-1 pr-3 align-top text-muted">
              timezone
            </td>
            <td>{PROFILE.timezone}</td>
          </tr>
          <tr>
            <td className="w-[1%] whitespace-nowrap py-1 pr-3 align-top text-muted">
              stack
            </td>
            <td className="text-muted">
              TypeScript · Next.js · Node.js · Postgres · Tailwind
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-2 text-dim">
        Run <span className="text-accent">/experience</span>,{" "}
        <span className="text-accent">/projects</span>, or{" "}
        <span className="text-accent">/contact</span> for more.
      </div>
    </div>
  );
}
