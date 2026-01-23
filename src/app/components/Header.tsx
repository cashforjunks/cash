import { Phone } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const scrollToQuote = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Flag Animation */}
      <style>{`
        @keyframes flagFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo + Name + Flag */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-2">
                <div className="text-green-600">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <span className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                  Cash For Junks Maximum LLS

                  
                    }}
                  />
                </span>
              </a>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("why-choose-us")}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+17089791549"
                className="hidden sm:flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                <Phone className="h-4 w-4" />
                <span>(708) 979-1549</span>
              </a>

              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={scrollToQuote}
              >
                Get Quote
              </Button>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
