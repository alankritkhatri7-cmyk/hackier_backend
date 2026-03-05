import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Users, MousePointer2, PieChart, CreditCard, Download, ArrowRight, Check, Shield, BarChart3, Globe } from 'lucide-react';
import { tools } from '../data/tools';
import FAQ from '../components/FAQ';

const Home = () => {
    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-white/20">
            {/* Hero Section */}
            <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-slate-400 ring-1 ring-inset ring-slate-800 mb-8 bg-slate-900/50 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
                        Powering the next generation of indie hackers
                    </div>
                
                    <h1 className="text-5xl font-medium tracking-tight text-white sm:text-7xl mb-8">
                        Stop paying enterprise prices <br className="hidden sm:block" />
                        for your daily apps.
                    </h1>
                    
                    <p className="mt-6 text-xl leading-8 text-slate-400 max-w-2xl mx-auto">
                        Replace your $5000/mo SaaS stack with one simple $100 subscription. 
                        Get access to premium indie tools for project management, marketing, design, and more.
                    </p>
                    
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/apply" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all">
                            Get Started
                        </Link>
                        <Link to="/store" className="rounded-full bg-slate-900/50 px-8 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-slate-700 hover:bg-slate-800 transition-all">
                            View Included Apps
                        </Link>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="mt-16 sm:mt-24 relative">
                        <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-2 shadow-2xl shadow-indigo-500/10 ring-1 ring-white/10 backdrop-blur-sm">
                            <div className="rounded-lg bg-slate-950 overflow-hidden relative aspect-[16/9] sm:aspect-[2/1] border border-slate-800/50">
                                {/* Mock Dashboard Content */}
                                <div className="absolute inset-0 flex">
                                    {/* Sidebar */}
                                    <div className="w-16 sm:w-64 border-r border-slate-800 bg-slate-900/30 hidden sm:flex flex-col p-4 gap-4">
                                        <div className="h-8 w-8 bg-indigo-500 rounded-lg mb-4"></div>
                                        <div className="h-4 w-2/3 bg-slate-800 rounded"></div>
                                        <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
                                        <div className="h-4 w-3/4 bg-slate-800 rounded"></div>
                                        <div className="mt-auto h-12 w-full bg-slate-800/50 rounded-lg"></div>
                                    </div>
                                    
                                    {/* Main Content */}
                                    <div className="flex-1 p-6 sm:p-10 bg-gradient-to-br from-slate-950 to-slate-900">
                                        <div className="flex justify-between items-center mb-10">
                                            <div className="space-y-2">
                                                <div className="h-8 w-48 bg-slate-800 rounded"></div>
                                                <div className="h-4 w-96 bg-slate-800/50 rounded hidden sm:block"></div>
                                            </div>
                                            <div className="h-10 w-32 bg-indigo-600/20 border border-indigo-500/30 rounded-lg hidden sm:block"></div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="h-32 rounded-xl bg-slate-900 border border-slate-800 p-4 relative overflow-hidden group">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                    <div className="h-8 w-8 bg-slate-800 rounded mb-4"></div>
                                                    <div className="h-6 w-24 bg-slate-800 rounded mb-2"></div>
                                                    <div className="h-4 w-12 bg-indigo-500/50 rounded"></div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="h-64 rounded-xl bg-slate-900 border border-slate-800 p-6 flex items-end justify-between gap-2 overflow-hidden">
                                             {[40, 70, 45, 90, 60, 80, 50, 75, 65, 95, 20, 50].map((h, i) => (
                                                 <div key={i} className="w-full bg-indigo-500/20 hover:bg-indigo-500/40 transition-colors rounded-t-sm relative group" style={{height: `${h}%`}}>
                                                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                         ${h * 100}
                                                     </div>
                                                 </div>
                                             ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Overlay Gradient to fade bottom */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Feature Grid - Below Dashboard */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                         <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
                             <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
                                 <CreditCard className="w-6 h-6 text-indigo-400" />
                             </div>
                             <h3 className="text-xl font-medium text-white mb-3">One Subscription</h3>
                             <p className="text-slate-400 leading-relaxed theme-text">
                                 Simplify your billing. Pay $100/mo and get access to tools worth over $5k/mo. No hidden per-user fees.
                             </p>
                         </div>
                         
                         <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
                             <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                                 <Users className="w-6 h-6 text-purple-400" />
                             </div>
                             <h3 className="text-xl font-medium text-white mb-3">Community First</h3>
                             <p className="text-slate-400 leading-relaxed theme-text">
                                 Every tool is built by independent creators. Your subscription directly supports the indie hacker ecosystem.
                             </p>
                         </div>
                         
                         <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
                             <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                                 <Shield className="w-6 h-6 text-emerald-400" />
                             </div>
                             <h3 className="text-xl font-medium text-white mb-3">Vetted Quality</h3>
                             <p className="text-slate-400 leading-relaxed theme-text">
                                 We manually review every tool for quality, security, and uptime. Only the best make it into the bundle.
                             </p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Included Tools Strip (Replacing the grid for cleaner look) */}
            <div className="py-24 bg-black border-t border-slate-900">
                 <div className="max-w-7xl mx-auto px-6 lg:px-8">
                     <p className="text-center text-sm font-semibold text-slate-500 mb-12 uppercase tracking-widest">
                         Includes access to Premium Tools like
                     </p>
                     <div className="flex flex-wrap justify-center gap-12 sm:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                          {tools.slice(0, 6).map((tool) => (
                               <div key={tool.id} className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-lg bg-slate-800/50 p-2 border border-slate-700">
                                       <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                                   </div>
                                   <span className="text-lg font-bold text-slate-300">{tool.name}</span>
                               </div>
                          ))}
                     </div>
                 </div>
            </div>

            {/* How It Works Section (Simplified) */}
            <div className="bg-black py-24 border-t border-slate-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl mb-6">
                                The "Spotify" Model for SaaS
                            </h2>
                            <p className="text-lg text-slate-400 mb-8">
                                We've simplified software procurement. Instead of managing 20 different invoices and subscriptions, you have one.
                            </p>
                            
                            <ul className="space-y-6">
                                {[
                                    "Browse a curated store of 50+ tools",
                                    "One flat monthly fee of $99",
                                    "Unlimited usage on all apps",
                                    "Cancel anytime, keep your data"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4">
                                        <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="mt-10">
                                <Link to="/store" className="text-white font-semibold flex items-center hover:text-indigo-400 transition-colors">
                                    Browse the store <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-20"></div>
                            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-8">
                                <div className="space-y-4">
                                     <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                                         <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400"><MousePointer2 size={20} /></div>
                                             <div>
                                                 <div className="text-white font-medium">Design Tool Pro</div>
                                                 <div className="text-xs text-slate-500">Normally $29/mo</div>
                                             </div>
                                         </div>
                                         <div className="text-emerald-400 text-sm font-medium">Included</div>
                                     </div>
                                     <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                                         <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 rounded bg-purple-500/20 flex items-center justify-center text-purple-400"><BarChart3 size={20} /></div>
                                             <div>
                                                 <div className="text-white font-medium">Analytics Plus</div>
                                                 <div className="text-xs text-slate-500">Normally $49/mo</div>
                                             </div>
                                         </div>
                                         <div className="text-emerald-400 text-sm font-medium">Included</div>
                                     </div>
                                      <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                                         <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 rounded bg-pink-500/20 flex items-center justify-center text-pink-400"><Globe size={20} /></div>
                                             <div>
                                                 <div className="text-white font-medium">SEO Master</div>
                                                 <div className="text-xs text-slate-500">Normally $39/mo</div>
                                             </div>
                                         </div>
                                         <div className="text-emerald-400 text-sm font-medium">Included</div>
                                     </div>
                                     
                                     <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center">
                                         <div className="text-slate-400">Total Value</div>
                                         <div className="text-xl font-bold text-white"><span className="line-through text-slate-600 text-sm mr-2">$117/mo</span> $99/mo</div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black py-16 border-t border-slate-900">
                 <FAQ />
            </div>
        </div>
    );
}

export default Home;
