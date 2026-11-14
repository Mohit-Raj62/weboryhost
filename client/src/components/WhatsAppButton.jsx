import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Tooltip } from '@mui/material';

const WhatsAppButton = () => {
  const handleLiveChatClick = (e) => {
    e.preventDefault();
    try {
      const text = "Hi Webory, I'm interested in discussing a new digital/AI project for my company.";
      const whatsappUrl = `https://wa.me/916205947359?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  return (
    <Tooltip title="Instant WhatsApp Connect" placement="right">
      <button
        onClick={handleLiveChatClick}
        aria-label="WhatsApp"
        className="fixed left-5 bottom-5 z-50 group flex items-center gap-2 px-3.5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] transition-all duration-300 hover:scale-105 border border-emerald-400/40"
      >
        <div className="relative">
          <WhatsAppIcon className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white"></span>
        </div>
        <span className="text-xs font-bold tracking-tight pr-1 hidden sm:inline-block">
          Chat With Us
        </span>
      </button>
    </Tooltip>
  );
};

export default WhatsAppButton;
