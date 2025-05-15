
import React, { useRef, useEffect } from 'react';
import { Caption } from '@/hooks/useMeme';

interface MemeCanvasProps {
  imageUrl: string | null;
  captions: Caption[];
  canvasRef: React.RefObject<HTMLDivElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  onStartDrag: (id: string, e: React.MouseEvent | React.TouchEvent) => void;
  onDrag: (id: string, deltaX: number, deltaY: number) => void;
  onEndDrag: (id: string) => void;
}

const MemeCanvas: React.FC<MemeCanvasProps> = ({
  imageUrl,
  captions,
  canvasRef,
  imageRef,
  onStartDrag,
  onDrag,
  onEndDrag,
}) => {
  const dragRefs = useRef<{ [key: string]: { lastX: number; lastY: number } }>({});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      for (const caption of captions) {
        if (caption.dragging) {
          const canvas = canvasRef.current;
          if (!canvas) continue;
          
          const rect = canvas.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          
          const lastPos = dragRefs.current[caption.id] || { lastX: x, lastY: y };
          const deltaX = x - lastPos.lastX;
          const deltaY = y - lastPos.lastY;
          
          onDrag(caption.id, deltaX, deltaY);
          
          dragRefs.current[caption.id] = { lastX: x, lastY: y };
        }
      }
    };

    const handleMouseUp = () => {
      captions.forEach((caption) => {
        if (caption.dragging) {
          onEndDrag(caption.id);
          delete dragRefs.current[caption.id];
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [captions, onDrag, onEndDrag, canvasRef]);

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    dragRefs.current[id] = { lastX: x, lastY: y };
    onStartDrag(id, e);
  };

  return (
    <div 
      ref={canvasRef}
      className="meme-container w-full max-w-2xl aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg"
    >
      {imageUrl ? (
        <div className="relative w-full h-full">
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Meme"
            className="object-contain w-full h-full"
          />
          {captions.map((caption) => (
            <div
              key={caption.id}
              className="meme-text"
              style={{
                left: `${caption.x}%`,
                top: `${caption.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${caption.fontSize}px`,
                cursor: caption.dragging ? 'grabbing' : 'grab',
              }}
              onMouseDown={(e) => handleMouseDown(caption.id, e)}
            >
              {caption.text}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-500">
          No image selected
        </div>
      )}
    </div>
  );
};

export default MemeCanvas;
