
export function MapSection() {
  return (
    <section id="map" className="w-full">
      <div className="w-full h-[450px] lg:h-[550px]">
        <iframe
          title="Company Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src=<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.203100230082!2d-87.79377099999999!3d41.802385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e374b6e3a30a7%3A0xdce958c0def29e04!2sI55%20TRUCK%20PARKING!5e0!3m2!1sen!2sjo!4v1767096314979!5m2!1sen!2sjo" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>
  );
}
