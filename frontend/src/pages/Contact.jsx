import React, { useState, useEffect } from 'react';

const Contact = () => {
  // Initial form data; email will be updated if user is logged in.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for user token (and optionally user email) in localStorage on component mount.
  useEffect(() => {
    // For this example, assume that if "token" exists in localStorage, the user is logged in.
    // And we assume the user's email is also stored in localStorage.
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setIsLoggedIn(true);
      setFormData((prevData) => ({ ...prevData, email }));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('Please log in to continue');
      return;
    }
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/contact/contact-us`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If needed, you could include the token:
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setError('');
      } else {
        setError(data.message || 'Error submitting the form');
      }
    } catch (err) {
      console.error(err);
      setError('Error submitting the form');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 flex flex-col items-center justify-center py-12 px-4">
      {!isLoggedIn && (
        <p className="mb-4 text-red-600">
          Please log in to continue.
        </p>
      )}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-700">
        Contact Us
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={!isLoggedIn}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.email}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={!isLoggedIn}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={!isLoggedIn}
          ></textarea>
        </div>
        <button 
          type="submit" 
          className={`w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors cursor-pointer ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isLoggedIn}
        >
          Send Message
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-green-600">
          Thank you for contacting us! We'll be in touch soon.
        </p>
      )}
      {error && (
        <p className="mt-4 text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Contact;
