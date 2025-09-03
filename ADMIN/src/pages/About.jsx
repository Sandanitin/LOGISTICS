import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            Your Trusted Partner in Medical Courier Services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Medical Courier Pros</h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  A&A Medical is not just a courier service, we are much more. With 20 years in the medical device industry, 
                  we understand the needs of our customers and provide a comprehensive solution to your courier needs.
                </p>
                <p>
                  We hire only the best and most professional couriers with industry knowledge to help assure nothing but 
                  the best overall service to our customers.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Commitment</h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  We put our customers first. Since 2010, the cornerstone of our business has been our relationship with our customers. 
                  We believe that when it comes to serving your medical supply needs, our work should speak for itself.
                </p>
                <p>
                  Our trained and reliable drivers are here to take care of your courier needs and let you focus on your core business goals.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Leadership</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex items-center justify-center">
                    <img 
                      src="images/owner.jpg" 
                      alt="Anower Hossen" 
                      className="w-full max-w-xs h-auto rounded-lg object-cover shadow-md"
                      style={{ minHeight: '250px' }}
                    />
                  </div>
                  <div className="md:w-2/3 text-gray-600 text-lg">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Anower Hossen</h3>
                    <p className="mb-4">
                      With extensive experience in the medical courier industry, Anower Hossen brings a wealth of knowledge and expertise to our team. His deep understanding of medical logistics and supply chain management has been instrumental in shaping our company's success.
                    </p>
                    <p className="mb-4">
                      Anower is known for his commitment to excellence and has built a reputation for reliability and professionalism in the medical courier sector. His leadership has been pivotal in assembling and mentoring a team of highly skilled and educated drivers who share his dedication to providing exceptional service.
                    </p>
                    <p>
                      Under Anower's guidance, our team maintains the highest standards of service, ensuring that medical supplies and specimens are handled with the utmost care and delivered with precision and efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <a href="tel:9132037254" className="hover:text-blue-600 transition-colors">(913) 203-7254</a>
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Lenexa, KS, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to experience our service?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about how we can assist with your medical courier needs.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
      
      {/* Footer Note */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center text-sm">
          <p> {new Date().getFullYear()} by A&A Medical. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
