
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-meme-purple to-meme-pink">
              MemeCraft
            </span>
            <span className="ml-2 px-2 py-1 rounded-md bg-meme-purple/10 text-meme-purple text-xs font-medium">
              AI
            </span>
          </Link>
          
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/">Create</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/gallery">Gallery</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/about">About</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
