import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Fab, Tooltip } from '@mui/material';

const WhatsAppButton = () => {
  const handleLiveChatClick = () => {
    // Replaced non-breaking spaces with regular spaces and used encodeURIComponent for safety.
    const text = 'Hi Webory, I am [Your Name] from [Business Name]. I am looking for [Website/SEO/App]. Please connect with me.';
    window.open(`https://wa.me/919473471153?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <Tooltip title="Chat with us on WhatsApp" placement="right">
      <Fab
        aria-label="WhatsApp"
        style={{
          position: 'fixed',
          left: '20px',
          bottom: '20px',
          backgroundColor: '#25D366',
          color: 'white',
          zIndex: 1000,
        }}
        onClick={handleLiveChatClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppButton;