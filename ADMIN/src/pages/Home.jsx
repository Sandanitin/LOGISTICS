import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Array of slide data
// Image requirements for slides:
// - Recommended size: 1920x1080px
// - Format: JPG or WebP
// - Optimized for web (compressed)
// - High quality, professional medical/transportation themes

const slides = [
  {
    id: 1,
    // Replace with your image path: /images/medical-courier-hero.jpg
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    title: 'Professional Medical Courier Services',
    subtitle: 'Reliable and timely delivery of medical equipment',
    buttonText: 'Get Started',
    buttonLink: '/contact'
  },
  {
    id: 2,
    // Replace with your image path: /images/emergency-delivery.jpg
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    title: '24/7 Emergency Services',
    subtitle: 'Available around the clock for urgent medical deliveries',
    buttonText: 'Contact Now',
    buttonLink: '/contact'
  },
  {
    id: 3,
    // Replace with your image path: /images/secure-transport.jpg
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    title: 'Secure & Compliant',
    subtitle: 'HIPAA compliant handling of sensitive medical equipment',
    buttonText: 'Learn More',
    buttonLink: '/about'
  }
];

const services = [
  {
    icon: '🚚',
    title: 'Express Delivery',
    description: 'Fast and reliable transportation of medical equipment with real-time tracking',
    features: ['Same-day delivery', 'Real-time tracking', 'Secure handling']
  },
  {
    icon: '🏥',
    title: 'Hospital Services',
    description: 'Dedicated services for healthcare facilities and medical centers',
    features: ['Scheduled pickups', 'Temperature control', 'Priority handling']
  },
  {
    icon: '🔒',
    title: 'Secure Transport',
    description: 'Guaranteed security and compliance for sensitive medical items',
    features: ['Chain of custody', 'Tamper-proof packaging', '24/7 monitoring']
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="absolute inset-0">
                <img 
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50"></div>
              </div>
              
              <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-6xl mx-auto px-6 lg:px-8">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-white bg-red-600 rounded-full">
                    Trusted by 100+ Medical Facilities
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-gray-200 mb-8 max-w-lg">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to={slide.buttonLink}
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {slide.buttonText}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                    <Link 
                      to="/services"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border border-white/30 hover:bg-white/10 rounded-lg transition-all duration-300"
                    >
                      Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-12 left-0 right-0">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-white' : 'bg-white/30'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-300 rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <h3 className="text-lg font-semibold text-gray-900">Service Availability</h3>
              <p className="text-gray-600">Round-the-clock support for urgent deliveries</p>
            </div>
            <div className="text-center p-6 bg-gray-300 rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">99.9%</div>
              <h3 className="text-lg font-semibold text-gray-900">On-time Delivery</h3>
              <p className="text-gray-600">Proven track record of reliability</p>
            </div>
            <div className="text-center p-6 bg-gray-300 rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
              <h3 className="text-lg font-semibold text-gray-900">Medical Facilities</h3>
              <p className="text-gray-600">Trusted by healthcare providers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Medical Courier Solutions
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-gray-300 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="w-16 h-16 flex items-center justify-center text-3xl bg-red-50 text-red-600 rounded-xl mb-6 group-hover:bg-red-100 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <Link 
                    to="/services" 
                    className="text-red-600 font-medium inline-flex items-center hover:text-red-700 transition-colors"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 text-black py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience reliable medical courier services?</h2>
          <p className="text-xl text-black-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of healthcare providers who trust us with their medical equipment transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-red-600 bg-gray-300 hover:bg-gray-100 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Get a Free Quote
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
            <Link 
              to="tel:9137094208" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border border-white/30 hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              (913) 709-4208
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
