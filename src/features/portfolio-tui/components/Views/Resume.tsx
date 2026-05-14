import { useContent } from "../../contexts";

const RESUME_PDF = "/FSD_5_Touha_Zohair.pdf";

export function Resume() {
  const { profile: PROFILE } = useContent();
  return (
    <div className="mb-1 mt-2">
      <div>
        Download:{" "}
        <a
          className="border-b border-dotted border-blue text-blue no-underline hover:border-accent hover:text-accent"
          href={RESUME_PDF}
          download
        >
          FSD_5_Touha_Zohair.pdf
        </a>
      </div>
      <div className="mt-1.5 text-muted">
        Or email{" "}
        <a
          className="border-b border-dotted border-blue text-blue no-underline hover:border-accent hover:text-accent"
          href={`mailto:${PROFILE.email}`}
        >
          {PROFILE.email}
        </a>{" "}
        for the latest CV.
      </div>
    </div>
  );
}
