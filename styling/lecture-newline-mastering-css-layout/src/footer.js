export function Footer() {
  return (
    <footer
      data-stack
      style={{ "--gutter": "var(--size-5)" }}
      className="footer"
    >
      <div
        data-inline-cluster="align:start"
        style={{ "--gutter": "var(--size-10)" }}
      >
        <nav data-stack style={{ "--gutter": "var(--size-5)" }}>
          <h2 className="footer-heading">Product</h2>
          <ul data-stack style={{ "--gutter": "var(--size-3)" }} role="list">
            <li>Sourcing</li>
            <li>Social content</li>
            <li>Career site</li>
            <li>Job pages</li>
            <li>Interview guides</li>
            <li>Team member profiles</li>
            <li>Onboarding</li>
            <li>Text to Apply</li>
          </ul>
        </nav>
        <nav data-stack style={{ "--gutter": "var(--size-5)" }}>
          <h2 className="footer-heading">The team</h2>
          <ul data-stack style={{ "--gutter": "var(--size-3)" }} role="list">
            <li>About</li>
            <li>Contact Us</li>
          </ul>
        </nav>
        <nav data-stack style={{ "--gutter": "var(--size-5)" }}>
          <h2 className="footer-heading">Company</h2>
          <ul data-stack style={{ "--gutter": "var(--size-3)" }} role="list">
            <li>Overview</li>
            <li>Product</li>
            <li>Resources</li>
          </ul>
        </nav>
      </div>
      <nav
        data-inline-cluster="justify:center"
        style={{ "--gutter": "var(--size-5)" }}
        className="footer-terms-links"
      >
        <a href="/#">Accessibility Statement</a>
        <a href="/#">Privacy Policy</a>
        <a href="/#">Terms of Service</a>
      </nav>
    </footer>
  );
}
