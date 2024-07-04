import { getAllBlogs } from "@/api/blogApi";
import { useQuery } from "@tanstack/react-query";
import Cards from "./Cards";

export default function Home() {
  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  return (
    <section className="container p-3">
      {query.isLoading ? (
        "Loading..."
      ) : (
        <Cards blogs={query.data?.data.blogs!} />
      )}
    </section>
  );
}
