import { useState } from 'react';
import contactImage from '../assets/contact.jpg';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import { contactsAPI } from '../services/api';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await contactsAPI.create(formData);
      setStatus({ type: 'success', message: t.contact.form.success });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: t.contact.form.error
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{
            backgroundImage: `url(${contactImage})`,
          }}
        >
          {/* Fallback gradient if image doesn't exist */}
          <div className="absolute inset-0 bg-gradient-to-br from-sand-beige/80 via-sand-beige/60 to-sand-beige/80" />
        </div>

        {/* Clean Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand-beige/75 via-sand-beige/60 to-sand-beige/80" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="mb-6">
            <span className="inline-block text-sm md:text-base text-olive-green/80 font-light tracking-[0.2em] uppercase mb-4">
              {t.contact.subtitle}
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-normal text-olive-green mb-8 leading-tight"
            style={{
              fontFamily: language === 'ar' ? "'Zain', serif" : "'Playfair Display', serif",
              fontWeight: language === 'ar' ? 600 : 400,
              letterSpacing: language === 'ar' ? '0.01em' : '-0.02em',
              textShadow: '0 2px 20px rgba(101, 132, 111, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            {t.contact.title}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-olive-green/40 to-transparent mx-auto mb-8"></div>
          <p 
            className="text-xl md:text-2xl text-warm-gray/95 max-w-3xl mx-auto leading-relaxed font-light"
            style={{
              fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
              textShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            {t.contact.description}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-olive-green/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ${language === 'ar' ? 'lg:grid-flow-dense' : ''}`}>
          {/* Contact Form */}
          <div className={`relative ${language === 'ar' ? 'lg:col-start-2' : ''}`}>
            <div className="bg-white rounded-[32px] p-8 md:p-10 lg:p-12 shadow-sm watercolor-shadow organic-border border border-natural-wood/20 relative">

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-olive-green mb-3"
                    style={{
                      fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                    }}
                  >
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-sand-beige/50 border border-natural-wood/20 rounded-full focus:outline-none focus:ring-2 focus:ring-olive-green/30 focus:border-olive-green/40 transition-all duration-300 text-warm-gray placeholder-warm-gray/50 hover:border-olive-green/30"
                    style={{
                      fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                    }}
                    placeholder={t.contact.form.name}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-olive-green mb-3"
                    style={{
                      fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                    }}
                  >
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-sand-beige/50 border border-natural-wood/20 rounded-full focus:outline-none focus:ring-2 focus:ring-olive-green/30 focus:border-olive-green/40 transition-all duration-300 text-warm-gray placeholder-warm-gray/50 hover:border-olive-green/30"
                    style={{
                      fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                    }}
                    placeholder={t.contact.form.email}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-olive-green mb-3"
                    style={{
                      fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                    }}
                  >
                    {t.contact.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-sand-beige/50 border border-natural-wood/20 rounded-full focus:outline-none focus:ring-2 focus:ring-olive-green/30 focus:border-olive-green/40 transition-all duration-300 text-warm-gray placeholder-warm-gray/50 hover:border-olive-green/30"
                    style={{
                      fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                    }}
                    placeholder={t.contact.form.phone}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-olive-green mb-3"
                    style={{
                      fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                    }}
                  >
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-6 py-4 bg-sand-beige/50 border border-natural-wood/20 rounded-3xl focus:outline-none focus:ring-2 focus:ring-olive-green/30 focus:border-olive-green/40 transition-all duration-300 text-warm-gray placeholder-warm-gray/50 resize-none hover:border-olive-green/30"
                    style={{
                      fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                    }}
                    placeholder={t.contact.form.message}
                  ></textarea>
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded-2xl ${
                      status.type === 'success'
                        ? 'bg-olive-green/10 text-olive-green border border-olive-green/20'
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}
                  >
                    <p className="text-sm font-medium">{status.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group px-8 py-4 bg-olive-green text-sand-beige rounded-full font-medium hover:bg-olive-green/95 transition-all duration-500 shadow-lg hover:shadow-2xl hover-lift text-base tracking-wide relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                  }}
                >
                  <span className="relative z-10">
                    {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                  </span>
                  <span
                    className={`absolute inset-0 bg-gradient-to-r from-olive-green/0 via-white/10 to-olive-green/0 ${
                      language === 'ar' ? 'translate-x-[100%] group-hover:translate-x-[-100%]' : 'translate-x-[-100%] group-hover:translate-x-[100%]'
                    } transition-transform duration-1000`}
                  >                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`space-y-8 ${language === 'ar' ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div 
              className={`bg-white rounded-[32px] p-8 md:p-10 lg:p-12 shadow-sm watercolor-shadow organic-border border border-natural-wood/20 relative`}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
                <h3
                  className="text-2xl md:text-3xl font-normal text-olive-green mb-10"
                  style={{
                    fontFamily: language === 'ar' ? "'Zain', serif" : "'Playfair Display', serif",
                    fontWeight: language === 'ar' ? 600 : 400,
                    textAlign: language === 'ar' ? 'right' : 'left',
                  }}
                >
                  {t.contact.info.title}
                </h3>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  {language === 'ar' ? (
                    <>
                      <div className="flex-1" style={{ textAlign: 'right' }}>
                        <p
                          className="text-sm font-medium text-olive-green mb-1"
                          style={{
                            fontFamily: "'Alexandria', sans-serif",
                          }}
                        >
                          {t.contact.info.address.label}
                        </p>
                        <p
                          className="text-warm-gray/80 font-light"
                          style={{
                            fontFamily: "'Alexandria', sans-serif",
                          }}
                        >
                          {t.contact.info.address.value}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive-green/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-olive-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive-green/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-olive-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1" style={{ textAlign: 'left' }}>
                        <p
                          className="text-sm font-medium text-olive-green mb-1"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {t.contact.info.address.label}
                        </p>
                        <p
                          className="text-warm-gray/80 font-light"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {t.contact.info.address.value}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  {language === 'ar' ? (
                    <>
                      <div className="flex-1" style={{ textAlign: 'right' }}>
                        <p
                          className="text-sm font-medium text-olive-green mb-1"
                          style={{
                            fontFamily: "'Alexandria', sans-serif",
                          }}
                        >
                          {t.contact.info.phone.label}
                        </p>
                        <a
                          href={`tel:${t.contact.info.phone.value.replace(/\s/g, '')}`}
                          className="text-warm-gray/80 font-light hover:text-olive-green transition-colors duration-300"
                          style={{
                            fontFamily: "'Alexandria', sans-serif",
                          }}
                        >
                          {t.contact.info.phone.value}
                        </a>
                      </div>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive-green/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-olive-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive-green/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-olive-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1" style={{ textAlign: 'left' }}>
                        <p
                          className="text-sm font-medium text-olive-green mb-1"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {t.contact.info.phone.label}
                        </p>
                        <a
                          href={`tel:${t.contact.info.phone.value.replace(/\s/g, '')}`}
                          className="text-warm-gray/80 font-light hover:text-olive-green transition-colors duration-300"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {t.contact.info.phone.value}
                        </a>
                      </div>
                    </>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  {language === 'ar' ? (
                    <>
                      <div className="flex-1" style={{ textAlign: 'right' }}>
                        <p
                          className="text-sm font-medium text-olive-green mb-1"
                          style={{
                            fontFamily: "'Alexandria', sans-serif",
                          }}
                        >
                          {t.contact.info.email.label}
                        </p>
                        <a
                          href={`mailto:${t.contact.info.email.value}`}
                          className="text-warm-gray/80 font-light hover:text-olive-green transition-colors duration-300"
                          style={{
                            fontFamily: "'Alexandria', sans-serif",
                          }}
                        >
                          {t.contact.info.email.value}
                        </a>
                      </div>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive-green/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-olive-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive-green/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-olive-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1" style={{ textAlign: 'left' }}>
                        <p
                          className="text-sm font-medium text-olive-green mb-1"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {t.contact.info.email.label}
                        </p>
                        <a
                          href={`mailto:${t.contact.info.email.value}`}
                          className="text-warm-gray/80 font-light hover:text-olive-green transition-colors duration-300"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {t.contact.info.email.value}
                        </a>
                      </div>
                    </>
                  )}
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  {language === 'ar' ? (
                    <>
                      <div className="flex-1" style={{ textAlign: 'right' }}>
                        <p
                          className="text-sm font-medium text-olive-green mb-2"
                          style={{
                            fontFamily: "'Alexandria', sans-serif",
                          }}
                        >
                          {t.contact.info.hours.label}
                        </p>
                        <div className="space-y-1">
                          <p
                            className="text-warm-gray/80 font-light text-sm"
                            style={{
                              fontFamily: "'Alexandria', sans-serif",
                            }}
                          >
                            {t.contact.info.hours.weekdays}
                          </p>
                          <p
                            className="text-warm-gray/80 font-light text-sm"
                            style={{
                              fontFamily: "'Alexandria', sans-serif",
                            }}
                          >
                            {t.contact.info.hours.weekend}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive-green/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-olive-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive-green/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-olive-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1" style={{ textAlign: 'left' }}>
                        <p
                          className="text-sm font-medium text-olive-green mb-2"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {t.contact.info.hours.label}
                        </p>
                        <div className="space-y-1">
                          <p
                            className="text-warm-gray/80 font-light text-sm"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                            }}
                          >
                            {t.contact.info.hours.weekdays}
                          </p>
                          <p
                            className="text-warm-gray/80 font-light text-sm"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                            }}
                          >
                            {t.contact.info.hours.weekend}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map - Full Width */}
        <div className="mt-12">
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm watercolor-shadow organic-border border border-natural-wood/20 h-96 md:h-[500px] relative">
            <iframe
              src="https://www.google.com/maps?q=Sara+Café+Jeddah+Saudi+Arabia&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sara Café Location"
            ></iframe>
            <div className={`absolute bottom-4 ${language === 'ar' ? 'left-4' : 'right-4'}`}>
              <a
                href="https://maps.app.goo.gl/92ELgcRqENWaQ8GW7"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/95 backdrop-blur-sm text-olive-green text-sm font-medium rounded-full border border-olive-green/20 hover:bg-white hover:border-olive-green/40 transition-all duration-300 shadow-md inline-flex items-center gap-2"
                style={{
                  fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {language === 'ar' ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
              </a>
            </div>
          </div>
        </div>

          {/* Decorative Elements */}
          <div className="mt-20 flex justify-center">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-olive-green/30 to-transparent"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

