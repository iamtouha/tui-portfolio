import { THEMES } from "../../data";

interface IThemeSetProps {
  name: string;
}

export function ThemeSet({ name }: IThemeSetProps) {
  return (
    <div className="block ok">
      → theme: <span className="accent">{name}</span>
    </div>
  );
}

interface IThemeErrorProps {
  attempted: string;
}

export function ThemeError({ attempted }: IThemeErrorProps) {
  return (
    <div className="block err">
      unknown theme: {attempted}. available:{" "}
      {THEMES.map((t) => t.name).join(", ")}
    </div>
  );
}
