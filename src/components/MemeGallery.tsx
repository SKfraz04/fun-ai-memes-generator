
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface MemeGalleryProps {
  presetMemes: string[];
  onSelectPreset: (index: number) => void;
  onUploadImage: (file: File) => void;
}

const MemeGallery: React.FC<MemeGalleryProps> = ({
  presetMemes,
  onSelectPreset,
  onUploadImage,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUploadImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUploadImage(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Image</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preset">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preset">Preset Templates</TabsTrigger>
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preset" className="pt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {presetMemes.map((meme, index) => (
                <div 
                  key={index}
                  className="relative aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-all border border-gray-200 hover:border-meme-purple"
                  onClick={() => onSelectPreset(index)}
                >
                  <img 
                    src={meme} 
                    alt={`Meme template ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="pt-4">
            <div 
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer ${
                dragActive ? 'border-meme-purple bg-meme-purple/10' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <div className="mb-4">
                <svg 
                  className={`mx-auto h-12 w-12 ${dragActive ? 'text-meme-purple' : 'text-gray-400'}`}
                  stroke="currentColor" 
                  fill="none" 
                  viewBox="0 0 48 48" 
                  aria-hidden="true"
                >
                  <path 
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {dragActive ? 'Drop image here' : 'Drag & drop image here or click to browse'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MemeGallery;
