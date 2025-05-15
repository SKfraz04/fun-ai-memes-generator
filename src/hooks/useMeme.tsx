
import { useState, useRef, useCallback } from 'react';
import { toast } from "@/components/ui/sonner";

export interface Caption {
  id: string;
  text: string;
  x: number;
  y: number;
  dragging: boolean;
  fontSize: number;
}

export interface MemeState {
  imageUrl: string | null;
  captions: Caption[];
  isGenerating: boolean;
  isExporting: boolean;
}

const defaultMemes = [
  '/placeholder.svg',
  'https://i.imgflip.com/30b1gx.jpg', // Drake Hotline Bling
  'https://i.imgflip.com/1g8my4.jpg', // Two Buttons
  'https://i.imgflip.com/2wifvo.jpg', // Unsettled Tom
  'https://i.imgflip.com/1bij.jpg',   // One Does Not Simply
  'https://i.imgflip.com/43a45p.png', // Always Has Been
];

export const useMeme = () => {
  const [state, setState] = useState<MemeState>({
    imageUrl: defaultMemes[0],
    captions: [],
    isGenerating: false,
    isExporting: false
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const addCaption = (captionText: string) => {
    if (!captionText.trim()) return;
    
    setState(prev => ({
      ...prev,
      captions: [
        ...prev.captions,
        {
          id: Date.now().toString(),
          text: captionText,
          x: 50,
          y: 50,
          dragging: false,
          fontSize: 28
        }
      ]
    }));
    
    toast.success("Caption added to meme");
  };

  const updateCaption = (id: string, text: string) => {
    setState(prev => ({
      ...prev,
      captions: prev.captions.map(cap => 
        cap.id === id ? { ...cap, text } : cap
      )
    }));
  };

  const removeCaption = (id: string) => {
    setState(prev => ({
      ...prev,
      captions: prev.captions.filter(cap => cap.id !== id)
    }));
    
    toast.info("Caption removed");
  };

  const startDrag = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    setState(prev => ({
      ...prev,
      captions: prev.captions.map(cap => 
        cap.id === id ? { ...cap, dragging: true } : cap
      )
    }));
  };

  const onDrag = useCallback((id: string, deltaX: number, deltaY: number) => {
    setState(prev => ({
      ...prev,
      captions: prev.captions.map(cap => 
        cap.id === id && cap.dragging 
          ? { 
              ...cap, 
              x: Math.min(Math.max(cap.x + deltaX, 0), 100),
              y: Math.min(Math.max(cap.y + deltaY, 0), 100)
            } 
          : cap
      )
    }));
  }, []);

  const endDrag = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      captions: prev.captions.map(cap => 
        cap.id === id ? { ...cap, dragging: false } : cap
      )
    }));
  }, []);

  const changeFontSize = (id: string, size: number) => {
    setState(prev => ({
      ...prev,
      captions: prev.captions.map(cap => 
        cap.id === id ? { ...cap, fontSize: size } : cap
      )
    }));
  };

  const setImageUrl = (url: string) => {
    setState(prev => ({ ...prev, imageUrl: url }));
  };

  const selectPresetMeme = (index: number) => {
    if (index >= 0 && index < defaultMemes.length) {
      setImageUrl(defaultMemes[index]);
      toast.success("Template selected");
    }
  };

  const uploadImage = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error("Please upload a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result.toString());
        toast.success("Image uploaded successfully");
      }
    };
    reader.readAsDataURL(file);
  };

  const generateAICaption = async (prompt?: string) => {
    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      // This is a placeholder. We'll implement the actual OpenAI API call later
      setTimeout(() => {
        const mockCaption = prompt 
          ? `AI caption about: ${prompt}` 
          : "This is a mock AI-generated caption!";
        addCaption(mockCaption);
        setState(prev => ({ ...prev, isGenerating: false }));
      }, 1500);
    } catch (error) {
      toast.error("Failed to generate caption");
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const exportMeme = async () => {
    if (!canvasRef.current || !imageRef.current) {
      toast.error("Unable to export meme");
      return;
    }

    setState(prev => ({ ...prev, isExporting: true }));

    try {
      // Using html-to-image would be ideal here, but we'll simulate for now
      // In the future, we'll add html-to-image for proper export
      setTimeout(() => {
        toast.success("Meme exported! (This is a placeholder)");
        setState(prev => ({ ...prev, isExporting: false }));
      }, 1000);
    } catch (error) {
      toast.error("Failed to export meme");
      setState(prev => ({ ...prev, isExporting: false }));
    }
  };

  const getPresetMemes = () => defaultMemes;

  return {
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
    setImageUrl,
    selectPresetMeme,
    uploadImage,
    generateAICaption,
    exportMeme,
    getPresetMemes,
  };
};
