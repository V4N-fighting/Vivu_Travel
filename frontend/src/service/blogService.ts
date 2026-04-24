import { GET_BLOG } from "../api";
import { useFetch } from "../Hooks/useFetch";

export interface BlogItem {
    id: number;
    title: string;
    thumbnail: string;
    content: string;
    published_at: string;
    author_name: string;
    category: string;
    slug: string;
}

export const useBlogs = () => {
    const { data, loading, error } = useFetch<BlogItem[]>(GET_BLOG);
    return {
        blogs: data,
        isLoading: loading,
        isError: error
    };
};
