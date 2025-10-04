import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Download, FileText, Video, BookOpen, ExternalLink } from "lucide-react";

const documents = [
  {
    id: 1,
    title: "HR Best Practices Guide 2024",
    type: "PDF",
    size: "2.4 MB",
    category: "Guidelines",
    date: "Apr 2024",
  },
  {
    id: 2,
    title: "Employee Handbook Template",
    type: "DOCX",
    size: "856 KB",
    category: "Templates",
    date: "Mar 2024",
  },
  {
    id: 3,
    title: "Performance Appraisal Forms",
    type: "XLSX",
    size: "1.2 MB",
    category: "Templates",
    date: "Feb 2024",
  },
];

const videos = [
  {
    id: 1,
    title: "Introduction to Strategic HR Management",
    duration: "45 mins",
    category: "Training",
    views: 1245,
  },
  {
    id: 2,
    title: "Conducting Effective Performance Reviews",
    duration: "30 mins",
    category: "Workshop",
    views: 890,
  },
  {
    id: 3,
    title: "HR Analytics & Data-Driven Decisions",
    duration: "1 hour",
    category: "Webinar",
    views: 2150,
  },
];

const publications = [
  {
    id: 1,
    title: "CIPM HR Journal - Q1 2024",
    description: "Latest trends and insights in human resource management",
    type: "Journal",
    date: "Jan 2024",
  },
  {
    id: 2,
    title: "Nigeria HR Salary Survey 2024",
    description: "Comprehensive salary benchmarking report",
    type: "Report",
    date: "Feb 2024",
  },
];

export default function ResourcesPage() {
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
          />
        </div>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="links">Useful Links</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{doc.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <Badge variant="outline">{doc.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{video.duration}</span>
                        <Badge variant="outline">{video.category}</Badge>
                      </div>
                      <Button className="w-full">Watch Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="publications" className="space-y-4">
            {publications.map((pub) => (
              <Card key={pub.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold mb-1">{pub.title}</h3>
                          <p className="text-sm text-muted-foreground">{pub.description}</p>
                        </div>
                        <Badge>{pub.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-muted-foreground">{pub.date}</span>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="links" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="#" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium">CIPM National Portal</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium">HR Learning Library</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium">Professional Standards & Ethics</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium">Nigeria Labour Laws Portal</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
