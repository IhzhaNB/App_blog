import { getBlog } from "@/api/blogApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Article from "./Article";

export default function Blog() {
  const { id } = useParams();
  const query = useQuery({ queryKey: ["blog", id], queryFn: getBlog });

  return (
    <section className="container p-3">
      {query.isLoading ? "Loading..." : <Article {...query.data?.blog!} />}
    </section>
  );
}
