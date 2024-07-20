import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, HelpCircle, Info, Download } from "lucide-react";

const ProfileOption = ({ icon, text, onClick }) => (
  <div
    className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:bg-emerald-50 cursor-pointer transition-all duration-300 ease-in-out"
    onClick={onClick}
  >
    {icon}
    <span className="ml-4 text-lg font-semibold text-emerald-600">{text}</span>
  </div>
);

export default function AdminProfile() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const fullName = localStorage.getItem("fullName") || "John Doe";
  const mobileNumber = localStorage.getItem("mobileNumber") || "+1234567890";

  useEffect(() => {
    const savedImage = localStorage.getItem("selectedImage");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      localStorage.setItem("selectedImage", imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-orange-500">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User size={64} className="text-gray-400" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-emerald-600 mb-2">
                {fullName}
              </h2>
              <p className="text-lg text-gray-600">{mobileNumber}</p>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-orange-500 mb-6">
                Profile Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileOption
                  icon={<User className="text-emerald-500" size={24} />}
                  text="Edit Profile"
                  onClick={() => navigate("/editProfile")}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-orange-500 mb-6">
                Help & Support
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileOption
                  icon={<HelpCircle className="text-emerald-500" size={24} />}
                  text="FAQ"
                  onClick={() => navigate("/faq")}
                />
                <ProfileOption
                  icon={<Info className="text-emerald-500" size={24} />}
                  text="About Us"
                  onClick={() => navigate("/about")}
                />
                <ProfileOption
                  icon={<Download className="text-emerald-500" size={24} />}
                  text="Download App"
                  onClick={() => {
                    /* Add download logic */
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
