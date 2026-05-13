import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Portfolio CMS",
};

export default function AdminPage() {
  redirect("/admin/index.html");
}
