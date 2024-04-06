import "./css/App.css";
import { Footer } from "./footer";
import { GetStarted } from "./get-started";
import { Header } from "./header";
import { Hero } from "./hero";
import { Streamline } from "./streamline";
import { Testimonial } from "./testimonial";

function App() {
  return (
    <div data-center style={{ "--maxWidth": "var(--size-xl)" }}>
      <Header />
      <Hero />
      <Testimonial />
      <Streamline />
      <GetStarted />
      <Footer />
    </div>
  );
}

export default App;
