import React, { useState, useRef } from 'react';
import jobListings from '../data/jobListings';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', or 'error'
  const [isClosing, setIsClosing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    portfolio: ''
  });

  const formRef = useRef(null);

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'product', name: 'Product' },
    { id: 'data', name: 'Data Science' }
  ];



  const filteredJobs = selectedDepartment === 'all'
    ? jobListings
    : jobListings.filter(job => job.department === selectedDepartment);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    setIsClosing(false);
    setSubmissionStatus(null);
    setFormData({
      name: '', email: '', phone: '', resume: '', coverLetter: '', portfolio: '', experience: '', skills: ''
    });
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowApplicationForm(false);
      setIsClosing(false);
    }, 300); // Should match the duration of the transition
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started...");
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Prepare data for database
    const applicationData = {
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      department: selectedJob.department,
      candidateName: formData.name,
      email: formData.email,
      phone: formData.phone,
      resume: formData.resume,
      coverLetter: formData.coverLetter,
      portfolio: formData.portfolio || "",
      experience: formData.experience || "Not specified",
      skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [],
    };

    console.log("Selected Job:", selectedJob);
    console.log("Job ID being sent:", selectedJob.id);
    console.log("Job ID type:", typeof selectedJob.id);

    try {
      // First, save to database
      console.log("Saving to database:", applicationData);
      const dbResponse = await fetch(`${import.meta.env.VITE_API_URL || 'https://webory.onrender.com'}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const dbResult = await dbResponse.json();
      console.log("Database response:", dbResult);

      if (!dbResult.success) {
        throw new Error(dbResult.message || "Failed to save to database");
      }

      // Then send email via Web3Forms
      const api_data = new FormData();
      api_data.append("access_key", "7203cedb-c88e-49fd-9559-c83b4426bfcc");
      api_data.append("subject", `New Job Application: ${selectedJob.title}`);
      api_data.append("from_name", "Webory Careers");
      api_data.append("job_title", selectedJob.title);

      Object.entries(formData).forEach(([key, value]) => {
        api_data.append(key, value);
      });

      console.log("Submitting the following data to Web3Forms:");
      for (let [key, value] of api_data.entries()) {
        console.log(`${key}:`, value);
      }

      const emailResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: api_data,
      });

      const emailResult = await emailResponse.json();
      console.log("Web3Forms API Response:", emailResult);

      if (emailResult.success) {
        console.log("Email sent successfully!");
      } else {
        console.warn("Email sending failed, but application was saved to database");
      }

      console.log("Submission successful!");
      setSubmissionStatus('success');
    } catch (error) {
      console.error("Caught an error during submission:", error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
      console.log("Form submission finished.");
    }
  };

  return (
    <div className="min-h-screen bg-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-800 mb-6 sm:mb-8">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of a team that's shaping the future of digital experiences. We're always looking for talented individuals to join our growing family.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className=" shadow-md rounded-full p-4 flex flex-wrap justify-center">
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 m-1 py-2 text-sm md:px-6 md:py-2 md:text-base rounded-full transition-all duration-300 ${
                  selectedDepartment === dept.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-green-300 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <span className="text-blue-500 capitalize font-semibold">{job.department}</span>
                    <span className="text-gray-500">{job.location}</span>
                    <span className="text-gray-500">{job.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleApplyClick(job)}
                  className="mt-4 w-full md:w-auto md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Apply Now
                </button>
              </div>
              <p className="text-gray-600 mb-6">{job.description}</p>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Requirements:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {showApplicationForm && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-500 ${!isClosing ? 'opacity-100' : 'opacity-0'}`}
          >
            <div
              ref={formRef}
              className={`bg-gray-600 rounded-2xl shadow-2xl w-full max-w-3xl max-h-full overflow-y-auto transform transition-all duration-700
                ${!isClosing ? 'scale-100 rotate-0 opacity-100' : 'scale-90 -rotate-12 opacity-0'}
                sm:shadow-3xl sm:backdrop-blur-2xl
              `}
              style={{ willChange: 'transform, opacity' }}
            >
              {submissionStatus === 'success' ? (
                <div className="p-8 md:p-12 text-center">
                  <h2 className="text-3xl font-bold text-green-600 mb-4">🎊Application Sent!🎊</h2>
                  <p className="text-green-600 mb-8">Thank you for applying for the {selectedJob.title} position. We've received your application and will get back to you soon.</p>
                  <button onClick={handleCloseModal} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold">
                    Close 
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="p-6 md:p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-black">Apply for</h2>
                      <p className="text-green-600 text-lg">{selectedJob.title}</p>
                    </div>
                    <button type="button" onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                  </div>

                  {submissionStatus === 'error' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                      <strong className="font-bold">Oops! </strong>
                      <span className="block sm:inline">Something went wrong. Please try again.</span>
                    </div>
                  )}

                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-100 mb-1">Full Name</label>
                        <input type="text" name="name" id="name" required onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-100 mb-1">Email Address</label>
                        <input type="email" name="email" id="email" required onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-100 mb-1">Phone Number</label>
                        <input type="tel" name="phone" id="phone" required onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-100 mb-1">Portfolio URL <span className="text-green-500">(Optional)</span></label>
                        <input type="url" name="portfolio" id="portfolio" onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-green-500 mb-1">Link to Resume/CV</label>
                      <input type="url" name="resume" id="resume" required placeholder="e.g., LinkedIn profile or Google Drive link" onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-100 mb-1">Years of Experience</label>
                      <select name="experience" id="experience" required onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select experience</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2-3 years">2-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-gray-100 mb-1">Skills (comma separated)</label>
                      <input type="text" name="skills" id="skills" placeholder="e.g., React, JavaScript, Node.js" onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-100 mb-1">Cover Letter <span className="text-green-500">(Optional)</span></label>
                      <textarea name="coverLetter" id="coverLetter" rows="4" onChange={handleFormChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers; 