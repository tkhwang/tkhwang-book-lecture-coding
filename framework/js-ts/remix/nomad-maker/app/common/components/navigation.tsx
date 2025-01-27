import { Link } from "react-router";

function Navigation() {
  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div>
        <Link to="/" className="font-bold tracking-tighter text-lg">
          Wemake
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
