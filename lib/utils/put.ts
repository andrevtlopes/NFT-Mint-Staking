export default async function put(url: string, body: any) {
    let params: RequestInit = {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(body),
    };

    const response = await fetch(url, params);
    const data = await response.json();

    return data;
}
