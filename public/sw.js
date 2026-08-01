const CACHE="count-v1";

const FILES=[
"/",
"/index.html",
"/login.html",
"/signup.html",
"/css/style.css"
];

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(CACHE).then(c=>c.addAll(FILES))

);

});

self.addEventListener("fetch",e=>{

e.respondWith(

caches.match(e.request).then(r=>r||fetch(e.request))

);

});
