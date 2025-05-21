import React from 'react';
import { XCircle, Clock, TrendingDown, Users } from 'lucide-react';

const PainPoints: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
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
            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 shadow-md transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-white rounded-full p-2 mr-4 flex-shrink-0">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-white text-lg font-semibold">
                  Spending on ads but barely seeing any conversions or real leads
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 shadow-md transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-white rounded-full p-2 mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-white text-lg font-semibold">
                  Too busy handling day-to-day tasks to focus on strategic growth
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 shadow-md transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-white rounded-full p-2 mr-4 flex-shrink-0">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-white text-lg font-semibold">
                  Website visitors leave without taking action or making contact
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 shadow-md transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-white rounded-full p-2 mr-4 flex-shrink-0">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-white text-lg font-semibold">
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