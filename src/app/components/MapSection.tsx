export function MapSection() {
  return (
    <section id="map" className="bg-white py-12">
      {/* عنوان القسم */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          TOP Cash For Junks
        </h2>
      </div>

      {/* الحاوية مع مسافة جانبية */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[450px] lg:h-[550px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Cash For Junks Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.515990199985!2d-87.548118!3d41.622977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e21dc345069ed%3A0x1cb3b088c9d51f8c!2sQuick%20CASH%20JUNK%20CARS%20LLC!5e0!3m2!1sen!2sjo!4v1788272424036!5m2!1sen!2sjo" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
