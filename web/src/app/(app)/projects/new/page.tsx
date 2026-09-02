import { CreateProjectForm } from "@/features/projects/components/create-project-form";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create project
        </h1>

        <p className="mt-2 text-muted-foreground">
          Add a project you&apos;re building and start documenting its journey.
        </p>
      </div>

      <CreateProjectForm />
    </main>
  );
}