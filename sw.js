const CACHE_NAME='meu-croche-v7-6-7-mobile-v2-20260820-01';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>null)))));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put('./index.html',copy)).catch(()=>{});return r;}).catch(()=>caches.match('./index.html')));
  return;
 }
 const u=new URL(e.request.url);
 if(u.origin===self.location.origin)e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});