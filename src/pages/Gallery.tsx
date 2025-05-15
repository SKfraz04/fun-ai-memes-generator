
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for gallery
const mockGallery = [
  {
    id: '1',
    imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
    captions: ['One does not simply', 'create memes without AI'],
    creator: 'meme_lover',
    likes: 423
  },
  {
    id: '2',
    imageUrl: 'https://i.imgflip.com/1g8my4.jpg',
    captions: ['When you have to choose', 'between sleep and memes'],
    creator: 'sleepy_memer',
    likes: 289
  },
  {
    id: '3',
    imageUrl: 'https://i.imgflip.com/2wifvo.jpg',
    captions: ['When your code works', 'but you have no idea why'],
    creator: 'confused_dev',
    likes: 512
  },
  {
    id: '4',
    imageUrl: 'https://i.imgflip.com/1bij.jpg',
    captions: ['One does not simply', 'stop making memes'],
    creator: 'meme_king',
    likes: 347
  },
  {
    id: '5',
    imageUrl: 'https://i.imgflip.com/43a45p.png',
    captions: ['Wait, it's all memes?', 'Always has been'],
    creator: 'astro_memer',
    likes: 675
  },
  {
    id: '6',
    imageUrl: '/placeholder.svg',
    captions: ['When you realize', 'this is just a mock gallery'],
    creator: 'meta_memer',
    likes: 201
  },
];

const GalleryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Meme <span className="bg-clip-text text-transparent bg-gradient-to-r from-meme-purple to-meme-pink">Gallery</span>
        </h1>
        <p className="text-center text-gray-600 max-w-xl">
          Check out these community-created memes for inspiration or just a good laugh!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGallery.map((meme) => (
          <Card key={meme.id} className="overflow-hidden flex flex-col">
            <div className="relative aspect-square">
              <img 
                src={meme.imageUrl} 
                alt={`Meme by ${meme.creator}`}
                className="w-full h-full object-cover"
              />
              {/* Simulate captions on the images */}
              {meme.captions.length > 0 && (
                <div className="absolute top-1/4 left-0 w-full text-center">
                  <span className="meme-text inline-block shadow-lg">
                    {meme.captions[0]}
                  </span>
                </div>
              )}
              {meme.captions.length > 1 && (
                <div className="absolute bottom-1/4 left-0 w-full text-center">
                  <span className="meme-text inline-block shadow-lg">
                    {meme.captions[1]}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 bg-white flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">by @{meme.creator}</span>
                <span className="text-xs text-gray-400">{meme.likes} likes</span>
              </div>
              <Button variant="ghost" size="sm" className="text-meme-purple">
                <Sparkles className="h-4 w-4 mr-1" />
                Remix
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-center">Ready to create your own?</h2>
        <Button 
          className="mt-4 bg-gradient-to-r from-meme-purple to-meme-pink hover:opacity-90"
          asChild
        >
          <Link to="/">Create Your Meme</Link>
        </Button>
      </div>
    </div>
  );
};

export default GalleryPage;
