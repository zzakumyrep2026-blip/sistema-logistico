const CACHE_NAME = "sistema-logistica-v1";

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            await self.clients.claim();
        })()
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    // No guardar respuestas de Supabase en caché.
    if (url.hostname.includes("supabase.co")) {
        return;
    }

    // Dejar que el navegador gestione las demás solicitudes.
});