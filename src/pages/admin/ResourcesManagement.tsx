import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Upload, Download, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ResourcesManagement() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file_type: "",
    category: "",
    file_url: "",
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch resources");
      return;
    }

    setResources(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("resources")
      .insert([{ ...formData }]);

    if (error) {
      toast.error("Failed to create resource");
      return;
    }

    toast.success("Resource created successfully");
    setDialogOpen(false);
    setFormData({
      title: "",
      description: "",
      file_type: "",
      category: "",
      file_url: "",
    });
    fetchResources();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    const { error } = await supabase
      .from("resources")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete resource");
      return;
    }

    toast.success("Resource deleted successfully");
    fetchResources();
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Resources Management</h1>
            <p className="text-muted-foreground">Manage documents and resources for members</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Guidelines">Guidelines</SelectItem>
                        <SelectItem value="Templates">Templates</SelectItem>
                        <SelectItem value="Reports">Reports</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Training">Training Materials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file_type">File Type</Label>
                    <Select
                      value={formData.file_type}
                      onValueChange={(value) => setFormData({ ...formData, file_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select file type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="DOC">Document</SelectItem>
                        <SelectItem value="PPT">Presentation</SelectItem>
                        <SelectItem value="XLS">Spreadsheet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file_url">File URL</Label>
                  <Input
                    id="file_url"
                    type="url"
                    value={formData.file_url}
                    onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                    placeholder="https://example.com/file.pdf"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Resource</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Resources</CardTitle>
            <CardDescription>
              {resources.length} resource(s) available
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : resources.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No resources found. Create your first resource.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>File Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.title}</TableCell>
                      <TableCell>{resource.category}</TableCell>
                      <TableCell>{resource.file_type}</TableCell>
                      <TableCell>
                        {new Date(resource.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(resource.file_url, '_blank')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(resource.id)}
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
