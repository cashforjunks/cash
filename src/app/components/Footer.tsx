import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-white mb-4">Cash For Junks</h3>
            <p className="text-sm">
              Illinois's most trusted junk car buyer. Get top dollar for your vehicle with free towing included.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#quote-form" className="hover:text-white transition-colors">Get a Quote</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Junk Car Removal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cash for Cars</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Towing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scrap Car Buyers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instant Quote</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div>Call us 24/7</div>
                  <a
                    href="tel:+17089791549"
                    className="block text-green-400 hover:text-green-300"
                  >
                    (708) 979-1549
                  </a>
                  <a
                    href="tel:+17087172104"
                    className="block text-green-400 hover:text-green-300"
                  >
                    (708) 717-2104
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:carsjunk81@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  carsjunk81@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Illinois, United States</span>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 Cash For Junks. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
