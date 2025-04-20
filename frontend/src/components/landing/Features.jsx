import { Brain, MessageCircle, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain size={32} className="text-[#57b4ba]" />,
      title: 'Emotional Memory',
      description:
        'EmpathyBot remembers your conversations, preferences, and emotional patterns to provide personalized support.',
    },
    {
      icon: <MessageCircle size={32} className="text-[#57b4ba]" />,
      title: 'Human-Like Tone',
      description:
        'Conversations feel natural and warm, creating a genuine connection that feels like talking to a close friend.',
    },
    {
      icon: <Clock size={32} className="text-[#57b4ba]" />,
      title: 'Always There For You',
      description:
        'Available 24/7 whenever you need to talk, process emotions, or simply feel understood.',
    },
  ];

  return (
    <section id="features" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-dm-sans font-bold text-[#1c1c1c] mb-4">
            What Makes It Special
          </h2>
          <p className="text-lg text-[#4f4f4f] max-w-2xl mx-auto">
            EmpathyBot combines advanced AI with emotional intelligence to create a uniquely
            supportive experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-[#fdfaee] rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-dm-sans font-bold text-[#343434] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#4f4f4f]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
