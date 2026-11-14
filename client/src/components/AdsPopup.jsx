import React, { useEffect, useState } from 'react';

const AdsPopup = ({ adContent }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 max-w-xs w-full flex flex-col items-center animate-fade-in-up relative text-center">
        {adContent ? adContent : (
          <>
            <img src="/webory.png" alt="Ad" className="w-16 h-16 object-contain mb-3" />
            <h3 className="text-lg font-bold mb-1 text-slate-950">Special Offer</h3>
            <p className="text-slate-600 text-xs mb-3">Get 10% off on your first digital project with Webory. Limited time only!</p> 
            <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold mt-1 transition-all shadow-sm">Claim Offer</a>
          </>
        )}
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s cubic-bezier(.4,0,.2,1); }
      `}</style>
    </div>
  );
};

export default AdsPopup;
