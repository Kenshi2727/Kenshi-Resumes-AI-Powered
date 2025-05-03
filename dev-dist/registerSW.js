if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const isLocalhost = Boolean(
            window.location.hostname === 'localhost' ||
            window.location.hostname === '[::1]' ||
            window.location.hostname.match(/^127\./)
        );

        const swUrl = isLocalhost
            ? '/dev-sw.js?dev-sw'
            : '/service-worker.js';

        navigator.serviceWorker
            .register(swUrl)
            .then(registration => {
                console.log('ServiceWorker registration successful:', registration);
            })
            .catch(error => {
                console.error('ServiceWorker registration failed:', error);
            });
    });
}
