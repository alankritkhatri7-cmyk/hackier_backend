import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const ToolCard = ({ tool }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[20px] bg-slate-900 border border-slate-800 transition-all hover:shadow-[8px_8px_16px_rgba(0,0,0,0.6),-2px_-2px_8px_rgba(255,255,255,0.03)] hover:-translate-y-1 hover:border-slate-600">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-6">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] bg-slate-800 border border-slate-700`}>
                {tool.name.charAt(0)}
            </div>
             <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-950 border border-slate-800 text-slate-400 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-600 transition-colors">
                {tool.category}
            </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-200 transition-colors">
          {tool.name}
        </h3>
        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
          {tool.description}
        </p>
        
        <div className="pt-4 border-t border-slate-800 mt-auto flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">
                Value: <span className="line-through text-slate-600">${tool.originalPrice}/mo</span>
            </div>
            {tool.included && (
                 <div className="flex items-center text-white text-xs font-bold uppercase tracking-wider drop-shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    Included
                 </div>
            )}
        </div>
      </div>
      
      {/* Hover Action overlay or bottom bar */}
      <div className="bg-slate-950 px-6 py-3 flex items-center justify-between group-hover:bg-slate-900/80 transition-colors border-t border-slate-800">
         <span className="text-sm font-semibold text-slate-400 group-hover:text-white">View details</span>
         <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
      </div>
    </div>
  );
};

export default ToolCard;
