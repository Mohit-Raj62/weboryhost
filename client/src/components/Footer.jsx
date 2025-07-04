import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
  // useTheme,
  // useMediaQuery,
  TextField,
  InputAdornment
} from '@mui/material';
import XIcon from '@mui/icons-material/X';
import {
  Facebook as FacebookIcon,
  // Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  AdminPanelSettings as AdminIcon,
  Settings as SettingsIcon,
  Email as EmailIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  WhatsApp,
} from '@mui/icons-material';
import ThreadsIcon from '@mui/icons-material/Gesture';

const Footer = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ type: '', message: '' });

  const sections = [
    {
      title: 'Webory',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        // { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
        { name: 'Client', path: '/client' }
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/career' },
        { name: 'Support', path: '/support' }
      ]
    },
    // {
    //   title: 'Contact Info',
    //   links: [
    //     { name: 'weboryinfo@gmail.com', icon: <EmailIcon /> },
    //     { name: '+91 94704-89367', icon: <PhoneIcon /> },
    //     { name: '123 Business Ave, Suite 100', icon: <LocationIcon /> }
    //   ]
    // },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        // { name: 'Disclaimer', path: '/services' }
        // { name: 'Disclaimer', path: '/disclaimer' }


      ]
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, path: 'https://facebook.com' },
    { icon: <XIcon />, path: 'https://x.com/Weboryinfo?t=-00bwPiELtq_XS_WvZZl2w&s=08' },
    { icon: <InstagramIcon />, path: 'https://www.instagram.com/weboryinfo?igsh=YjZmbjRwdHhmNHU2' },
    { icon: <ThreadsIcon />, path: 'https://www.threads.net/@weboryinfo' },
    { icon: <LinkedInIcon />, path: 'https://www.linkedin.com/in/webory-info-35a257372?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { icon: <WhatsApp/>, path: 'https://whatsapp.com/channel/0029Vb3Cd5JFnSzHB0i0on04' }
    
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setNewsletterStatus({ type: '', message: '' });
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setNewsletterStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    const web3FormsData = {
      access_key: "7203cedb-c88e-49fd-9559-c83b4426bfcc",
      from_name: "Webory Newsletter",
      subject: `New Newsletter Subscription: ${email}`,
      email,
      form_type: 'Newsletter Subscription',
    };
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(web3FormsData)
      });
      const data = await response.json();
      if (data.success) {
        setNewsletterStatus({ type: 'success', message: 'Thank you for subscribing!' });
        setEmail('');
      } else {
        setNewsletterStatus({ type: 'error', message: data.message || 'Subscription failed. Please try again.' });
      }
    } catch (error) {
      setNewsletterStatus({ type: 'error', message: 'Subscription failed. Please try again.' });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: '#1a1a1a',
        color: '#ffffff',
        py: 8,
        mt: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
        }
      }}
    >
      {/* Floating Admin Button */}
      {/* <Button
        component={RouterLink}
        to="/admin/login"
        variant="contained"
        startIcon={<SettingsIcon />}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
          color: '#ffffff',
          borderRadius: '50px',
          px: 3,
          py: 1,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(45deg, #1976D2 30%, #7B1FA2 90%)',
          },
          transition: 'all 0.3s ease',
          ...(isMobile && {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            '& .MuiButton-startIcon': {
              margin: 0
            },
            '& .MuiButton-label': {
              display: 'none'
            }
          })
        }}
      >
        Admin
      </Button> */}

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.title}>
              <Typography
                variant="h6"
                sx={{
                  background: 'linear-gradient(45deg, #2196F3, #9C27B0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600,
                  mb: 3,
                  fontSize: '1.2rem',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '40px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #2196F3, #9C27B0)',
                    borderRadius: '2px'
                  }
                }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {section.links.map((link) => (
                  <Box
                    key={link.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5
                    }}
                  >
                    {link.icon ? (
                      <IconButton
                        component="a"
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&:hover': {
                            color: '#2196F3',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s'
                          }
                        }}
                      >
                        {link.icon}
                      </IconButton>
                    ) : (
                      <Button
                        component={RouterLink}
                        to={link.path}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          '&:hover': {
                            color: '#2196F3',
                            transform: 'translateX(4px)',
                            transition: 'all 0.2s',
                            backgroundColor: 'transparent'
                          }
                        }}
                      >
                        {link.name}
                      </Button>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Newsletter Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                background: 'linear-gradient(45deg, #2196F3, #9C27B0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
                mb: 3,
                fontSize: '1.2rem',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #2196F3, #9C27B0)',
                  borderRadius: '2px'
                }
              }}
            >
              Newsletter
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                p: 2
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196F3'
                    }
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        sx={{
                          color: '#2196F3',
                          '&:hover': {
                            color: '#1976D2'
                          }
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {newsletterStatus.message && (
                <Box sx={{ mb: 1, color: newsletterStatus.type === 'success' ? '#4caf50' : '#f44336', fontWeight: 500 }}>
                  {newsletterStatus.message}
                </Box>
              )}
            </Box>

            {/* Social Media Icons */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #2196F3, #9C27B0)',
                      color: '#ffffff',
                      transform: 'scale(1.1)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ 
          my: 4,
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }} />

        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}
        >
          © {new Date().getFullYear()} Webory. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 