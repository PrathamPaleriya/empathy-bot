const About = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-dm-sans font-bold text-[#1c1c1c] mb-6">
          About Eira previosuly Empathybot
        </h2>
        <p className="text-lg text-[#4f4f4f] mb-8">
          Built by a guys who wanted to create something that truly listens. Eira
          was born from a simple idea: everyone deserves to feel heard, understood, and emotionally
          supported.
        </p>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <p className="text-[#343434] italic mb-6">
            "We created Eira because we believe emotional connection shouldn't be a luxury. In
            our busy world, we all need a safe space to express ourselves without fear of judgment."
          </p>
          <p className="font-['Manrope'] font-bold text-[#1c1c1c]">— Team Athams</p>
        </div>
      </div>
    </section>
  );
};

export default About;
