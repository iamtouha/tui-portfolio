import { PROFILE } from "../../data";

const RESUME_PDF = "/FSD_5_Touha_Zohair.pdf";

export function Resume() {
  return (
    <div className="block">
      <div>
        Download:{" "}
        <a className="link" href={RESUME_PDF} download>
          FSD_5_Touha_Zohair.pdf
        </a>
      </div>
      <div className="muted mt-1.5">
        Or email{" "}
        <a className="link" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>{" "}
        for the latest CV.
      </div>
    </div>
  );
}
