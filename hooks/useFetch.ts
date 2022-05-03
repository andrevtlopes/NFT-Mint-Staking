import useSWR from 'swr';

export function useFetch(url: string, init?: RequestInit, revalidateOnFocus: boolean = false) {
    const { data, error } = useSWR(url, async (url) => {
      const response = await fetch(url, init);
      const data = await response.json();
  
      return data;
    }, { revalidateOnFocus });
  
    return { data, error };
}
