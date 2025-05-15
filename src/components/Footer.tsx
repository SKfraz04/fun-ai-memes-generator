
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-meme-purple to-meme-pink">
              MemeCraft AI
            </span>
            <span className="ml-2 text-xs text-gray-500">
              © {new Date().getFullYear()}
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-meme-purple transition-colors">
              Home
            </Link>
            <Link to="/gallery" className="hover:text-meme-purple transition-colors">
              Gallery
            </Link>
            <Link to="/about" className="hover:text-meme-purple transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
