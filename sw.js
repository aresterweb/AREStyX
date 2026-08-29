/* AREStyx offline service worker */
"use strict";

const CACHE = "arestyx-static-v5-20260829";
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
    "./assets/favicon-64.png",
    "./assets/arester-group-official.png",
    "./assets/dana-business-qris.jpg",
    "./tools/tools.html",
    "./tools/tools.css",
    "./tools/tools-extra.js",
    "./tools/tools.js"
];

self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    const request = event.request;
    if (request.method !== "GET") return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const copy = response.clone();
                    caches.open(CACHE).then(cache => cache.put(request, copy));
                    return response;
                })
                .catch(async () => {
                    const cached = await caches.match(request, { ignoreSearch: true });
                    return cached || caches.match("./index.html");
                })
        );
        return;
    }

    event.respondWith(
        caches.match(request, { ignoreSearch: false }).then(cached => {
            if (cached) return cached;
            return fetch(request).then(response => {
                if (response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE).then(cache => cache.put(request, copy));
                }
                return response;
            });
        })
    );
});
