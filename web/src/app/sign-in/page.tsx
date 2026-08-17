import { signIn } from "@/auth";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/feed" });
        }}
      >
        <button
          type="submit"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Continue with GitHub
        </button>
      </form>
    </main>
  );
}