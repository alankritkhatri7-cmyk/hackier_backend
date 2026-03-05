import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, Users, Shield, Terminal, Code2 } from 'lucide-react';
import FAQ from '../components/FAQ';

const Builders = () => {
  return (
    <div className="bg-black min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200 font-sans text-white">
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-[500px] h-[500px] bg-slate-800/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 sm:pt-24 text-center relative z-10">
            <h1 className="text-5xl font-medium tracking-tight text-white sm:text-7xl mb-8">
              Monetize your software
            </h1>
            
            <p className="mt-6 text-xl leading-8 text-slate-400 max-w-2xl mx-auto">
              Turn your side project into a business with 6 lines of code.
              <br className="hidden sm:block" />
              We handle billing, distribution, and marketing.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/apply"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-sm hover:bg-slate-200 transition-all"
              >
                Get Started
              </Link>
              <Link to="/docs" className="rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-slate-700 hover:bg-slate-800 transition-all">
                Read the Docs
              </Link>
            </div>
        </div>
      </div>

       {/* Logo Strip */}
       <div className="py-12 border-b border-white/5 bg-slate-950/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p className="text-sm font-medium text-slate-500 mb-8">Powering monetization for top indie tools</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholders for logos matching the style of Screenshot 1 */}
                {['Tailwindcss', 'Speakeasy', 'Stilla', 'Midday'].map((name) => (
                    <div key={name} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                        <span className="text-lg font-bold text-white">{name}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Testimonials / Social Proof Section (Matching Screenshot 1) */}
      <div className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card 1 */}
                <div className="bg-slate-900/40 rounded-3xl p-10 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                     <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                         <Terminal size={120} />
                     </div>
                     <div className="relative z-10">
                        <div className="mb-8">
                             <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-lg mb-6">
                                 <Zap size={24} fill="black" />
                             </div>
                             <p className="text-lg text-slate-300 leading-relaxed font-medium">
                                "Hackier's distribution network made our first $1k MRR happen in days, not months. 
                                It gave us production-ready billing and a user base instantly."
                             </p>
                             <p className="mt-6 text-slate-400">
                                "It's rare to find a platform that moves this fast."
                             </p>
                        </div>
                        <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                             <div className="h-10 w-10 rounded-full bg-slate-700"></div>
                             <div>
                                 <div className="text-white font-medium">Alex Chen</div>
                                 <div className="text-slate-500 text-sm">Founder, DevTools UI</div>
                             </div>
                        </div>
                     </div>
                </div>

                {/* Card 2 */}
                 <div className="bg-slate-900/40 rounded-3xl p-10 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                     <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                         <Code2 size={120} />
                     </div>
                     <div className="relative z-10">
                        <div className="mb-8">
                             <div className="w-12 h-12 bg-indigo-500 flex items-center justify-center rounded-full mb-6">
                                 <img src="https://github.com/shadcn.png" className="w-full h-full rounded-full" alt="" />
                             </div>
                             <p className="text-lg text-slate-300 leading-relaxed font-medium">
                                "Hackier was a turning point for TypeScale. I went from dreading marketing to having everything live in a weekend."
                             </p>
                             <p className="mt-6 text-slate-400">
                                "The integration was seamless."
                             </p>
                        </div>
                        <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                             <div className="h-10 w-10 rounded-full bg-slate-700"></div>
                             <div>
                                 <div className="text-white font-medium">Sarah Jenkins</div>
                                 <div className="text-slate-500 text-sm">Creator, TypeScale</div>
                             </div>
                        </div>
                     </div>
                </div>
           </div>
        </div>
      </div>

      {/* Value Props Grid (Matching Screenshot 2 - Feature Cards) */}
      <div className="py-24 bg-black border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        title: "Payments, Usage & Billing",
                        desc: "Create digital products and SaaS billing with flexible pricing models and seamless payment processing.",
                        icon: <Zap className="w-5 h-5" />,
                        tags: ["Subscriptions", "Usage Billing", "Benefits", "Checkout Links"]
                    },
                    {
                         title: "Customer Management",
                         desc: "Streamlined customer lifecycle management with detailed profiles and analytics.",
                         icon: <Users className="w-5 h-5" />,
                         tags: [],
                         isProfile: true // Flag to render profile UI mock
                    },
                    {
                         title: "Global Merchant of Record",
                         desc: "Focus on your passion while we handle all headaches & tax compliance.",
                         icon: <Shield className="w-5 h-5" />,
                         tags: ["Tax Report 2025", "VAT (EU)", "Sales Tax (US)"]
                    }
                ].map((item, i) => (
                    <div key={i} className="bg-slate-900/30 rounded-3xl p-8 border border-white/5 hover:bg-slate-900/50 transition-colors flex flex-col h-full">
                        <h3 className="text-2xl font-medium text-white mb-4">{item.title}</h3>
                        <p className="text-slate-400 text-sm mb-8 flex-1">{item.desc}</p>
                        
                        <div className="mt-auto">
                            {item.tags.length > 0 && !item.isProfile ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {item.tags.map((tag) => (
                                        <div key={tag} className="bg-slate-800/50 rounded-lg px-3 py-2 text-xs text-slate-300 border border-white/5 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            ) : item.isProfile ? (
                                <div className="bg-slate-800/30 rounded-xl p-4 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700"></div>
                                        <div>
                                            <div className="text-white text-sm font-medium">John Doe</div>
                                            <div className="text-slate-500 text-xs">Premium Plan • Monthly</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                        <div className="h-full w-2/3 bg-indigo-500"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                     {item.tags.map(tag => (
                                         <div key={tag} className="flex justify-between items-center text-xs text-slate-400 py-1 border-b border-white/5 last:border-0">
                                             <span>{tag}</span>
                                             <span className="text-emerald-400">Submitted</span>
                                         </div>
                                     ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

    <div className="py-24 bg-black border-t border-white/5">
         <FAQ />
    </div>

    </div>
  );
}

export default Builders;
