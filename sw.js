const CACHE_NAME = 'zhinovax-v6';
const ASSETS = [
  './index.html',
  './src/styles/global.css',
  './src/App.jsx',
  './src/lib/supabase.js',
  './src/pages/Home.jsx',
  './src/pages/Detail.jsx',
  './src/pages/Settings.jsx',
  './src/pages/Challenges.jsx',
  './src/pages/About.jsx',
  './src/pages/ComingSoon.jsx',
  './src/pages/Auth.jsx',
  './src/pages/Favorites.jsx',
  './src/pages/Portfolio.jsx',
  './src/components/ui/CheckoutModal.jsx',
  './src/components/ui/AddAssetModal.jsx',
  './src/components/layout/Navbar.jsx',
  './src/components/ui/AssetCard.jsx',
  './src/components/ui/SplashScreen.jsx'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
