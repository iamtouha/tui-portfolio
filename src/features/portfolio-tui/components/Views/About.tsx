import { useContent } from "../../contexts";

export function About() {
  const { profile: PROFILE } = useContent();
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
              timezone
            </td>
            <td>{PROFILE.timezone}</td>
          </tr>
          <tr>
            <td className="w-[1%] whitespace-nowrap py-1 pr-3 align-top text-muted">
              stack
            </td>
            <td className="text-muted">{PROFILE.stacks.join(" · ")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
