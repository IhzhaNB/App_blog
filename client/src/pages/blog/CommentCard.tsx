import { deleteComment, editComment } from "@/api/commentApi";
import noProfileImage from "@/assets/noProfile.jpg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Comment } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props extends Comment {
  isOwnComment: boolean;
  handleDeleteState: (commentId: string) => void;
  handleUpdateState: (commentId: string, updatedCommentText: string) => void;
}

export default function CommentCard(comment: Props) {
  const { toast } = useToast();
  const [commentText, setCommentText] = React.useState(comment.comment);
  const [isEditAble, setIsEditAble] = React.useState(false);

  const mutationDeleteComment = useMutation({
    mutationFn: deleteComment,
    onSuccess(e) {
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

  const mutationEditComment = useMutation({
    mutationFn: editComment,
    onSuccess(e) {
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

  const handleDeleteComment = () => {
    comment.handleDeleteState(comment.id);
    mutationDeleteComment.mutate({ commentId: comment.id });
  };

  const handleEditComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    comment.handleUpdateState(comment.id, commentText);
    setIsEditAble(false);
    mutationEditComment.mutate({ commentId: comment.id, comment: commentText });
  };

  return (
    <div className="flex my-8 gap-3">
      <img
        src={noProfileImage}
        alt={comment.author?.username}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <p className="font-bold">{comment.author?.username}</p>
        {isEditAble ? (
          <form onSubmit={handleEditComment}>
            <Textarea
              placeholder="Type your comment"
              id="message"
              className="min-h-28"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button type="submit" className="mt-3 block ml-auto">
              {mutationEditComment.isPending ? "Loading..." : "Comment"}
            </Button>
          </form>
        ) : (
          <p className="font-light">{comment.comment}</p>
        )}
      </div>
      {comment.isOwnComment ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"sm"} className="rounded-full">
              <BsThreeDotsVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsEditAble(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteComment}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
}
