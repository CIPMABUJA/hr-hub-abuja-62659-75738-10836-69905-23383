import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MessageSquare, Eye, Loader2, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function ForumPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPostAndComments();
      incrementViews();
    }
  }, [id]);

  const fetchPostAndComments = async () => {
    setIsLoading(true);

    // Fetch post with user profile
    const { data: postData } = await supabase
      .from('forum_posts')
      .select('*, profiles(*)')
      .eq('id', id)
      .single();

    // Fetch comments with user profiles
    const { data: commentsData } = await supabase
      .from('forum_comments')
      .select('*, profiles(*)')
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    setPost(postData);
    setComments(commentsData || []);
    setIsLoading(false);
  };

  const incrementViews = async () => {
    if (!id) return;
    
    const { data: currentPost } = await supabase
      .from('forum_posts')
      .select('views')
      .eq('id', id)
      .single();

    if (currentPost) {
      await supabase
        .from('forum_posts')
        .update({ views: (currentPost.views || 0) + 1 })
        .eq('id', id);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from('forum_comments')
      .insert({
        post_id: id,
        user_id: user.id,
        content: newComment.trim(),
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Comment posted successfully",
      });
      setNewComment("");
      fetchPostAndComments();
    }

    setIsSubmitting(false);
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!post) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-muted-foreground">Post not found</p>
            <Button onClick={() => navigate('/member/forum')} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forum
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/member/forum')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Button>

        {/* Post Content */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {getInitials(post.profiles?.first_name, post.profiles?.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">
                      {post.profiles?.first_name} {post.profiles?.last_name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(post.created_at), 'MMM dd, yyyy')}
                    </span>
                    {post.category && (
                      <Badge variant="secondary">{post.category}</Badge>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                  <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
                  
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views || 0} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{comments.length} replies</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">
              {comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}
            </h2>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4 pb-6 border-b last:border-b-0">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {getInitials(comment.profiles?.first_name, comment.profiles?.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">
                        {comment.profiles?.first_name} {comment.profiles?.last_name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.created_at), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <form onSubmit={handleSubmitComment} className="mt-6 space-y-4">
              <Textarea
                placeholder="Write your reply..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                required
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Post Reply
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}