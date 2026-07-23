import { Button } from "./ui/button";
import { Phone } from "lucide-react";

export function Hero() {
  const scrollToQuote = () => {
    document
      .getElementById("quote-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      
      {/* الخلفية */}
      <div className="absolute inset-0 z-0">
        
        {/* صورة الديسكتوب */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://webuyjunkcars4cash.com/wp-content/uploads/2021/02/Get-Cash-For-Junk-Cars-in-the-Chicagoland-Area.webp)",
          }}
        />

        {/* صورة الموبايل 👇 ضع رابط صورة الموبايل هنا */}
        <div
          className="block md:hidden absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://www.cashforclunkers.org/wp-content/uploads/2021/06/Where-Can-I-Sell-My-Car-for-Cash-1-1.jpg)",
          }}
        />

        {/* التعتيم */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* المحتوى */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="mb-6">
          Get Top Dollar for Your Junk Car Today
        </h1>

        <p className="mb-8 max-w-2xl mx-auto text-lg text-gray-200">
          Get Instant Cash For
Your Junk Car
Up to $2,500
Same-Day Pickup
Free Towing
No Title Needed
Instant offer to sell your car fast.

Get an accurate offer in just minutes.

        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6"
            onClick={scrollToQuote}
          >
            Get Instant Quote
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6"
            asChild
          >
            <a href="tel:+17089791549">
              <Phone className="mr-2 h-5 w-5" />
              Call: (708) 998-1730
            </a>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div>
            <div className="mb-2">Fast Cash</div>
            <div className="text-gray-300">Get paid instantly</div>
          </div>
          <div>
            <div className="mb-2">Free Towing</div>
            <div className="text-gray-300">We pick up for free</div>
          </div>
          <div>
            <div className="mb-2">Any Condition</div>
            <div className="text-gray-300">Running or not</div>
          </div>
        </div>
      </div>
    </div>
  );
}
