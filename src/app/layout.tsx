import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "touha@portfolio - TUI",
  description:
    "Terminal-style portfolio of Touha Zohair — Full Stack Web Developer. Type /help to begin.",
  icons: { icon: "/avatar.png" },
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full`}>
      <body className="flex h-full flex-col overflow-hidden bg-[radial-gradient(75rem_37.5rem_at_70%_-10%,var(--shell-accent-glow),transparent_60%),radial-gradient(56.25rem_31.25rem_at_-10%_110%,var(--shell-blue-glow),transparent_60%),var(--bg)] font-mono text-[0.875rem] leading-[1.55] text-fg max-[32.5rem]:text-[0.78125rem]">
        {children}
      </body>
    </html>
  );
}
