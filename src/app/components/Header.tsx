import { Phone } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const phoneNumber = "+17088866282";
  const phoneLink = `tel:${phoneNumber}`;

  const scrollToQuote = () => {
    document
      .getElementById("quote-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * تسجيل تحويل Google Ads عند الضغط على رقم الهاتف،
   * ثم فتح تطبيق الاتصال.
   */
  const handlePhoneClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const googleWindow = window as typeof window & {
      gtag?: (
        command: string,
        eventName: string,
        parameters: {
          send_to: string;
          value: number;
          currency: string;
          event_callback?: () => void;
        }
      ) => void;
    };

    let navigationStarted = false;

    const openPhoneDialer = () => {
      if (navigationStarted) return;

      navigationStarted = true;
      window.location.href = phoneLink;
    };

    if (typeof googleWindow.gtag === "function") {
      googleWindow.gtag("event", "conversion", {
        send_to: "AW-18346965518/VxSmCMOXgdocEI70waxE",
        value: 1.0,
        currency: "USD",
        event_callback: openPhoneDialer,
      });

      /*
       * إذا لم ينفذ Google الـ callback لأي سبب،
       * يفتح الاتصال تلقائيًا بعد وقت قصير.
       */
      window.setTimeout(openPhoneDialer, 800);
    } else {
      console.warn("Google Ads gtag is not available.");
      openPhoneDialer();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">

          {/* Logo + Business Name */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center gap-3"
              aria-label="Quick Cash Junk Cars LLC"
            >
              <img
                src="/logo.png"
                alt="Quick Cash Junk Cars LLC"
                className="h-12 w-12 object-contain"
              />

              <span className="text-lg font-semibold text-gray-900">
                Quick Cash Junk Cars LLC
              </span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              How It Works
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("why-choose-us")}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Why Choose Us
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              FAQ
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href={phoneLink}
              onClick={handlePhoneClick}
              aria-label="Call us at 708 886 6282"
              className="hidden sm:flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>(708) 886-6282</span>
            </a>

            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700"
              onClick={scrollToQuote}
            >
              Get Quote
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
}
