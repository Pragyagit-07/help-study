import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login"); // redirect to login page
  }, [router]);

  return null; // required fallback
}
