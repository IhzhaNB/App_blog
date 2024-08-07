import noProfileImage from "@/assets/noProfile.jpg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/context/authContext";
import { Blog, Comment } from "@/types";
import { Link } from "react-router-dom";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "@/api/commentApi";
import CommentCard from "./CommentCard";

interface Props {
  currentBlog: Blog;
  comments: Comment[];
}

export default function Comments(props: Props) {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const [commentText, setCommentText] = React.useState("");
  const { toast } = useToast();

  const mutationPostComment = useMutation({
    mutationFn: postComment,
    onSuccess(e) {
      setCommentText("");
      queryClient.invalidateQueries({
        queryKey: ["blog", props.currentBlog.id],
      });
      toast({
        title: "Success",
        description: e.message,
      });
    },
    onError(e) {
      toast({
        title: "Failed",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const handlePostComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutationPostComment.mutate({ commentText, blogId: props.currentBlog.id });
  };

  // Urutan komentar terbaru
  const sortedComments = [...props.comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <div className="mt-10 max-w-3xl mx-auto">
        <div className="border-y border-black py-5">
          <h3 className="text-2xl font-bold">
            Comment ({props.comments.length})
          </h3>
          {user ? (
            <div className="flex mt-3 gap-3 items-start">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={noProfileImage}
                  alt={user?.username}
                  className="w-14 h-14 rounded-full"
                />
                <p className="font-bold">{user?.username}</p>
              </div>

              <form className="flex-1" onSubmit={handlePostComment}>
                <Label htmlFor="message">Your Comment</Label>
                <Textarea
                  placeholder="Type your comment"
                  id="message"
                  className="min-h-28"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button type="submit" className="mt-3 block ml-auto">
                  {mutationPostComment.isPending ? "Loading..." : "Comment"}
                </Button>
              </form>
            </div>
          ) : (
            <h4 className="text-center text-lg my-3">
              You Need Login for Comment this Blog.{" "}
              <Link to="/signin" className="underline text-blue-500">
                Login
              </Link>
            </h4>
          )}
        </div>
        {sortedComments.map((comment) => (
          <CommentCard
            key={comment.id}
            {...comment}
            isOwnComment={user?.id === comment.author.id}
            blogId={props.currentBlog.id}
          />
        ))}
      </div>
    </>
  );
}
