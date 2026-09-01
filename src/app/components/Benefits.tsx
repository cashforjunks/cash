import { CircleCheck, Shield, Clock, Award, Truck, Users } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: CircleCheck,
      title: "Top Dollar Offers",
      description: "We guarantee competitive prices for your junk car. Get the best value in the market.",
    },
    {
      icon: Truck,
      title: "Free Towing",
      description: "Free pickup and towing service included throughout Illinois and surrounding states.",
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "Quick quotes and same-day or next-day pickup available in most areas.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Licensed, bonded, and insured. Your transaction is completely safe with us.",
    },
    {
      icon: Award,
      title: "No Hidden Fees",
      description: "The quote you receive is the money you get. No surprise deductions or fees.",
    },
    {
      icon: Users,
      title: "Trusted by Thousands",
      description: "Over 50,000 satisfied customers nationwide. Check out our reviews!",
    },
  ];

  return (
    <div id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Choose Cash For Junks?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            About Quick CASH JUNK CARS LLC

Quick CASH JUNK CARS LLC is a junk car buying company serving
customers throughout Illinois. We buy junk, old, damaged, and
unwanted vehicles and provide cash offers with free towing.

Call (708) 886-6282 to get your free quote. 
            We're not just another junk car buyer. Here's what makes us different.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
