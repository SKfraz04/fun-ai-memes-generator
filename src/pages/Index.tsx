
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, Download } from "lucide-react";
import { useMeme } from '@/hooks/useMeme';
import MemeCanvas from '@/components/MemeCanvas';
import CaptionControls from '@/components/CaptionControls';
import MemeGallery from '@/components/MemeGallery';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const {
    state,
    canvasRef,
    imageRef,
    addCaption,
    updateCaption,
    removeCaption,
    startDrag,
    onDrag,
    endDrag,
    changeFontSize,
    selectPresetMeme,
    uploadImage,
    generateAICaption,
    exportMeme,
    getPresetMemes,
  } = useMeme();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-meme-purple to-meme-pink">AI-Powered Meme</span>
        </h1>
        <p className="text-center text-gray-600 max-w-xl">
          Upload an image, choose a template, add captions manually or generate them with AI.
          Then drag and position your captions to create the perfect meme!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Meme Canvas */}
            <div className="flex flex-col items-center">
              <MemeCanvas
                imageUrl={state.imageUrl}
                captions={state.captions}
                canvasRef={canvasRef}
                imageRef={imageRef}
                onStartDrag={startDrag}
                onDrag={onDrag}
                onEndDrag={endDrag}
              />
              
              <div className="mt-4 w-full flex justify-center">
                <Button 
                  onClick={exportMeme} 
                  className="bg-meme-purple hover:bg-meme-purple/90"
                  disabled={!state.imageUrl || state.isExporting}
                >
                  {state.isExporting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Meme
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Caption Controls */}
            <div className="lg:hidden">
              <CaptionControls 
                captions={state.captions}
                isGenerating={state.isGenerating}
                onAddCaption={addCaption}
                onUpdateCaption={updateCaption}
                onRemoveCaption={removeCaption}
                onChangeFontSize={changeFontSize}
                onGenerateAICaption={generateAICaption}
              />
            </div>
            
            {/* Image Selection */}
            <MemeGallery 
              presetMemes={getPresetMemes()}
              onSelectPreset={selectPresetMeme}
              onUploadImage={uploadImage}
            />
          </div>
        </div>

        {/* Sidebar Controls - Hidden on mobile */}
        <div className="hidden lg:block">
          <CaptionControls 
            captions={state.captions}
            isGenerating={state.isGenerating}
            onAddCaption={addCaption}
            onUpdateCaption={updateCaption}
            onRemoveCaption={removeCaption}
            onChangeFontSize={changeFontSize}
            onGenerateAICaption={generateAICaption}
          />
        </div>
      </div>
      
      <div className="mt-12 flex flex-col items-center">
        <ArrowDown className="h-6 w-6 text-meme-purple animate-bounce-soft" />
        <h2 className="mt-2 text-xl font-semibold text-center">Need inspiration? Check out our gallery!</h2>
        <Button 
          className="mt-4 bg-gradient-to-r from-meme-purple to-meme-pink hover:opacity-90"
          asChild
        >
          <a href="/gallery">Browse Meme Gallery</a>
        </Button>
      </div>
    </div>
  );
};

export default Index;
