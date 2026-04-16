import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — AgroSmart" },
      { name: "description", content: "Learn about AgroSmart's mission to empower Indian farmers with technology." },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">About AgroSmart</h1>

      <div className="prose prose-lg max-w-none space-y-6 text-foreground">
        <p>
          AgroSmart started with a simple idea: <strong>farming shouldn't be a gamble</strong>.
          Every season, millions of Indian farmers make critical decisions — what to plant,
          when to irrigate, how much fertilizer to use — often based on guesswork or outdated advice.
        </p>

        <p>
          We built AgroSmart to change that. Our platform brings together AI-powered crop predictions,
          real-time agriculture news, government scheme information, and farming tools — all in one
          place, accessible to anyone with a smartphone.
        </p>

        <h2 className="text-2xl font-bold mt-8">Our Mission</h2>
        <p>
          To empower every Indian farmer with the technology and information they need to make
          smarter decisions, improve yields, and build a sustainable livelihood.
        </p>

        <h2 className="text-2xl font-bold mt-8">What We Do</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>AI Prediction:</strong> Enter your local weather and soil conditions, get a smart yield forecast.</li>
          <li><strong>News Feed:</strong> Curated agriculture news from India and globally.</li>
          <li><strong>Govt Schemes:</strong> Easy access to the latest subsidies, loans, and support programs.</li>
          <li><strong>AgroBot:</strong> A simple chatbot that answers common farming questions instantly.</li>
          <li><strong>Farm Shop:</strong> Browse recommended products with links to trusted online sellers.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Who We Are</h2>
        <p>
          We're a small team of developers and agriculture enthusiasts based in Gujarat, India.
          We believe technology should serve the people who feed the world.
          AgroSmart is free to use and always will be.
        </p>

        <div className="mt-8 p-6 bg-agro-green-light rounded-xl text-center">
          <p className="text-lg font-semibold text-primary">
            "Technology is only useful if it reaches the hands that need it most."
          </p>
          <p className="text-sm text-muted-foreground mt-2">— The AgroSmart Team</p>
        </div>
      </div>
    </div>
  );
}
