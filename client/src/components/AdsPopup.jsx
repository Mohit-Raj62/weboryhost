import React, { useEffect, useState } from 'react';

const AdsPopup = ({ adContent }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full flex flex-col items-center animate-fade-in-up relative">
        {adContent ? adContent : (
          <>
            <img src="/webory.png" alt="Ad" className="w-20 h-20 object-contain mb-3" />
            <h3 className="text-lg font-bold mb-1 text-center">Special Offer!</h3>
            <p className="text-gray-700 text-center mb-2">Get 50% off on your first project. Limited time only!</p>
            <a href="/contact" className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold mt-2">Contact Us</a>
          </>
        )}
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1.50s cubic-bezier(.4,0,.2,1); }
      `}</style>
    </div>
  );
};

export default AdsPopup; 