export default function manifest() {
    return {
        name: 'Mi aplicación PWA',
        short_name: 'PWA app',
        description: 'Aplicación PWA construida con Next.js',
        start_url: '/',
        display: 'standalone',
        background_color: '#F03E7C',
        theme_color: '#F9FAFB',
        icons: [
           { 
            src: '/jefe.png',
            sizes: '192x192',
            type: 'image/png',
           },
           {
            src: '/jefe.png',
            sizes: '512x512',
            type: 'image/png',
           },
        ],
    };
}