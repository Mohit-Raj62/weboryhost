import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    portfolio: ''
  });

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'product', name: 'Product' },
    { id: 'data', name: 'Data Science' }
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing web applications.',
      requirements: [
        '5+ years of experience with React',
        'Strong knowledge of JavaScript/TypeScript',
        'Experience with modern frontend tools and frameworks',
        'Excellent problem-solving skills'
      ]
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our design team to create beautiful and intuitive user interfaces for our products.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma and Adobe Creative Suite',
        'Strong portfolio showcasing web and mobile designs',
        'Experience with user research and testing'
      ]
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist',
      department: 'marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help us grow our digital presence and reach new customers through innovative marketing strategies.',
      requirements: [
        '3+ years of digital marketing experience',
        'Experience with SEO and SEM',
        'Strong analytical skills',
        'Knowledge of marketing automation tools'
      ]
    },
    {
      id: 4,
      title: 'Sales Representative',
      department: 'sales',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our sales team to help businesses transform their digital presence with our solutions.',
      requirements: [
        '2+ years of B2B sales experience',
        'Strong communication and negotiation skills',
        'Experience with CRM tools',
        'Understanding of web development and digital services'
      ]
    },
    {
      id: 5,
      title: 'Backend Developer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Looking for a Backend Developer to build scalable and secure server-side applications.',
      requirements: [
        '4+ years of backend development experience',
        'Strong knowledge of Node.js/Python/Java',
        'Experience with databases and APIs',
        'Understanding of cloud services'
      ]
    },
    {
      id: 6,
      title: 'Product Manager',
      department: 'product',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead product development and strategy for our digital solutions.',
      requirements: [
        '3+ years of product management experience',
        'Strong analytical and strategic thinking',
        'Experience with agile methodologies',
        'Excellent communication skills'
      ]
    },
    {
      id: 7,
      title: 'Data Scientist',
      department: 'data',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our data team to analyze and derive insights from complex datasets.',
      requirements: [
        '3+ years of data science experience',
        'Strong knowledge of Python/R',
        'Experience with machine learning',
        'Excellent statistical analysis skills'
      ]
    },
    {
      id: 8,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help us build and maintain our cloud infrastructure and CI/CD pipelines.',
      requirements: [
        '3+ years of DevOps experience',
        'Experience with AWS/Azure/GCP',
        'Knowledge of containerization and orchestration',
        'Strong scripting skills'
      ]
    }
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobListings 
    : jobListings.filter(job => job.department === selectedDepartment);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', { ...formData, job: selectedJob });
    setShowApplicationForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
      portfolio: ''
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-8">
            Join Our Team
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Be part of a team that's shaping the future of digital experiences. We're always looking for talented individuals to join our growing family.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-full p-2 border border-white/10">
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedDepartment === dept.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-8">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
                  <div className="flex flex-wrap gap-4">
                    <span className="text-cyan-400">{job.department}</span>
                    <span className="text-white/60">{job.location}</span>
                    <span className="text-white/60">{job.type}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleApplyClick(job)}
                  className="mt-4 md:mt-0 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Apply Now
                </button>
              </div>
              <p className="text-white/80 mb-6">{job.description}</p>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Requirements:</h3>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Join Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl mb-6">
                💼
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Great Benefits</h3>
              <p className="text-white/70">Competitive salary, health insurance, flexible hours, and remote work options.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl mb-6">
                🌱
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Growth Opportunities</h3>
              <p className="text-white/70">Continuous learning, career development, and opportunities to take on new challenges.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-xl mb-6">
                👥
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Great Culture</h3>
              <p className="text-white/70">Collaborative environment, team events, and a supportive community of professionals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-3xl p-8 max-w-2xl w-full border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Apply for {selectedJob?.title}
              </h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Resume/CV</label>
                <input
                  type="file"
                  required
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Cover Letter</label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 h-32"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>
              <div>
                <label className="block text-white mb-2">Portfolio URL (optional)</label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  placeholder="https://your-portfolio.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers; 