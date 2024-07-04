import { Blog } from "@/types";
import Card from "./Card";

interface Props {
  blogs: Blog[];
}

export default function Cards(props: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {props.blogs.map((blog) => (
        <Card key={blog.id} {...blog} />
      ))}
    </div>
  );
}
