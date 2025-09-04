import React from 'react';
import FullBleedImage from '../components/common/FullBleedImage';

const FullBleedDemo = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <FullBleedImage 
        src="https://source.unsplash.com/random/1920x1080/?nature"
        alt="Nature"
        height="100vh"
        overlayColor="rgba(0, 0, 0, 0.4)"
        className="flex items-center justify-center text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Full Bleed Images</h1>
          <p className="text-xl mb-8">Beautiful, edge-to-edge images for your website</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </FullBleedImage>

      {/* Content Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">More Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Half Height Example</h3>
              <p className="text-gray-600 mb-6">
                This example shows a full-width image with a custom height and dark overlay.
              </p>
            </div>
            <FullBleedImage 
              src="https://source.unsplash.com/random/1920x1080/?city"
              alt="City"
              height="400px"
              overlayColor="rgba(0, 0, 0, 0.3)"
              className="rounded-lg overflow-hidden shadow-xl"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:order-2">
              <h3 className="text-2xl font-semibold mb-4">With Content Overlay</h3>
              <p className="text-gray-600 mb-6">
                Add text and buttons on top of your full-bleed images for a modern look.
              </p>
            </div>
            <div className="md:order-1 relative">
              <FullBleedImage 
                src="https://source.unsplash.com/random/1920x1080/?mountain"
                alt="Mountain"
                height="500px"
                overlayColor="rgba(0, 0, 0, 0.2)"
                className="rounded-lg overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Mountain View</h3>
                  <p className="opacity-90">Experience the beauty of nature</p>
                </div>
              </FullBleedImage>
            </div>
          </div>
        </div>
      </div>

      {/* Full Bleed Section */}
      <div className="relative">
        <FullBleedImage 
          src="https://source.unsplash.com/random/1920x1080/?ocean"
          alt="Ocean"
          height="70vh"
          overlayColor="rgba(0, 0, 0, 0.5)"
          className="flex items-center justify-center"
        >
          <div className="text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create stunning full-bleed sections with our easy-to-use component.
            </p>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </FullBleedImage>
      </div>
    </div>
  );
};

export default FullBleedDemo;
