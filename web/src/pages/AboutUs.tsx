import { Info } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col pt-16">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-orange-500 mb-2">
              About Us
            </h1>
            <p className="text-emerald-600">
              Discover the mission behind Sahayta
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
              <img src="./logo.png" alt="logo" className="w-48 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
                  What is Sahayta?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sahayta is an innovative platform designed to streamline
                  emergency response and enhance community safety. Our mission
                  is to connect those in need with immediate assistance,
                  leveraging cutting-edge technology to save lives and protect
                  communities.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Through our user-friendly interface and advanced algorithms,
                  we empower both citizens and first responders to act swiftly
                  and efficiently in crisis situations. Sahayta stands as a
                  beacon of hope, fostering a safer world for all.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
              Our Core Values
            </h2>
            <ul className="space-y-4">
              {[
                "Swift Response: Every second counts in emergencies",
                "Community Empowerment: Enabling citizens to help one another",
                "Technological Innovation: Leveraging the latest advancements for safety",
                "Accessibility: Ensuring our service is available to all",
              ].map((value, index) => (
                <li key={index} className="flex items-start">
                  <Info className="w-6 h-6 mr-3 text-orange-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-white text-emerald-600 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Sahayta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
