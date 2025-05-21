import React from 'react';
import { XCircle, Clock, TrendingDown, Users } from 'lucide-react';

const PainPoints: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Wave SVG at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,53.3C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Still struggling to grow online?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            You're working harder than ever, but the results aren't matching your effort.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start">
                <XCircle className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700">
                  Spending on ads but barely seeing any conversions or real leads
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700">
                  Too busy handling day-to-day tasks to focus on strategic growth
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start">
                <TrendingDown className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700">
                  Website visitors leave without taking action or making contact
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start">
                <Users className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700">
                  Watching competitors grow while you're stuck in the same place
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-semibold text-gray-900">
              You deserve better. Let's fix that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;