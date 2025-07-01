import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showWritePost, setShowWritePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      category: 'web-development',
      author: 'John Doe',
      date: 'March 15, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
      excerpt: 'Explore the latest trends in web development that are shaping the future of digital experiences.',
      content: `The web development landscape is constantly evolving, and 2024 brings exciting new trends that are reshaping how we build and interact with web applications.

1. WebAssembly (Wasm) Goes Mainstream
WebAssembly is becoming increasingly popular for running high-performance code in the browser. With major browsers now supporting Wasm, we're seeing more complex applications running at near-native speeds.

2. Edge Computing Integration
Edge computing is revolutionizing how we deploy and serve web applications. By processing data closer to users, we're seeing significant improvements in performance and user experience.

3. AI-Powered Development Tools
AI is transforming the development workflow, from code completion to automated testing and optimization. Tools like GitHub Copilot are just the beginning of this revolution.

4. Micro-Frontends Architecture
The micro-frontends approach is gaining traction, allowing teams to work independently on different parts of a web application while maintaining a cohesive user experience.

5. Web3 and Blockchain Integration
As blockchain technology matures, we're seeing more web applications integrating decentralized features and smart contracts.`,
      featured: true
    },
    {
      id: 2,
      title: 'Designing for Accessibility: Best Practices',
      category: 'design',
      author: 'Jane Smith',
      date: 'March 12, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      excerpt: 'Learn how to create inclusive designs that work for everyone, regardless of their abilities.',
      content: `Creating accessible digital experiences is not just a legal requirement—it's a moral imperative and good business practice. Here are key principles for designing accessible interfaces:

1. Color Contrast and Typography
- Maintain a minimum contrast ratio of 4.5:1 for normal text
- Use readable font sizes and line heights
- Avoid relying solely on color to convey information

2. Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Implement logical tab order
- Provide visible focus indicators

3. Screen Reader Compatibility
- Use semantic HTML elements
- Provide alt text for images
- Structure content with proper heading hierarchy

4. Forms and Input Fields
- Include clear labels and instructions
- Provide error messages that are easy to understand
- Allow sufficient time for form completion`,
      featured: true
    },
    {
      id: 3,
      title: 'Digital Marketing Strategies for 2024',
      category: 'marketing',
      author: 'Mike Johnson',
      date: 'March 10, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
      excerpt: 'Discover effective digital marketing strategies to grow your business in the coming year.',
      content: `The digital marketing landscape continues to evolve rapidly. Here are the key strategies that will drive success in 2024:

1. AI-Powered Personalization
- Leverage machine learning for customer segmentation
- Implement dynamic content delivery
- Use predictive analytics for better targeting

2. Voice Search Optimization
- Optimize content for voice queries
- Focus on natural language and long-tail keywords
- Create FAQ content that answers common questions

3. Video Marketing
- Short-form video content for social media
- Live streaming for real-time engagement
- Interactive video experiences

4. Social Commerce
- Shoppable posts and stories
- Social media storefronts
- Influencer partnerships`,
      featured: false
    },
    {
      id: 4,
      title: 'The Rise of AI in Web Development',
      category: 'technology',
      author: 'Sarah Wilson',
      date: 'March 8, 2024',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      excerpt: 'How artificial intelligence is transforming the way we build and maintain websites.',
      content: `Artificial Intelligence is revolutionizing web development in unprecedented ways. Here's how AI is changing the game:

1. Automated Code Generation
- AI-powered code completion
- Automated bug detection and fixing
- Code optimization suggestions

2. Smart Testing and QA
- Automated test case generation
- Performance optimization
- Security vulnerability detection

3. Enhanced User Experience
- Personalized content delivery
- Smart search functionality
- Automated A/B testing

4. Development Workflow Optimization
- Project timeline prediction
- Resource allocation
- Code review automation`,
      featured: false
    },
    {
      id: 5,
      title: 'Building Scalable Web Applications',
      category: 'web-development',
      author: 'Alex Chen',
      date: 'March 5, 2024',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      excerpt: 'Learn the best practices for building web applications that can handle millions of users.',
      content: `Scalability is crucial for modern web applications. Here's how to build systems that can grow with your user base:

1. Architecture Design
- Microservices architecture
- Load balancing strategies
- Database sharding techniques

2. Performance Optimization
- Caching strategies
- CDN implementation
- Database optimization

3. Monitoring and Analytics
- Real-time performance monitoring
- User behavior analytics
- Error tracking and logging

4. Security Considerations
- DDoS protection
- Data encryption
- Access control implementation`,
      featured: false
    },
    {
      id: 6,
      title: 'The Future of UI/UX Design',
      category: 'design',
      author: 'Emma Davis',
      date: 'March 3, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      excerpt: 'Exploring the latest trends and innovations in user interface and experience design.',
      content: `The field of UI/UX design is evolving rapidly. Here are the key trends shaping the future:

1. Neumorphism and Glassmorphism
- Soft UI design principles
- Depth and dimension in interfaces
- Modern material design

2. Voice User Interfaces
- Voice command integration
- Natural language processing
- Multi-modal interactions

3. Augmented Reality
- AR in web applications
- 3D product visualization
- Interactive AR experiences

4. Personalization and AI
- Adaptive interfaces
- User behavior prediction
- Contextual design`,
      featured: false
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: null
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState({ type: '', message: '' });

  // Load saved blog posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save blog posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'technology', name: 'Technology' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'business', name: 'Business' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const handleEditPost = (post) => {
    setFormData({
      title: post.title,
      category: post.category,
      content: post.content,
      image: null // Reset image as we can't store File objects in state
    });
    setIsEditing(true);
    setSelectedPost(post);
    setShowWritePost(true);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
      }
    }
  };

  const handleWritePost = (e) => {
    e.preventDefault();
    
    if (isEditing && selectedPost) {
      // Update existing post
      setBlogPosts(prevPosts => prevPosts.map(post => 
        post.id === selectedPost.id 
          ? {
              ...post,
              title: formData.title,
              category: formData.category,
              content: formData.content,
              image: formData.image ? URL.createObjectURL(formData.image) : post.image,
              excerpt: formData.content.split('\n')[0],
              readTime: `${Math.ceil(formData.content.split(' ').length / 200)} min read`
            }
          : post
      ));
      alert('Blog post updated successfully!');
    } else {
      // Create new post
      const newPost = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        author: 'Current User',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        readTime: `${Math.ceil(formData.content.split(' ').length / 200)} min read`,
        image: formData.image ? URL.createObjectURL(formData.image) : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: formData.content.split('\n')[0],
        content: formData.content,
        featured: false
      };
      setBlogPosts(prevPosts => [newPost, ...prevPosts]);
      alert('Blog post published successfully!');
    }

    // Reset form and close modal
    setFormData({
      title: '',
      category: '',
      content: '',
      image: null
    });
    setShowWritePost(false);
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  // Newsletter submit handler
  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    setNewsletterStatus({ type: '', message: '' });
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    const web3FormsData = {
      access_key: "7203cedb-c88e-49fd-9559-c83b4426bfcc",
      from_name: "Webory Blog Newsletter",
      subject: `New Blog Newsletter Subscription: ${newsletterEmail}`,
      email: newsletterEmail,
      form_type: 'Blog Newsletter Subscription',
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
        setNewsletterEmail("");
      } else {
        setNewsletterStatus({ type: 'error', message: data.message || 'Subscription failed. Please try again.' });
      }
    } catch (error) {
      setNewsletterStatus({ type: 'error', message: 'Subscription failed. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-8">
            Our Blog
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Insights, trends, and best practices in web development, design, and digital marketing.
          </p>
          <button
            onClick={() => setShowWritePost(true)}
            className="mt-8 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Write a Blog Post
          </button>
        </div>

        {/* Featured Posts */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map(post => (
              <div
                key={post.id}
                className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{post.title}</h3>
                  <p className="text-white/80 mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">By {post.author}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-400 hover:text-red-300 font-semibold"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => handleReadMore(post)}
                        className="text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-full p-2 border border-white/10">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{post.title}</h3>
                <p className="text-white/80 mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">{post.readTime}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-400 hover:text-red-300 font-semibold"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => handleReadMore(post)}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-white/80 mb-8">
              Get the latest articles and insights delivered straight to your inbox.
            </p>
            <form className="flex gap-4" onSubmit={handleNewsletterSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
              />
              <button type="submit" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </form>
            {newsletterStatus.message && (
              <div className={`mt-4 font-semibold ${newsletterStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {newsletterStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Read More Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-3xl p-8 max-w-4xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">{selectedPost.title}</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
              <span>{selectedPost.category}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
              <span>•</span>
              <span>By {selectedPost.author}</span>
            </div>
            <div className="prose prose-invert max-w-none">
              {selectedPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-white/80 mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Write Post Modal */}
      {showWritePost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-3xl p-8 max-w-4xl w-full border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? 'Edit Blog Post' : 'Write a New Blog Post'}
              </h2>
              <button
                onClick={() => {
                  setShowWritePost(false);
                  setIsEditing(false);
                  setSelectedPost(null);
                  setFormData({
                    title: '',
                    category: '',
                    content: '',
                    image: null
                  });
                }}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleWritePost} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select a category</option>
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white mb-2">Featured Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Content</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 h-64"
                  placeholder="Write your blog post content here..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                {isEditing ? 'Update Post' : 'Publish Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog; 