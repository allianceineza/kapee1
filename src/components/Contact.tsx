// Contact Component
import { useState } from "react";
import { Phone, MapPin, Mail, Send, Loader } from "lucide-react";
import electronicsSlider from '../assets/electronics-slider-1.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitMessage("Thank you for your message! I will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="text-black">
      <div className="container mx-auto">
        <div
          className="text-center mb-12 relative min-h-[500px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${electronicsSlider})`,
          }}
        >
          <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-7xl mt-12 font-bold text-white drop-shadow-lg">Contact Me</h1>
            <p className="text-lg text-white mt-4 drop-shadow-md">Get in Touch</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="contact-info">
            <h3 className="text-2xl mb-4">Let's Connect</h3>
            <p className="leading-relaxed mb-8">
              If you have a question or need help, do not hesitate to contact me. I'm here for you! Contact me for more information and support.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 p-4 bg-opacity-5 bg-white rounded-lg border border-opacity-10">
                <Phone size={24} />
                <div>
                  <strong>Name:</strong> Alliance Ineza
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-opacity-5 bg-white rounded-lg border border-opacity-10">
                <MapPin size={24} />
                <div>
                  <strong>Address:</strong> Nyarugenge, Kigali, Rwanda
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-opacity-5 bg-white rounded-lg border border-opacity-10">
                <Mail size={24} />
                <div>
                  <strong>Email:</strong>
                  <a href="mailto:alliancesgiselienze@gmail.com" className="text-black hover:underline">
                    alliancesgiselienze@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-opacity-5 bg-white p-8 rounded-lg border border-opacity-10">
            {/* Success Message */}
            {submitMessage && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {submitMessage}
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {submitError}
              </div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full p-4 border border-opacity-20 rounded-lg disabled:opacity-50"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full p-4 border border-opacity-20 rounded-lg disabled:opacity-50"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full p-4 border border-opacity-20 rounded-lg mb-4 disabled:opacity-50"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full p-4 border border-opacity-20 rounded-lg mb-4 disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg transition duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={16} className="inline-block mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} className="inline-block mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;