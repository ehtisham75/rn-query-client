import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const response = await fetch('https://dummyjson.com/products');

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });
};