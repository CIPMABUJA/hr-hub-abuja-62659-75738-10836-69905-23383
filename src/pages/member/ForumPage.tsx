import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MessageSquare, Eye, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export default function ForumPage() {
  const [forumPosts, setForumPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchForumPosts();
  }, []);

  const fetchForumPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*, profiles(first_name, last_name), forum_comments(count)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching forum posts:', error);
    } else {
      setForumPosts(data || []);
    }
    setIsLoading(false);
  };

  const filteredPosts = forumPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularPosts = filteredPosts.filter(post => post.views > 100);

  const getInitials = (firstName: string = '', lastName: string = '') => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4 mt-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <p className="text-muted-foreground">No discussions found.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {getInitials(post.profiles?.first_name, post.profiles?.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-1">
                                  {post.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  by {post.profiles?.first_name} {post.profiles?.last_name} • 
                                  {format(new Date(post.created_at), ' MMM dd, yyyy')}
                                </p>
                              </div>
                              {post.views > 100 && (
                                <Badge variant="secondary" className="ml-2">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            {post.category && <Badge variant="outline" className="mb-3">{post.category}</Badge>}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {post.forum_comments?.[0]?.count || 0} replies
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {post.views || 0} views
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="popular" className="space-y-4 mt-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : popularPosts.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <p className="text-muted-foreground">No popular discussions yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  popularPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {getInitials(post.profiles?.first_name, post.profiles?.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-1">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              by {post.profiles?.first_name} {post.profiles?.last_name} • 
                              {format(new Date(post.created_at), ' MMM dd, yyyy')}
                            </p>
                            {post.category && <Badge variant="outline" className="mb-3">{post.category}</Badge>}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {post.forum_comments?.[0]?.count || 0} replies
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {post.views || 0} views
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Forum Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Discussions</p>
                  <p className="text-2xl font-bold">{forumPosts.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Popular Posts</p>
                  <p className="text-2xl font-bold">{popularPosts.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
