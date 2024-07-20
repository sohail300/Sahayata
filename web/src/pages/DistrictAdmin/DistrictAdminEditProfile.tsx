import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, MapPin, Save, ArrowLeft } from "lucide-react";

export default function DistrictAdminEditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: localStorage.getItem("fullName") || "",
    mobileNumber: localStorage.getItem("mobileNumber") || "",
    email: localStorage.getItem("email") || "",
    latitude: localStorage.getItem("latitude") || "",
    longitude: localStorage.getItem("longitude") || "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage (in a real app, you'd send this to your backend)
    Object.entries(formData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    navigate("/admin/profile");
  };

  useEffect(() => {
    const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
      formData.email
    );
    const isValidNumber = /^\+?[1-9]\d{1,14}$/.test(formData.mobileNumber);
    const isValidLatitude = /^(-?[1-8]?\d(?:\.\d{1,6})?|90(?:\.0{1,6})?)$/.test(
      formData.latitude
    );
    const isValidLongitude =
      /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,6})?|180(?:\.0{1,6})?)$/.test(
        formData.longitude
      );
    const areAllFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    setIsButtonDisabled(
      !isValidEmail ||
        !isValidNumber ||
        !isValidLatitude ||
        !isValidLongitude ||
        !areAllFieldsFilled
    );
  }, [formData]);

  const inputFields = [
    {
      id: "fullName",
      label: "Full Name",
      type: "text",
      icon: User,
      placeholder: "John Doe",
    },
    {
      id: "mobileNumber",
      label: "Mobile Number",
      type: "tel",
      icon: Phone,
      placeholder: "+1234567890",
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      icon: Mail,
      placeholder: "you@example.com",
    },
    {
      id: "latitude",
      label: "Latitude",
      type: "text",
      icon: MapPin,
      placeholder: "0.000000",
    },
    {
      id: "longitude",
      label: "Longitude",
      type: "text",
      icon: MapPin,
      placeholder: "0.000000",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 pt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Edit Profile</h2>
              <button
                onClick={() => navigate("/admin/profile")}
                className="text-emerald-600 hover:text-emerald-700 flex items-center"
              >
                <ArrowLeft className="mr-2" size={18} />
                Back to Profile
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {inputFields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      id={field.id}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 pl-10"
                      placeholder={field.placeholder}
                      value={formData[field.id]}
                      onChange={handleChange}
                      required
                    />
                    <field.icon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>
              ))}
              <button
                type="submit"
                className={`w-full bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isButtonDisabled}
              >
                <Save className="mr-2" size={18} />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
