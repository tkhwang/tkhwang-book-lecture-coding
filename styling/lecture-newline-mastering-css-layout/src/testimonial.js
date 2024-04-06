export function Testimonial() {
  return (
    <section
      data-stack
      style={{ "--gutter": "var(--size-10)" }}
      className="testimonial-section"
    >
      <div
        data-center="center-text"
        style={{ "--maxWidth": "var(--size-content-2)" }}
      >
        <h2>Over 30k people have been hired with Duck</h2>
      </div>
      <div data-split="fraction:1/2" className="testimonial-details">
        <div
          data-stack
          style={{ "--gutter": "var(--size-5)" }}
          className="testimonial-detail-section"
        >
          <h3
            data-center="center-text center-children"
            className="testimonial-detail-section-heading"
          >
            Trusted by companies like
          </h3>
          <ul
            data-column-drop="no-stretched-columns"
            style={{ "--gutter": "var(--size-5)" }}
            className="testimonial-detail-list"
          >
            <li>Udemy</li>
            <li>Lift</li>
            <li>HealthSherpa</li>
            <li>Skims</li>
            <li>MadisonReed</li>
            <li>Motus</li>
            <li>Choco</li>
          </ul>
        </div>
        <div
          data-center="center-text center-children"
          className="testimonial-detail-section"
        >
          <blockquote
            data-stack
            style={{
              "--gutter": "var(--size-5)",
            }}
            className="testimonial"
          >
            <p>
              Suzy uses Duck to streamline content creation and produce content
              for our careers site and job roles to provide insight into our
              company's culture. Duck helps us differentiate our career
              opportunities and enhance our candidate experience by impacting
              our time to fill and quality of hire metrics.
            </p>
            <footer
              data-stack
              style={{
                "--gutter": "var(--size-1)",
              }}
            >
              Ned Needleander <cite>Chief People Officer at Suzy</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
