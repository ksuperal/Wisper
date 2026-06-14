import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to dashboard for now
  // TODO: Build proper landing/onboarding page
  redirect("/dashboard");
}
