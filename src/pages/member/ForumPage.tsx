import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MessageSquare, ThumbsUp, Eye, TrendingUp } from "lucide-react";

const forumTopics = [
  {
    id: 1,
    title: "Best practices for remote employee onboarding",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    category: "Onboarding",
    replies: 23,
    views: 456,
    likes: 34,
    lastActivity: "2 hours ago",
    isPopular: true,
  },
  {
    id: 2,
    title: "How to handle workplace conflicts effectively",
    author: "Michael Chen",
    authorInitials: "MC",
    category: "Employee Relations",
    replies: 18,
    views: 289,
    likes: 21,
    lastActivity: "5 hours ago",
    isPopular: false,
  },
  {
    id: 3,
    title: "Implementing performance management systems",
    author: "Aisha Mohammed",
    authorInitials: "AM",
    category: "Performance",
    replies: 31,
    views: 612,
    likes: 45,
    lastActivity: "1 day ago",
    isPopular: true,
  },
  {
    id: 4,
    title: "Compensation benchmarking in Nigerian organizations",
    author: "David Okafor",
    authorInitials: "DO",
    category: "Compensation",
    replies: 15,
    views: 234,
    likes: 19,
    lastActivity: "2 days ago",
    isPopular: false,
  },
];

const categories = [
  { name: "Recruitment", count: 45 },
  { name: "Training & Development", count: 38 },
  { name: "Employee Relations", count: 52 },
  { name: "Compensation", count: 31 },
  { name: "Performance", count: 28 },
  { name: "HR Technology", count: 24 },
];

export default function ForumPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Member Forum</h2>
            <p className="text-muted-foreground">Connect and discuss with fellow HR professionals</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            className="pl-9"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4 mt-6">
                {forumTopics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" />
                          <AvatarFallback>{topic.authorInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-1">
                                {topic.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                by {topic.author} • {topic.lastActivity}
                              </p>
                            </div>
                            {topic.isPopular && (
                              <Badge variant="secondary" className="ml-2">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="mb-3">{topic.category}</Badge>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {topic.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {topic.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              {topic.likes} likes
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="popular" className="space-y-4 mt-6">
                {forumTopics.filter(t => t.isPopular).map((topic) => (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" />
                          <AvatarFallback>{topic.authorInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-1">
                            {topic.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {topic.author} • {topic.lastActivity}
                          </p>
                          <Badge variant="outline" className="mb-3">{topic.category}</Badge>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {topic.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {topic.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="unanswered" className="mt-6">
                <Card>
                  <CardContent className="pt-6 text-center py-12">
                    <p className="text-muted-foreground">No unanswered discussions at the moment.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Forum Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Discussions</p>
                  <p className="text-2xl font-bold">218</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                  <p className="text-2xl font-bold">487</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">32 new posts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
