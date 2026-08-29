/* AREStyx PWA registration */
"use strict";

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
        const fromTools = /\/tools\//.test(location.pathname);
        const workerUrl = new URL(fromTools ? "../sw.js" : "sw.js", location.href);
        navigator.serviceWorker.register(workerUrl.href).catch(error => {
            console.warn("AREStyx service worker registration skipped:", error);
        });
    });
}
