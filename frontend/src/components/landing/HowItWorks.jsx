import { MessageSquare, Heart, Smile } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare size={32} className="text-[#57b4ba]" />,
      title: 'Say anything.',
      description: 'Share your thoughts, feelings, and experiences without fear of judgment.',
    },
    {
      icon: <Heart size={32} className="text-[#57b4ba]" />,
      title: 'Be understood.',
      description: 'Experience the comfort of being truly heard and emotionally supported.',
    },
    {
      icon: <Smile size={32} className="text-[#57b4ba]" />,
      title: 'Feel better.',
      description: "Process your emotions and gain clarity with a companion who's always there.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 md:px-12 lg:px-24 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-dm-sans font-bold text-[#1c1c1c] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#4f4f4f] max-w-2xl mx-auto">
            Eira makes emotional connection simple and accessible whenever you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-[#fdfaee] rounded-full flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-dm-sans font-bold text-[#343434] mb-3">{step.title}</h3>
              <p className="text-[#4f4f4f]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
