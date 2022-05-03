import { useFetch } from './useFetch';

export function usePut(
    url: string,
    body: any,
    revalidateOnFocus: boolean = false
) {
    let params: RequestInit = {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(body)
    };

    return useFetch(url, params, revalidateOnFocus);
}
