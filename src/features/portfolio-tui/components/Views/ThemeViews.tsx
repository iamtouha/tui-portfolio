import { THEMES } from "../../data";

interface IThemeSetProps {
  name: string;
}

export function ThemeSet({ name }: IThemeSetProps) {
  return (
    <div className="mb-1 mt-2 text-green">
      → theme: <span className="text-accent">{name}</span>
    </div>
  );
}

interface IThemeErrorProps {
  attempted: string;
}

export function ThemeError({ attempted }: IThemeErrorProps) {
  return (
    <div className="mb-1 mt-2 text-red">
      unknown theme: {attempted}. available:{" "}
      {THEMES.map((t) => t.name).join(", ")}
    </div>
  );
}
