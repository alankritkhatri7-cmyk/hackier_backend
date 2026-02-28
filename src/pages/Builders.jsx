import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, Users, Shield } from 'lucide-react';
import FAQ from '../components/FAQ';

const Builders = () => {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-brand-500/30 selection:text-brand-200">
      
      {/* Hero Section - Short & Crisp */}
      <div className="relative isolate overflow-hidden pt-14 pb-16 sm:pb-20 bg-slate-900">
        <img
          src="/bg.png"
          alt=""
          className="absolute inset-x-0 -top-80 -z-20 h-full w-full object-cover object-bottom opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 sm:pt-24 text-center">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30 mb-6 bg-blue-900/10 backdrop-blur-sm">
                For Indie Hackers & Builders
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6 drop-shadow-xl">
              Turn your side project into<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Recurring Revenue</span>
            </h1>
            
            <p className="mt-4 text-lg leading-8 text-slate-300 max-w-2xl mx-auto drop-shadow-md">
              List your tool on Hackier. We bundle it for funded startups. 
              You get distribution, feedback, and monthly payouts.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/apply"
                className="w-full sm:w-auto rounded-[14px] px-8 py-3.5 text-base font-bold text-slate-900 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 block text-center"
              >
                Submit Your Tool
              </Link>
              <a href="#faq" className="w-full sm:w-auto text-sm font-semibold leading-6 text-slate-400 hover:text-white transition-colors flex items-center justify-center">
                How it works <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
        </div>
      </div>

      {/* Value Props - Minimal Grid */}
      <div className="py-16 sm:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                  {
                      title: "Zero Marketing Effort",
                      desc: "Stop shouting into the void. We put your product directly in front of paying startup teams.",
                      icon: <Users className="w-6 h-6 text-blue-400" />
                  },
                  {
                      title: "Revenue Share",
                      desc: "Earn 90% of the revenue pool based on usage. A new stream of passive income.",
                      icon: <Zap className="w-6 h-6 text-yellow-400" />
                  },
                  {
                      title: "Keep Full Control",
                      desc: "No exclusivity. No price changes required. You keep selling on your own site too.",
                      icon: <Shield className="w-6 h-6 text-emerald-400" />
                  }
              ].map((item, i) => (
                  <div key={i} className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                      <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 shadow-inner border border-slate-700/50">
                          {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-sm">
                          {item.desc}
                      </p>
                  </div>
              ))}
           </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white text-center mb-10">Common Questions</h2>
            <FAQ />
            
            <div className="mt-16 text-center">
                 <p className="text-slate-400 mb-6">Ready to get more users?</p>
                 <Link
                    to="/apply"
                    className="inline-flex items-center justify-center rounded-[12px] bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 transition-colors border border-slate-700"
                  >
                    Apply Now
                </Link>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Builders;
