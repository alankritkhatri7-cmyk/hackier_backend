import React, { useEffect } from 'react';

const Apply = () => {
    useEffect(() => {
        // Tally embed script logic
        const scriptSrc = "https://tally.so/widgets/embed.js";
        const loadEmbeds = () => {
          if (typeof window.Tally !== 'undefined') {
            window.Tally.loadEmbeds();
          } else {
            document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
              e.src = e.dataset.tallySrc;
            });
          }
        };
    
        if (typeof window.Tally !== 'undefined') {
          loadEmbeds();
        } else if (document.querySelector(`script[src="${scriptSrc}"]`) === null) {
          const script = document.createElement("script");
          script.src = scriptSrc;
          script.onload = loadEmbeds;
          script.onerror = loadEmbeds;
          document.body.appendChild(script);
        }
    }, []);

  return (
    <div className="bg-slate-950 min-h-screen py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Partner with Hackier
          </h2>
          <p className="mt-4 text-lg leading-6 text-slate-400">
            Join the bundle and reach thousands of startup customers instantly.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200">
          <iframe 
            data-tally-src="https://tally.so/embed/MeAdOY?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
            loading="lazy" 
            width="100%" 
            height="972" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0" 
            title="List your SaaS app on Hackier"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Apply;
