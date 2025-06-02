'use client';
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth"; 
import Dashboard from "./components/Dashboard";

export default function Home() {
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    redirect("/auth/login");
  }

  return <Dashboard />;
}
