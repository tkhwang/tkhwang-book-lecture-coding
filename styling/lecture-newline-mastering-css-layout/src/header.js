export function Header() {
  return (
    <header data-inline-cluster="justify:space-between" className="header">
      <div className="logo">duck</div>
      <nav>
        <ul
          data-inline-cluster
          role="list"
          style={{ "--gutter": "var(--size-5)" }}
        >
          <li>Overview</li>
          <li>Product</li>
          <li>Resources</li>
        </ul>
      </nav>
      <div data-inline-cluster style={{ "--gutter": "var(--size-5)" }}>
        <button className="button">Book a Demo</button>
        <a href="/#">Sign in</a>
      </div>
    </header>
  );
}
