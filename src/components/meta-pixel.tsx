"use client";

import Script from "next/script";

export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!pixelId) return null;

  const safePixelId = JSON.stringify(pixelId);

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        (function(){
          var loaded = false;
          function loadPixel(){
            if (loaded || navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;
            loaded = true;
            (function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
              s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
            })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${safePixelId});
            fbq('track', 'PageView');
          }

          try {
            if (localStorage.getItem('dyzzi-analytics-consent') === 'granted') loadPixel();
          } catch (_) {}

          window.addEventListener('dyzzi:analytics-consent', function(event){
            if (event.detail === 'granted') loadPixel();
          });
        })();
      `}
    </Script>
  );
}
