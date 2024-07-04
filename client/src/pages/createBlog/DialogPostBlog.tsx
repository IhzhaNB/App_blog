import { BlogBody, postBlog, uploadBanner } from "@/api/blogApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { useMutation } from "@tanstack/react-query";
import { Editor } from "@tiptap/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  editor: Editor;
}

export default function DialogPostBlog({ editor }: Props) {
  const [title, setTitle] = React.useState("");
  const [banner, setBanner] = React.useState("");
  const navigate = useNavigate();

  const { toast } = useToast();

  const mutationUploadBanner = useMutation({
    mutationFn: uploadBanner,
    onSuccess: (e) => {
      setBanner(e.data.url);
      toast({
        title: "Success",
        description: e.message,
      });
    },
    onError: (e) => {
      toast({
        title: "Failed",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const mutationPostBlog = useMutation({
    mutationFn: postBlog,
    onSuccess: (e) => {
      console.log(e);

      toast({
        title: "Success",
        description: e.message,
      });
      navigate("/");
    },
    onError: (e) => {
      toast({
        title: "Failed",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const handlePostBlog: React.MouseEventHandler<HTMLButtonElement> = () => {
    const blogData: BlogBody = {
      article: JSON.stringify(editor.getJSON()),
      banner,
      title,
    };

    mutationPostBlog.mutate(blogData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">Upload Blog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Blogs</DialogTitle>
          <DialogDescription>
            Masukan Informasi sesuai Blog kamu.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            placeholder="Title Blog"
            type="text"
            className="mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Banner Blog"
            type="file"
            onChange={(e) => mutationUploadBanner.mutate(e.target.files)}
          />
          <p className="text-slate-500 text-sm">
            Make sure: Type file is image and size under 5mb
          </p>
        </div>
        <DialogFooter>
          <Button className="mt-3" onClick={handlePostBlog}>
            {mutationPostBlog.isPending ? "Loading..." : "Post Blog"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
