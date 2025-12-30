
"use client";

import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1597008641621-3f8d9d5c8f1d",
  "https://images.unsplash.com/photo-1605559424843-9c3a4d4a1c33",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738",
  "https://images.unsplash.com/photo-1600369672770-985fd30004eb",
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
            Some junk cars we picked up for cash
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-lg"
            >
              <Image
                src={src}
                alt={`Work ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
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
