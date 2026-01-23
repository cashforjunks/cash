const images = [
  "https://i.im.ge/2026/01/20/GYdZgc.Untitled-1920-x-180-px-Facebook-Video.webp",
  "https://i.im.ge/2026/01/20/GYdVML.Untitled-1920-x-180-px-Facebook-Video-1.webp",
  "https://i.im.ge/2026/01/24/GVtTt4.WhatsApp-Image-2026-01-24-at-1-28-37-AM.jpeg",
  "https://i.im.ge/2026/01/24/GVtQsD.WhatsApp-Image-2026-01-24-at-1-29-29-AM.jpeg",
  "https://i.im.ge/2026/01/24/GVtozC.WhatsApp-Image-2026-01-24-at-1-29-30-AM.jpeg",
  "https://i.im.ge/2025/12/30/BbyzQy.2021-06-23.webp",
  "https://i.im.ge/2025/12/30/BbyHLS.2021-04-06.webp",
  "https://i.im.ge/2025/12/30/BbyV9a.2025-02-23.webp",
];

export function OurWork() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Recent Work
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Chicago
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={src}
                alt={`Work ${index + 1}`}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  Junk Car Pickup
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
