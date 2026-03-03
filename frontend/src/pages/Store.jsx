import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../data/tools';
import { Search, Grid, Layout, Zap, Briefcase, PenTool, MessageSquare, TrendingUp, CreditCard, Sparkles, Heart, DollarSign, FolderKanban } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Store = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "All", icon: Grid },
    { name: "Project Management", icon: FolderKanban },
    { name: "Marketing Tools", icon: TrendingUp },
    { name: "Finance", icon: DollarSign },
    { name: "Wellness", icon: Heart },
    { name: "Productivity", icon: Zap },
    { name: "Marketing", icon: TrendingUp },
    { name: "Design", icon: PenTool },
    { name: "Customer Support", icon: MessageSquare },
    { name: "SEO", icon: Layout },
    { name: "Dev Tools", icon: Briefcase },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured Tool (Mock logic: just pick the first one or a specific one)
  const featuredTool = tools[0];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-sans flex text-sm">
      
{/* Sidebar removed */}

      {/* Main Content */}
      <div className="flex-1 min-w-0 pt-32">
          <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
              
              {/* Search and Filter Section */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                {/* Categories */}
                <div className="overflow-x-auto pb-2 flex gap-2 w-full md:w-auto no-scrollbar">
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
                            selectedCategory === "All"
                            ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-900/20'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                        }`}
                    >
                        <Grid className="w-4 h-4 inline-block mr-2" />
                        All Apps
                    </button>
                    {categories.filter(c => c.name !== "All").map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
                                selectedCategory === cat.name 
                                ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-900/20' 
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                            }`}
                        >
                            <cat.icon className="w-4 h-4 inline-block mr-2" />
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search apps..." 
                        className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-full py-2 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
              </div>

              {/* Featured Hero Banner */}
              {selectedCategory === "All" && !searchQuery && (
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-64 md:h-80 flex items-center shadow-2xl shadow-black/50 border border-white/5 group">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481487484168-9b930d5b01dd?q=80&w=2070&auto=format&fit=crop')] opacity-10 mix-blend-overlay bg-cover bg-center grayscale"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                      
                      <div className="relative z-10 px-8 md:px-12 w-full flex items-end md:items-center justify-between h-full pb-8 md:pb-0">
                          <div className="max-w-xl">
                              <span className="text-white font-bold tracking-wider text-xs uppercase mb-2 block opacity-70">Major Update</span>
                              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                  TaskFlow 2.0 <br/>
                                  <span className="text-slate-400 text-xl md:text-3xl font-normal">Sync your team instantly.</span>
                              </h2>
                              <p className="text-slate-400 text-sm md:text-base mb-6 line-clamp-2 max-w-sm">
                                  The world's most intuitive project management tool just got smarter with AI automation.
                              </p>
                          </div>
                      </div>
                  </div>
              )}

              {/* App List Section */}
              <div>
                  <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white flex items-center">
                          {selectedCategory === "All" ? "Essential Apps" : selectedCategory}
                          <span className="ml-2 text-xs font-normal text-slate-500">&rsaquo;</span>
                      </h2>
                      <button className="text-xs text-brand-400 hover:text-brand-300 font-medium">See All</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                      {filteredTools.map((tool) => (
                          <div key={tool.id} className="flex items-center group p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 cursor-pointer">
                              {/* Icon */}
                              <div className={`flex-shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center text-2xl font-bold bg-white border border-slate-800 text-slate-900 shadow-lg overflow-hidden relative group-hover:scale-105 transition-transform p-2`}>
                                  <img
                                    src={tool.logo}
                                    alt={tool.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="text-2xl font-bold text-slate-900">${tool.name.charAt(0)}</span>`; }}
                                  />
                              </div>

                              {/* Content */}
                              <div className="ml-5 flex-1 min-w-0 pr-4">
                                  <h3 className="text-lg font-bold text-white truncate group-hover:text-slate-200 transition-colors">{tool.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 border border-slate-800 bg-slate-950 px-2 py-0.5 rounded-full">{tool.category}</span>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-2 line-clamp-1 font-medium">{tool.description}</p>
                              </div>

                              {/* Action */}
                              <div className="flex-shrink-0">
                                  <div className="h-8 w-8 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-black transition-colors"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                  
                   {filteredTools.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500">No tools found.</p>
                            <button 
                                onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
                                className="mt-4 text-brand-400 hover:text-brand-300 text-sm"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
              </div>

              {/* Subscribe CTA Banner */}
              {user?.subscription_status !== 'active' && (
                <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">Unlock all {tools.length} tools for $99/mo</p>
                      <p className="text-slate-400 text-sm mt-0.5">One subscription. Cancel anytime. Powered by PayPal.</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex-shrink-0 flex items-center gap-2 bg-white text-slate-900 font-bold px-7 py-3 rounded-xl hover:bg-slate-100 hover:-translate-y-0.5 transition-all shadow-lg text-sm whitespace-nowrap"
                  >
                    <CreditCard className="w-4 h-4" />
                    Subscribe Now
                  </Link>
                </div>
              )}

          </div>
      </div>
    </div>
  );
};

export default Store;
