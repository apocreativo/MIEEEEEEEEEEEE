export default async function handler(req){
  if (req.method !== "POST") return new Response("Method Not Allowed",{status:405});
  const { key } = await req.json();
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, { headers: { Authorization:`Bearer ${token}` } });
  if(!res.ok) return new Response(await res.text(), { status: res.status });
  const j = await res.json();
  return new Response(JSON.stringify({ value: j?.result ?? null }), { status: 200, headers: { 'content-type':'application/json' } });
}