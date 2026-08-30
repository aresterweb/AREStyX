/* AREStyx PWA registration */
"use strict";

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", async () => {
        const fromTools = /\/tools\//.test(location.pathname);
        const workerUrl = new URL(fromTools ? "../sw.js" : "sw.js", location.href);

        try {
            const registration = await navigator.serviceWorker.register(
                workerUrl.href,
                { updateViaCache: "none" }
            );

            await registration.update();
        } catch (error) {
            console.warn(
                "AREStyx service worker registration skipped:",
                error
            );
        }
    });
}
