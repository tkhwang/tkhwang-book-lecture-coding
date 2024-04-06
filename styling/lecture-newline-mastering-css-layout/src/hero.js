import recruiterImage from "./images/recruiter.jpg";
export function Hero() {
  return (
    <section
      data-split="fraction:2/3"
      style={{
        "--switchAt": "var(--size-content-3)",
      }}
      className="hero-section"
    >
      <div data-cover style={{ "--minHeight": "40vh" }} className="hero-cta">
        <div
          data-cover-centered
          data-stack
          style={{ "--gutter": "var(--size-8)" }}
        >
          <div>
            <h1 className="hero-heading">The people-first way to hire</h1>
            <p>
              Capture your team's story and create authentic candidate
              engagement with Duck.
            </p>
          </div>
          <div>
            <button className="button">Book a Demo</button>
          </div>
        </div>
      </div>
      <div data-cover>
        <img
          data-cover-centered
          src={recruiterImage}
          alt="recruiter on a phone call, smiling."
        />
      </div>
    </section>
  );
}
