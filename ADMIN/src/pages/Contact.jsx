import { useState } from 'react';
import axios from 'axios';

// Use environment variable if available, otherwise default to local development
const url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// For production deployment, set VITE_API_URL in your build environment to "https://logistics-tkej.onrender.com"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any existing status when user starts typing
    if (submitStatus.message) {
      setSubmitStatus({ success: null, message: '' });
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus({ success: false, message: 'Name is required' });
      return false;
    }
    if (!formData.email.trim()) {
      setSubmitStatus({ success: false, message: 'Email is required' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitStatus({ success: false, message: 'Please enter a valid email' });
      return false;
    }
    if (!formData.message.trim()) {
      setSubmitStatus({ success: false, message: 'Message is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });

    try {
      const response = await axios.post(`${url}/api/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      setSubmitStatus({ 
        success: true, 
        message: 'Your message has been sent successfully! We will get back to you soon.' 
      });
      
      // Reset form on successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      ),
      title: 'Phone',
      description: '9132037254'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      ),
      title: 'Address',
      description: '8630 Melrose St, Overland Park, KS 66214'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      ),
      title: 'Email',
      description: 'info@.com'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Contact Us
        </h1>
        <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Reach out to us using the form below or our contact information.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
          
          {/* Status Message */}
          {submitStatus.message && (
            <div className={`mb-6 p-4 rounded ${
              submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-md text-white font-medium ${
                isSubmitting ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
              } transition-colors`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-red-50 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Map */}
          <div className="mt-12 h-64 bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.033948225112!2d-94.7076099!3d38.9721375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0eb5e198a081f%3A0x5415ed11411aa071!2s8630%20Melrose%20St%2C%20Overland%20Park%2C%20KS%2066214%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Our Location"
            ></iframe>
          </div>
          
          {/* Social Media Links */}
          <div className="mt-8 flex space-x-4">
            {[
              { name: 'Facebook', icon: 'facebook', url: '#' },
              { name: 'Twitter', icon: 'twitter', url: '#' },
              { name: 'Instagram', icon: 'instagram', url: '#' },
              { name: 'LinkedIn', icon: 'linkedin', url: '#' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-red-100 rounded-full transition-colors duration-200"
                aria-label={social.name}
              >
                <span className="sr-only">{social.name}</span>
                <i className={`fab fa-${social.icon} text-gray-700 text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
