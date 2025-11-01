import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-20 px-6 md:px-12 lg:px-24 bg-white/50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-dm-sans font-bold text-[#1c1c1c] mb-6">
            Talk to your AI best friend now.
          </h2>
          <p className="text-lg text-[#4f4f4f] mb-8">
            Experience the comfort of being truly understood, whenever you need it.
          </p>
          <Link to={'/signup'}>
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

        <div className="border-t border-[#e0e0e0] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-[#015551] font-dm-sans font-bold text-xl">Eira</span>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="policy" className="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors">
                Privacy Policy
              </a>
              <a
                href="https://linktr.ee/athams"
                class="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors"
              >
                Contact Us
              </a>
              <a
                href="https://github.com/PrathamPaleriya/empathy-bot"
                target="_blank"
                className="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors"
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/prathampaleriya/"
                target="_blank"
                className="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="flex items-center flex-col md:flex-row md:justify-between">
            <div className="text-center mt-8 text-[#7c7c7c] text-sm">
              &copy; {new Date().getFullYear()} Athams. All rights reserved.
            </div>
            <a href='https://www.athams.com/' target='_blank' className="hover:underline text-center mt-8 text-[#7c7c7c] text-sm">
              By Athams.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
