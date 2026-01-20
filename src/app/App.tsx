import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { QuoteForm } from "./components/QuoteForm";
import { OurWork } from "./components/OurWork";
import { HowItWorks } from "./components/HowItWorks";
import { Benefits } from "./components/Benefits";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { MapSection } from "./components/MapSection";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Hero />
        <QuoteForm />
        <OurWork />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <FAQ />
        <MapSection />
      </main>

      <Footer />
    </div>
  );
}
