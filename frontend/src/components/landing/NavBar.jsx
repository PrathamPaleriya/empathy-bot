import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-6 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-[#015551] font-dm-sans font-bold text-2xl">EmpathyBot</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors">
            How It Works
          </a>
          <a href="#features" className="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors">
            Features
          </a>
          <a href="#about" className="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors">
            About
          </a>
          <Link
            to="/signup"
            className="bg-[#57b4ba] hover:bg-[#015551] text-white py-2 px-6 rounded-full transition-colors"
          >
            Try EmpathyBot Free
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#015551]">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#fdfaee] shadow-lg z-10 py-4 px-6">
          <div className="flex flex-col space-y-4">
            <a
              href="#how-it-works"
              className="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#about"
              className="text-[#4f4f4f] hover:text-[#57b4ba] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <Link
              to="/signup"
              className="bg-[#57b4ba] hover:bg-[#015551] text-white py-2 px-6 rounded-full transition-colors w-full"
            >
              Try EmpathyBot Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
