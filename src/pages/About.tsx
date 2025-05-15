
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Image, MoveRight, Download } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-meme-purple to-meme-pink">MemeCraft AI</span>
        </h1>
        <p className="text-center text-gray-600 max-w-xl">
          The AI-powered meme generator that lets you create, customize, and share hilarious memes in seconds!
        </p>
      </div>

      <div className="space-y-16">
        {/* How it Works Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="mb-4 rounded-full bg-meme-purple/10 p-3">
                <Image className="h-8 w-8 text-meme-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Image</h3>
              <p className="text-gray-600">Upload your own image or select from our gallery of popular meme templates.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="mb-4 rounded-full bg-meme-purple/10 p-3">
                <Sparkles className="h-8 w-8 text-meme-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Add AI Captions</h3>
              <p className="text-gray-600">Generate witty captions with our AI or create your own custom text.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="mb-4 rounded-full bg-meme-purple/10 p-3">
                <Download className="h-8 w-8 text-meme-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Export & Share</h3>
              <p className="text-gray-600">Download your finished meme and share it with friends or on social media.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <div className="rounded-full bg-meme-purple/10 p-1.5 mr-2">
                  <Sparkles className="h-5 w-5 text-meme-purple" />
                </div>
                AI Caption Generator
              </h3>
              <p className="text-gray-600">
                Our advanced AI can generate hilarious, contextual captions based on your image or prompts.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <div className="rounded-full bg-meme-purple/10 p-1.5 mr-2">
                  <MoveRight className="h-5 w-5 text-meme-purple" />
                </div>
                Drag & Drop Editor
              </h3>
              <p className="text-gray-600">
                Easily position your captions exactly where you want them with our intuitive drag-and-drop interface.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <div className="rounded-full bg-meme-purple/10 p-1.5 mr-2">
                  <Image className="h-5 w-5 text-meme-purple" />
                </div>
                Template Library
              </h3>
              <p className="text-gray-600">
                Access a growing collection of popular meme templates to kickstart your creativity.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <div className="rounded-full bg-meme-purple/10 p-1.5 mr-2">
                  <Download className="h-5 w-5 text-meme-purple" />
                </div>
                One-Click Export
              </h3>
              <p className="text-gray-600">
                Download your meme as a high-quality image file with a single click.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-meme-purple to-meme-pink rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Some Memes?</h2>
          <p className="mb-6 max-w-xl mx-auto">
            Jump in and start creating hilarious memes with the power of AI. It's free, fast, and ridiculously fun!
          </p>
          <Button asChild className="bg-white text-meme-purple hover:bg-white/90">
            <Link to="/">Create Your First Meme</Link>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
