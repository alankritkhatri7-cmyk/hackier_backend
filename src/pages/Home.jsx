import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Users, MousePointer2, PieChart, CreditCard, Download, ArrowRight, Check } from 'lucide-react';
import { tools } from '../data/tools';
// Determine if FAQ component exists or was hallucinated. Assuming it exists based on import in original file.
import FAQ from '../components/FAQ';

const Home = () => {
    return (
        <div className="bg-slate-950 min-h-screen selection:bg-brand-500/30 selection:text-brand-200">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden pt-14 pb-16 sm:pb-24 lg:pb-32 bg-slate-900">
                <img
                    src="/bg.png"
                    alt=""
                    className="absolute inset-x-0 -top-20 -z-20 w-full object-cover object-bottom opacity-50"
                />
                
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32 relative z-10">
                    <div className="max-w-3xl text-left">
                        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl mb-8 drop-shadow-lg shadow-black/50">
                            Stop paying enterprise prices for your daily apps
                        </h1>
                        
                        <p className="mt-6 text-xl leading-8 text-white max-w-2xl font-medium drop-shadow-md shadow-black/50">
                            Replace your $5000/mo SaaS stack with one simple $100 subscription. 
                            <br/>
                            Get access to premium indie tools for project management, marketing, design, and more.
                        </p>
                        
                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-start gap-6">
                             <Link to="/apply" className="rounded-[16px] bg-white px-8 py-3.5 text-lg font-bold text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all">
                                Get Started
                             </Link>
                             <Link to="/store" className="rounded-[16px] border border-slate-700 bg-slate-900/50 px-8 py-3.5 text-lg font-bold text-white shadow-lg hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center gap-2">
                                Included Apps
                             </Link>
                         
                        </div>
                    </div>

                    {/* Hero Abstract UI */}
                    <div className="mt-20 sm:mt-32 relative perspective-1000">
                         <div className="relative mx-auto max-w-5xl rounded-[24px] bg-slate-900 border border-slate-800 p-2 shadow-[20px_20px_60px_rgba(0,0,0,0.5),-5px_-5px_20px_rgba(255,255,255,0.02)] transform rotate-x-12">
                                 <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                 
                                 <div className="bg-slate-950/80 rounded-[20px] overflow-hidden p-6 grid grid-cols-2 md:grid-cols-5 gap-6">
                                        {tools.slice(0, 10).map((tool) => (
                                                <div key={tool.id} className="h-32 bg-slate-900 rounded-xl border border-slate-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-1px_-1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center group overflow-hidden relative" title={tool.name}>
                                                         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                         <div className="h-16 w-16 rounded-xl bg-white p-2 shadow-[5px_5px_10px_rgba(0,0,0,0.3),-2px_-2px_5px_rgba(255,255,255,0.03)] flex items-center justify-center overflow-hidden">
                                                                <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                                                         </div>
                                                </div>
                                        ))}
                                 </div>
                         </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-slate-950 py-4 sm:py-32 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-sm font-bold leading-7 text-white uppercase tracking-widest mb-3 opacity-70">How it Works</h2>
                        <p className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl drop-shadow-lg">
                            The "Spotify" Model for SaaS
                        </p>
                        <p className="mt-6 text-lg text-slate-400">
                            We've simplified software procurement. One subscription, unlimited access.
                        </p>
                    </div>

                    {/* Three Steps Grid */}
                    <div className="mx-auto max-w-5xl mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                            {/* Connecting Line (Only visible on MD+) */}
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent z-0" />

                            {[
                                {
                                    icon: <MousePointer2 className="w-8 h-8 text-white" />,
                                    title: "1. Browse Store",
                                    desc: "Explore a curated collection of premium tools for marketing, design, and dev."
                                },
                                {
                                    icon: <CreditCard className="w-8 h-8 text-white" />,
                                    title: "2. Subscribe Once",
                                    desc: "Pay one flat monthly fee. No per-seat pricing or hidden upsells."
                                },
                                {
                                    icon: <Download className="w-8 h-8 text-white" />,
                                    title: "3. Unlimited Access",
                                    desc: "Use any tool in the bundle. We handle the licensing and payouts."
                                }
                            ].map((step, idx) => (
                                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                    <div className="h-24 w-24 bg-slate-900 rounded-full border border-slate-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-slate-400 leading-relaxed px-4">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue Flow Chart / Infographic */}
                    <div className="mx-auto max-w-4xl bg-slate-900 rounded-[40px] border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-500 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold text-white mb-4">Fair Revenue Share Model</h3>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                We believe in supporting indie hackers. That's why we share 90% of our revenue directly with the creators of the tools you use.
                            </p>
                        </div>

                        {/* Flow Diagram */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4 relative">
                            {/* Step A: Subscriber */}
                            <div className="flex-1 bg-slate-950 rounded-2xl p-6 border border-slate-800 w-full text-center relative z-10 group hover:-translate-y-1 transition-transform">
                                <div className="flex justify-center mb-4">
                                    <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                                        <Users className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="font-bold text-white text-lg">Subscribers</div>
                                <div className="text-sm text-slate-500 mt-1">Pay Monthly Fee</div>
                                <div className="mt-4 font-mono text-xl text-white bg-slate-900 rounded-lg py-1 px-3 inline-block border border-slate-800">$100</div>
                            </div>

                            {/* Arrow 1 */}
                            <div className="hidden md:flex flex-col items-center justify-center w-20 text-slate-600">
                                <div className="h-0.5 w-full bg-slate-700 relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -mt-[3px] w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45 transform"></div>
                                </div>
                            </div>
                            <div className="md:hidden h-10 w-0.5 bg-slate-700 relative">
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -ml-[3px] w-2 h-2 border-b-2 border-r-2 border-slate-700 rotate-45 transform"></div>
                            </div>


                            {/* Step B: Hackier Platform */}
                            <div className="flex-1 bg-slate-950 rounded-2xl p-6 border border-slate-700 shadow-[0_0_30px_rgba(59,130,246,0.1)] w-full text-center relative z-10 scale-105">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-xs font-bold px-3 py-1 rounded-full text-white border border-slate-600">
                                    POOL
                                </div>
                                <div className="flex justify-center mb-4">
                                    <div className="h-12 w-12 bg-white text-slate-950 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg">
                                        H
                                    </div>
                                </div>
                                <div className="font-bold text-white text-lg">Hackier Platform</div>
                                <div className="text-sm text-slate-500 mt-1">Aggregates Revenue</div>
                            </div>

                            {/* Arrow 2 (Split) */}
                            <div className="hidden md:flex flex-col items-center justify-center w-20 text-slate-600">
                                <div className="h-0.5 w-full bg-slate-700 relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -mt-[3px] w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45 transform"></div>
                                </div>
                            </div>
                            <div className="md:hidden h-10 w-0.5 bg-slate-700 relative">
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -ml-[3px] w-2 h-2 border-b-2 border-r-2 border-slate-700 rotate-45 transform"></div>
                            </div>

                            {/* Step C: Builders */}
                            <div className="flex-1 bg-gradient-to-br from-indigo-900/50 to-slate-900 rounded-2xl p-6 border border-indigo-500/30 w-full text-center relative z-10 group hover:-translate-y-1 transition-transform">
                                <div className="flex justify-center mb-4">
                                    <div className="h-12 w-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-300">
                                        <PieChart className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="font-bold text-white text-lg">Indie Builders</div>
                                <div className="text-sm text-indigo-200 mt-1">Receive 90% Share</div>
                                <div className="mt-4 text-xs text-slate-400 bg-slate-950/50 rounded p-2">
                                    Paid based on app usage & downloads
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-slate-950 py-4 sm:py-32 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center mb-16">
                        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl drop-shadow-lg">Transparent Pricing</h2>
                        <p className="mt-6 text-lg leading-8 text-slate-400">
                            No hidden fees. Just one simple subscription.
                        </p>
                    </div>
                    
                    <div className="mx-auto max-w-4xl bg-slate-900 rounded-[40px] shadow-[20px_20px_60px_rgba(0,0,0,0.6),-10px_-10px_30px_rgba(255,255,255,0.02)] lg:flex overflow-hidden border border-slate-800/50">
                        <div className="p-10 sm:p-12 lg:flex-auto">
                            <h3 className="text-2xl font-bold tracking-tight text-white">Membership</h3>
                            <p className="mt-4 text-base leading-7 text-slate-400">
                                Get full access to our growing library of tools. Perfect for early-stage startups and bootstrap teams.
                            </p>
                            
                            <div className="mt-10 flex items-center gap-x-4">
                                <h4 className="flex-none text-sm font-semibold leading-6 text-white uppercase tracking-widest opacity-70">What's included</h4>
                                <div className="h-px flex-auto bg-slate-800" />
                            </div>
                            
                            <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-slate-300 sm:grid-cols-2 sm:gap-6">
                                {[
                                    'Unlimited access to all apps',
                                    'Priority support',
                                    'New apps added monthly',
                                    'Cancel anytime',
                                    'Direct contact with founders',
                                    'Exclusive builder community'
                                ].map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <Check className="h-6 w-5 flex-none text-brand-400" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                            <div className="rounded-2xl bg-slate-950/50 py-10 text-center ring-1 ring-inset ring-slate-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full border-l border-slate-800">
                                <div className="mx-auto max-w-xs px-8">
                                    <p className="text-base font-semibold text-slate-400">Monthly</p>
                                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-bold tracking-tight text-white">$99</span>
                                        <span className="text-sm font-semibold leading-6 tracking-wide text-slate-500">USD</span>
                                    </p>
                                    <Link
                                        to="/apply"
                                        className="mt-10 block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    >
                                        Get access
                                    </Link>
                                    <p className="mt-6 text-xs leading-5 text-slate-500">
                                        Invoices and receipts available for easy company expensing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <FAQ />
            
            {/* CTA Section */}
            <div className="relative isolate overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-20" />
                <div className="px-6 py-4 sm:px-6 sm:py-32 lg:px-8 bg-slate-950">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                            Ready to streamline your stack?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
                            Join hundreds of other smart founders saving money and time.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/apply"
                                className="rounded-[16px] bg-white px-8 py-3.5 text-lg font-bold text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-all"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
