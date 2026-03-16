import React from "react";

export const ServiceAreas = () => {
  const cities = [
    "Chicago",
    "Bridgeview",
    "Oak Park",
    "Evanston",
    "Schaumburg",
    "Naperville",
    "Aurora",
    "Joliet",
    "Cicero",
    "Arlington Heights",
    "Downers Grove",
    "Elgin",
    "Des Plaines",
    "Skokie",
    "Waukegan",
    "Bolingbrook",
    "Palos Hills",
    "Tinley Park",
    "Oak Lawn",
    "Berwyn",

    "Calumet City",
    "Harvey",
    "Hammond",
    "Gary",
    "Dolton",
    "Blue Island",
    "South Holland",
    "East Chicago",
    "Chicago Heights",
    "Crestwood",
    "Summit",
    "Worth",
    "Markham",
    "South Side Chicago"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Service Areas</h2>
        <p className="text-center mb-12 text-gray-700">
          We proudly provide our services in the following cities:
        </p>

        <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cities.map((city) => (
              <li key={city} className="flex items-center text-gray-800">
                <span className="text-green-500 mr-2">✅</span>
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
