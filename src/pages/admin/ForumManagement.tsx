import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Eye, Trash2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ForumManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForumData();
  }, []);

  const fetchForumData = async () => {
    const { data: postsData, error: postsError } = await supabase
      .from("forum_posts")
      .select(`
        *,
        profiles:user_id (first_name, last_name)
      `)
      .order("created_at", { ascending: false });

    const { data: commentsData, error: commentsError } = await supabase
      .from("forum_comments")
      .select(`
        *,
        profiles:user_id (first_name, last_name),
        forum_posts!inner(title)
      `)
      .order("created_at", { ascending: false });

    if (postsError || commentsError) {
      toast.error("Failed to fetch forum data");
      return;
    }

    setPosts(postsData || []);
    setComments(commentsData || []);
    setLoading(false);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post? This will also delete all comments.")) return;

    const { error } = await supabase
      .from("forum_posts")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete post");
      return;
    }

    toast.success("Post deleted successfully");
    fetchForumData();
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    const { error } = await supabase
      .from("forum_comments")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete comment");
      return;
    }

    toast.success("Comment deleted successfully");
    fetchForumData();
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Forum Management</h1>
          <p className="text-muted-foreground">Moderate forum posts and comments</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.filter(p => 
                  new Date(p.created_at).toDateString() === new Date().toDateString()
                ).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forum Posts</CardTitle>
            <CardDescription>All posts from members</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No posts yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>
                        {post.profiles?.first_name} {post.profiles?.last_name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{post.category || "General"}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(post.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Comments</CardTitle>
            <CardDescription>Latest comments from forum discussions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No comments yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Post</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comments.slice(0, 10).map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell className="font-medium">
                        {comment.forum_posts?.title}
                      </TableCell>
                      <TableCell>
                        {comment.profiles?.first_name} {comment.profiles?.last_name}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {comment.content}
                      </TableCell>
                      <TableCell>
                        {new Date(comment.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
