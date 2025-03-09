import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setIsLoggedIn(true);
      setFormData(prevData => ({ ...prevData, email }));
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
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
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center py-12 px-4">
      {!isLoggedIn && <p className="mb-4 text-red-600">Please log in to continue.</p>}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-700">Contact Us</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} 
                 className="w-full border p-2 rounded focus:ring-orange-500"
                 required disabled={!isLoggedIn} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" name="email" value={formData.email} readOnly 
                 className="w-full border p-2 rounded bg-gray-100" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} 
                 className="w-full border p-2 rounded focus:ring-orange-500"
                 required disabled={!isLoggedIn} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea name="message" rows="4" value={formData.message} onChange={handleChange}
                    className="w-full border p-2 rounded focus:ring-orange-500"
                    required disabled={!isLoggedIn}></textarea>
        </div>
        <button type="submit" 
                className={`w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={!isLoggedIn}>
          Send Message
        </button>
      </form>
      {submitted && <p className="mt-4 text-green-600">Thank you! We'll get back to you soon.</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default Contact;
