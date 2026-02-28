import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "What is Hackier?",
    answer: (
      <div className="space-y-4 text-slate-300">
        <p>Hackier is an affordable SaaS app store for modern startups and a listing platform for indie developers.</p>
        <p>We bundle high-quality indie tools into one subscription for startups, helping them replace expensive enterprise software while giving builders access to paying customers and product visibility.</p>
        <p className="font-semibold text-white">"We sell you build."</p>
        <p>Think of it like Spotify for SaaS apps (All apps in one subscription)</p>
      </div>
    )
  },
  {
    question: "Is it free to list my product?",
    answer: (
      <div className="space-y-4 text-slate-300">
        <p>Yes.</p>
        <p>Listing your product on Hackier is 100% free.</p>
        <p>You can continue charging users directly on your own website as usual. Hackier does not require exclusivity.</p>
      </div>
    )
  },
  {
    question: "How does the pricing model work, and how will I earn?",
    answer: (
      <div className="space-y-4 text-slate-300">
        <p>Hackier is in its early phase, and although the model may change, we will notify you. The following outlines our current structure:</p>
        <p>Startups pay for access to all SaaS apps on our store.</p>
        <p>Each month:</p>
        <ul className="list-disc pl-5 space-y-1 marker:text-slate-500">
          <li><strong className="text-white">90%</strong> of the total revenue is shared with builders.</li>
          <li><strong className="text-white">10%</strong> is retained by Hackier.</li>
        </ul>
        <p>Revenue is distributed based on the percentage of downloads your app receives relative to total downloads across the platform.</p>
      </div>
    )
  },
  {
    question: "How is revenue calculated?",
    answer: (
      <div className="space-y-4 text-slate-300">
        <p>Example: Assume if we only have two apps X and Y and Total monthly revenue = $1,000.</p>
        <p>90% shared pool = $900</p>
        <ul className="list-disc pl-5 space-y-1 marker:text-slate-500">
          <li>App X gets 70% of downloads</li>
          <li>App Y gets 30% of downloads</li>
        </ul>
        <p>Then:</p>
        <ul className="list-disc pl-5 space-y-1 marker:text-slate-500">
          <li>App X receives $630</li>
          <li>App Y receives $270</li>
          <li>Hackier keeps $100</li>
        </ul>
        <p>Revenue share is proportional to download activity.</p>
      </div>
    )
  },
  {
    question: "Do I lose control of my pricing?",
    answer: (
      <div className="space-y-4 text-slate-300">
        <p>No.</p>
        <p>You are free to:</p>
        <ul className="list-disc pl-5 space-y-1 marker:text-slate-500">
          <li>Keep your existing pricing</li>
          <li>Charge users independently</li>
          <li>Offer separate plans outside Hackier</li>
        </ul>
        <p>Hackier acts as an additional distribution and revenue channel.</p>
      </div>
    )
  },
  {
    question: "How do startups access my product?",
    answer: (
      <div className="space-y-4 text-slate-300">
        <p>Startups subscribe to Hackier and can download or access the listed tools included in the bundle. Access and integration details are coordinated during onboarding.</p>
      </div>
    )
  },
  {
    question: "Why should I list on Hackier?",
    answer: (
      <div className="space-y-4 text-slate-300">
        <ul className="list-disc pl-5 space-y-1 marker:text-slate-500">
          <li>Free distribution channel</li>
          <li>Access to startup teams</li>
          <li>Monthly recurring revenue</li>
          <li>Increased product visibility</li>
          <li>No upfront cost</li>
        </ul>
        <p className="font-semibold text-white">You focus on building. We focus on distribution.</p>
      </div>
    )
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-400">Everything you need to know about Hackier</p>
        </div>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-1px_-1px_2px_rgba(255,255,255,0.02)]"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-800/50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-bold text-lg text-white pr-8">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 flex-shrink-0 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 flex-shrink-0 text-slate-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
