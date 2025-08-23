import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsApp = () => {
  // WhatsApp number - replace XXXXXXXXXX with your actual number
  const whatsappNumber = '9473471153'; // Replace XXXX with your actual number
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Connect With Us on WhatsApp
          </Typography>
          <Typography variant="body1" paragraph>
            Get instant support and answers to your questions through our WhatsApp chat service.
          </Typography>
          <Typography variant="body1" paragraph>
            Our team is available to assist you with any inquiries about our web development, 
            app development, and digital marketing services.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsAppIcon />}
            sx={{ 
              bgcolor: '#25D366', 
              '&:hover': { bgcolor: '#128C7E' },
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontSize: '1.1rem'
            }}
          >
            Chat With Us on WhatsApp
          </Button>
        </Box>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Why Connect With Us?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', mt: 3 }}>
            <Box sx={{ flex: 1, p: 2 }}>
              <Typography variant="h6">Quick Responses</Typography>
              <Typography variant="body2">Get answers to your questions within minutes</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
              <Typography variant="h6">Expert Advice</Typography>
              <Typography variant="body2">Speak directly with our development team</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
              <Typography variant="h6">24/7 Support</Typography>
              <Typography variant="body2">We're here to help whenever you need us</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default WhatsApp;