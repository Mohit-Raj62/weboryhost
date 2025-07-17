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
    { icon: <FacebookIcon />, path: 'https://www.facebook.com/share/19reipJ3ga' },
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

        <Box sx={{ mb: 4 }}>
          <Box sx={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '16px',
            p: 3,
            boxShadow: '0 2px 16px 0 rgba(156,39,176,0.08)',
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <Typography variant="h6" sx={{
              color: '#fff',
              fontWeight: 700,
              letterSpacing: 1,
              display: 'flex',
              alignItems: 'center',
              mb: 1.5
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(45deg, #2196F3, #9C27B0)',
                borderRadius: '50%',
                width: 56,
                height: 56,
                marginRight: 16,
                boxShadow: '0 4px 16px 0 rgba(33,150,243,0.10)',
              }}>
                <img src="/webs.jpg" alt="Webory Logo" style={{ width: 40, height: 40, borderRadius: '12px', boxShadow: '0 2px 8px 0 rgba(156,39,176,0.10)' }} />
              </span>
              About Webory
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.88)', mb: 1, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Webory is a top digital agency in India offering website development, UI/UX design, SEO services, digital marketing, and IT solutions to help businesses grow online with mobile-friendly websites and result-driven strategies.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#90caf9', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  weboryinfo@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#a5d6a7', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  +91 94704-89367
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon sx={{ color: '#fbc02d', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Patna, Bihar, India
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SettingsIcon sx={{ color: '#ce93d8', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Mon–Sat: 9:00 AM – 7:00 PM | <span style={{ color: '#4caf50' }}>Support: 24/7</span>
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.10)' }} />
            <Typography variant="body2" sx={{
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 500,
              letterSpacing: 0.5,
              textAlign: 'center',
              fontSize: '1rem',
            }}>
              © 2025 <b style={{color:'#90caf9'}}>Webory</b>. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 