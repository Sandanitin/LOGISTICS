import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: '💊',
      title: 'Medical Implants and Instruments',
      description: 'We specialize in delivering medical instruments and implants to hospitals, surgery centers, and healthcare facilities. Our commitment to excellence ensures that medical professionals have the reliable resources they need to provide exceptional care. Trust us to your healthcare needs with precision and efficiency.'
    },
    {
      icon: '🧪',
      title: 'Lab Samples',
      description: 'At our company, we prioritize the safe and effective delivery of lab samples. Our dedicated team ensures that each sample is handled with care and transported securely to meet your needs. Trust us to deliver quality service and peace of mind every time.'
    },
    {
      icon: '🏥',
      title: 'Pharmaceuticals',
      description: 'At AA Medical, we are dedicated to delivering essential pharmaceuticals to patients and pharmacies throughout the Midwest. Our commitment to timely and reliable service ensures that you receive the medications you need, when you need them. Trust us to support your health and well-being with our efficient solutions.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            Comprehensive Medical Courier Solutions You Can Trust
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="p-8 flex-grow">
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Curious to learn more about our services?</h2>
            <p className="text-xl text-gray-600 mb-8">
              We are waiting to get you started with AA Medical. Get in touch with us today.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Experts You Can Rely On</h3>
            
            <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8">
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:9132037254" className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                  (913) 203-7254
                </a>
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-lg text-gray-700">Lenexa, KS, USA</span>
              </div>
            </div>

            <div className="mt-12">
              <Link 
                to="/contact" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
