import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Download, FileText, Video, BookOpen, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching resources:', error);
    } else {
      setResources(data || []);
    }
    setIsLoading(false);
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const documentResources = filteredResources.filter(r => 
    ['pdf', 'docx', 'xlsx', 'doc', 'xls'].includes(r.file_type?.toLowerCase())
  );

  const videoResources = filteredResources.filter(r => 
    ['mp4', 'avi', 'mov', 'video'].includes(r.file_type?.toLowerCase())
  );

  const getFileIcon = (fileType: string) => {
    if (['mp4', 'avi', 'mov', 'video'].includes(fileType?.toLowerCase())) {
      return <Video className="h-6 w-6 text-primary" />;
    }
    return <FileText className="h-6 w-6 text-primary" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Resources</h2>
          <p className="text-muted-foreground">Access professional development materials and learning resources</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredResources.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-muted-foreground">No resources found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            {getFileIcon(resource.file_type)}
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{resource.title}</h3>
                            {resource.description && (
                              <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                            )}
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              {resource.file_type && <span>{resource.file_type.toUpperCase()}</span>}
                              {resource.category && (
                                <>
                                  <span>•</span>
                                  <Badge variant="outline">{resource.category}</Badge>
                                </>
                              )}
                              {resource.created_at && (
                                <>
                                  <span>•</span>
                                  <span>{format(new Date(resource.created_at), 'MMM yyyy')}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(resource.file_url, '_blank')}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : documentResources.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-muted-foreground">No documents found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {documentResources.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{doc.title}</h3>
                            {doc.description && (
                              <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                            )}
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{doc.file_type?.toUpperCase()}</span>
                              {doc.category && <Badge variant="outline">{doc.category}</Badge>}
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(doc.file_url, '_blank')}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : videoResources.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-muted-foreground">No videos found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {videoResources.map((video) => (
                  <Card key={video.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                          <Video className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold">{video.title}</h3>
                        {video.description && (
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                        )}
                        {video.category && (
                          <Badge variant="outline">{video.category}</Badge>
                        )}
                        <Button 
                          className="w-full"
                          onClick={() => window.open(video.file_url, '_blank')}
                        >
                          Watch Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
