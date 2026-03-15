import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function GalleryManagement() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchImages(); }, []);

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
    setImages(data || []);
    setLoading(false);
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) { toast.error("Please select an image"); return; }
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }

    setUploading(true);
    const fileName = `gallery/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("documents").upload(fileName, file);
    if (uploadError) { toast.error("Upload failed"); setUploading(false); return; }

    const { data: { publicUrl } } = supabase.storage.from("documents").getPublicUrl(fileName);

    const { error } = await supabase.from("gallery_images").insert({
      title: title || file.name,
      image_url: publicUrl,
    });
    setUploading(false);
    if (error) { toast.error("Failed to save image"); return; }
    toast.success("Image uploaded successfully");
    setTitle("");
    if (fileRef.current) fileRef.current.value = "";
    fetchImages();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Image deleted");
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Gallery Management</h2>
          <p className="text-muted-foreground">Upload and manage gallery images</p>
        </div>

        <Card>
          <CardHeader><CardTitle>Upload New Image</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title (optional)</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Image title" />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <Input ref={fileRef} type="file" accept="image/*" />
            </div>
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Upload Image
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Gallery Images ({images.length})</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : images.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No gallery images yet. Upload your first image above.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map(img => (
                  <div key={img.id} className="relative group rounded-lg overflow-hidden border">
                    <img src={img.image_url} alt={img.title} className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(img.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                    {img.title && <p className="p-2 text-xs truncate">{img.title}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
