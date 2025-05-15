import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Caption } from '@/hooks/useMeme';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowRight, 
  ArrowLeft, 
  LayoutDashboard, 
  Sparkles, 
  Trash2 
} from "lucide-react";

interface CaptionControlsProps {
  captions: Caption[];
  isGenerating: boolean;
  onAddCaption: (text: string) => void;
  onUpdateCaption: (id: string, text: string) => void;
  onRemoveCaption: (id: string) => void;
  onChangeFontSize: (id: string, size: number) => void;
  onGenerateAICaption: (prompt?: string) => Promise<void>;
}

const CaptionControls: React.FC<CaptionControlsProps> = ({
  captions,
  isGenerating,
  onAddCaption,
  onUpdateCaption,
  onRemoveCaption,
  onChangeFontSize,
  onGenerateAICaption,
}) => {
  const [newCaption, setNewCaption] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');

  const handleAddCaption = () => {
    if (newCaption.trim()) {
      onAddCaption(newCaption);
      setNewCaption('');
    }
  };

  const handleGenerateCaption = () => {
    onGenerateAICaption(aiPrompt);
    setAiPrompt('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5" />
          Caption Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add caption manually */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="Enter caption text..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCaption()}
            />
            <Button onClick={handleAddCaption}>Add</Button>
          </div>
        </div>

        {/* AI caption generation */}
        <Card className="border border-meme-light-purple bg-secondary/30">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-meme-purple" />
              AI Caption Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex items-center gap-2">
              <Input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe your meme idea..."
                disabled={isGenerating}
              />
              <Button 
                onClick={handleGenerateCaption} 
                variant="default"
                className="bg-meme-purple hover:bg-meme-purple/90"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>Generate</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing captions */}
        {captions.length > 0 && (
          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-medium">Current Captions</h3>
            {captions.map((caption) => (
              <Card key={caption.id} className="p-2 bg-background">
                <div className="flex flex-wrap gap-2">
                  <Input
                    value={caption.text}
                    onChange={(e) => onUpdateCaption(caption.id, e.target.value)}
                    className="flex-1 min-w-[180px]"
                  />
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onRemoveCaption(caption.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Size:</span>
                    <Slider
                      defaultValue={[caption.fontSize]}
                      min={12}
                      max={64}
                      step={1}
                      onValueChange={(value) => onChangeFontSize(caption.id, value[0])}
                      className="w-24"
                    />
                    <span className="text-xs w-6">{caption.fontSize}px</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CaptionControls;
