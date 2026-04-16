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

      <div className="space-y-6 text-foreground leading-relaxed">
        <p className="text-lg">
          Let's be honest — farming in India is tough. You're dealing with unpredictable weather,
          confusing government schemes, and advice that's either outdated or irrelevant.
          <strong> We think farmers deserve better tools.</strong>
        </p>

        <p>
          AgroSmart started as a side project by a few developers in Gujarat who grew up around farms.
          We kept hearing the same complaints from farmers in our families: "I didn't know about that scheme,"
          "I planted the wrong crop this season," "Nobody told me about the soil problem."
        </p>

        <p>
          So we built this. It's simple — no fancy jargon, no paywalls. Just practical tools:
          AI crop predictions, live weather, government scheme info, and a chatbot that actually
          answers farming questions.
        </p>

        <h2 className="text-2xl font-bold mt-10">What We Actually Do</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>AI Prediction:</strong> Plug in your weather and soil data, get a yield forecast. No PhD needed.</li>
          <li><strong>Live Weather:</strong> Real-time temp, humidity, and rain data for your area — straight from open APIs.</li>
          <li><strong>Govt Schemes:</strong> Plain-language summaries of schemes you're actually eligible for.</li>
          <li><strong>AgroBot:</strong> Ask it anything about farming. It's not perfect, but it's pretty helpful.</li>
          <li><strong>Farm Shop:</strong> Curated products with links to trusted sellers. We don't sell anything — just point you in the right direction.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">Who We Are</h2>
        <p>
          A small team of developers and agriculture enthusiasts. We're not a startup with VC funding —
          we're just people who think technology should reach the folks who actually grow our food.
          AgroSmart is free and always will be.
        </p>

        <div className="mt-10 p-6 bg-agro-green-light rounded-xl text-center">
          <p className="text-lg font-semibold text-primary">
            "The best technology is the kind that actually gets used."
          </p>
          <p className="text-sm text-muted-foreground mt-2">— The AgroSmart Team</p>
        </div>
      </div>
    </div>
  );
}
