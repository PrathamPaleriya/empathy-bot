import { ArrowRight } from 'lucide-react';
import ImageCard from '../../libs/ImageCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-dm-sans font-bold text-[#1c1c1c] leading-tight mb-6">
            An AI best friend that <br /> <span className="text-[#57b4ba]">feels real.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#343434] mb-10 max-w-2xl mx-auto">
            Talk freely, feel heard, and process your emotions without judgment. Like a warm hug
            when you need it most.
          </p>
          <Link to="/signup">
            <motion.button
              whileHover={{}}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring' }}
              className="bg-[#57b4ba] hover:bg-[#015551]  text-white text-lg py-4 px-10 rounded-full transition-colors shadow-md flex items-center mx-auto"
            >
              Try Eira Free
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </Link>
        </div>

        <div className="mt-15 md:mt-20">
          <ImageCard
            path={'empathybot/demo.png'}
            className="rounded-2xl md:rounded-4xl aspect-video h-full w-full object-center object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
