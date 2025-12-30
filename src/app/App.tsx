import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Benefits } from "./components/Benefits";
import { QuoteForm } from "./components/QuoteForm";
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
        <HowItWorks />
        <Benefits />
        <QuoteForm />
        <Testimonials />
        <FAQ />

        {/* 🌍 Google Map – Full Width */}
        <MapSection />
      </main>

      <Footer />
    </div>
  );
}
