import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function NewsManagement() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    published: false,
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch news");
      return;
    }

    setNews(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("news")
      .insert([{
        ...formData,
        published_at: formData.published ? new Date().toISOString() : null,
      }]);

    if (error) {
      toast.error("Failed to create news article");
      return;
    }

    toast.success("News article created successfully");
    setDialogOpen(false);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image_url: "",
      published: false,
    });
    fetchNews();
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("news")
      .update({
        published: !currentStatus,
        published_at: !currentStatus ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update publication status");
      return;
    }

    toast.success(`Article ${!currentStatus ? 'published' : 'unpublished'} successfully`);
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete article");
      return;
    }

    toast.success("Article deleted successfully");
    fetchNews();
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">News Management</h1>
            <p className="text-muted-foreground">Create and manage news articles</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create News Article</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    placeholder="Short summary of the article..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL (Optional)</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Article</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{news.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {news.filter(n => n.published).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {news.filter(n => !n.published).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Articles</CardTitle>
            <CardDescription>
              {news.length} article(s) in total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : news.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No articles found. Create your first article.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {news.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>
                        <Badge variant={article.published ? "default" : "secondary"}>
                          {article.published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(article.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTogglePublish(article.id, article.published)}
                          >
                            {article.published ? "Unpublish" : "Publish"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(article.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
