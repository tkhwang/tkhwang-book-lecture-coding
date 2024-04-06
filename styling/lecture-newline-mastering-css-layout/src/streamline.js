const features = [
  {
    title: "Sourcing",
    details:
      "Speed up your sourcing workflow with automated emails that feel personal and increase your candidate engagement.",
  },
  {
    title: "Screening",
    details:
      "Screen candidates faster with automated phone screens that feel like a real conversation.",
  },
  {
    title: "Interviewing",
    details:
      "Interview candidates faster with automated phone screens that feel like a real conversation.",
  },
  {
    title: "Offering",
    details:
      "Make offers faster with automated phone screens that feel like a real conversation.",
  },
  {
    title: "Onboarding",
    details:
      "Onboard candidates faster with automated phone screens that feel like a real conversation.",
  },
  {
    title: "Reporting",
    details:
      "Get insights into your hiring process with automated phone screens that feel like a real conversation.",
  },
  {
    title: "Text Messaging",
    details:
      "Turn customers into candidates and make it easy for the right candidate to start their application.",
  },
  {
    title: "Social Collaboration",
    details:
      "Partner with your marketing friends with team clips designed to showcase your employer value prop.",
  },
  {},
];

function FeatureCard({ title, details }) {
  return (
    <div data-stack style={{ "--gutter": "var(--size-5)" }}>
      <h3>{title}</h3>
      <p>{details}</p>
    </div>
  );
}

export function Streamline() {
  return (
    <section
      data-stack
      style={{ "--gutter": "var(--size-10)" }}
      className="streamline-section"
    >
      <div
        data-center="center-text"
        style={{ "--maxWidth": "var(--size-content-2)" }}
      >
        <h2>Streamline your hiring without sacrificing your quality</h2>
      </div>
      <div
        data-grid
        style={{
          "--minItemWidth": "var(--size-content-1)",
          "--gutter": "var(--size-8)",
        }}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
