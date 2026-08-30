/* AREStyx offline service worker */
"use strict";

const CACHE = "arestyx-static-v6-20260830";

const APP_SHELL = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./pwa.js",
    "./manifest.webmanifest",
    "./assets/tools-data.js",
    "./assets/arestyx-logo-192.png",
    "./assets/arestyx-logo-512.png",
    "./assets/arestyx-maskable-512.png",
    "./favicon.png",
    "./assets/arester-group-official.png",
    "./assets/dana-business-qris.jpg",
    "./tools/tools.html",
    "./tools/tools.css",
    "./tools/tools-extra.js",
    "./tools/tools.js"
];

function isCodeAsset(request, url) {
    return (
        request.mode === "navigate" ||
        ["document", "script", "style", "worker"].includes(request.destination) ||
        /\.(?:html|css|js|json|webmanifest)$/i.test(url.pathname)
    );
}

async function saveToCache(request, response) {
    if (!response || !response.ok) return;

    const cache = await caches.open(CACHE);
    await cache.put(request, response.clone());
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        await saveToCache(request, response);
        return response;
    } catch (error) {
        const cached = await caches.match(request, {
            ignoreSearch: request.mode === "navigate"
        });

        if (cached) return cached;

        if (request.mode === "navigate") {
            const fallback = await caches.match("./index.html");
            if (fallback) return fallback;
        }

        throw error;
    }
}

async function cacheFirst(request) {
    const cached = await caches.match(request, { ignoreSearch: false });
    if (cached) return cached;

    const response = await fetch(request);
    await saveToCache(request, response);
    return response;
}

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(APP_SHELL))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key.startsWith("arestyx-") && key !== CACHE)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    if (isCodeAsset(request, url)) {
        event.respondWith(networkFirst(request));
        return;
    }

    event.respondWith(cacheFirst(request));
});
