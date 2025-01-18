import type { MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "WeMake - Home" },
    { name: "description", content: "Welcome to WeMake" },
  ];
};

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="container max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to WeMake
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Your platform for creative collaboration and making amazing things
          happen.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </main>
  );
}
