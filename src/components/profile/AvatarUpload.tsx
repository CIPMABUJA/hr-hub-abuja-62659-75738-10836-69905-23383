import { useState, useRef, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Camera, Loader2, ZoomIn, RotateCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl: string | null;
  initials: string;
  onAvatarUpdated: (url: string) => void;
}

export default function AvatarUpload({ userId, currentAvatarUrl, initials, onAvatarUpdated }: AvatarUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState([1]);
  const [rotation, setRotation] = useState(0);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please select an image file", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 5MB allowed", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setPreviewSrc(src);
      const img = new Image();
      img.onload = () => setImageEl(img);
      img.src = src;
      setZoom([1]);
      setRotation(0);
      setOffset({ x: 0, y: 0 });
      setIsOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageEl;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 256;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom[0], zoom[0]);

    const scale = Math.max(size / img.width, size / img.height);
    const w = img.width * scale;
    const h = img.height * scale;

    ctx.drawImage(img, -w / 2 + offset.x, -h / 2 + offset.y, w, h);
    ctx.restore();
  }, [imageEl, zoom, rotation, offset]);

  // Redraw on changes
  useState(() => { drawCanvas(); });
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setDragging(false);

  const handleUpload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawCanvas();

    setIsUploading(true);
    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed"))), "image/jpeg", 0.9);
      });

      const filePath = `${userId}/avatar-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, blob, { contentType: "image/jpeg", upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      onAvatarUpdated(publicUrl);
      toast({ title: "Success", description: "Profile photo updated" });
      setIsOpen(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Upload failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  // Draw canvas whenever deps change
  if (canvasRef.current && imageEl) {
    requestAnimationFrame(drawCanvas);
  }

  return (
    <>
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={currentAvatarUrl || ""} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0 rounded-full h-8 w-8"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crop Profile Photo</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4">
            <div className="relative rounded-full overflow-hidden border-2 border-muted" style={{ width: 256, height: 256 }}>
              <canvas
                ref={canvasRef}
                width={256}
                height={256}
                className="cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            </div>

            <div className="w-full space-y-3">
              <div className="flex items-center gap-3">
                <ZoomIn className="h-4 w-4 text-muted-foreground shrink-0" />
                <Slider
                  value={zoom}
                  onValueChange={setZoom}
                  min={0.5}
                  max={3}
                  step={0.05}
                  className="flex-1"
                />
              </div>
              <div className="flex justify-center">
                <Button variant="outline" size="sm" onClick={() => setRotation((r) => (r + 90) % 360)}>
                  <RotateCw className="h-4 w-4 mr-1" /> Rotate
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading...</> : "Save Photo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
