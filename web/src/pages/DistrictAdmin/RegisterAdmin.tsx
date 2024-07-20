import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, Lock, MapPin, ArrowRight } from "lucide-react";

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    latitude: "",
    longitude: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    navigate("/admin/homepage");
  };

  useEffect(() => {
    const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
      formData.email
    );
    const isPasswordValid = formData.password.length >= 7;
    const areAllFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    setIsButtonDisabled(
      !isValidEmail || !isPasswordValid || !areAllFieldsFilled
    );
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col justify-center items-center p-4 pt-24 pb-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">Sahayta</h1>
          <p className="text-emerald-600 mt-2">Register Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              id: "name",
              label: "Full Name",
              type: "text",
              icon: User,
              placeholder: "John Doe",
            },
            {
              id: "number",
              label: "Phone Number",
              type: "tel",
              icon: Phone,
              placeholder: "+1234567890",
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              icon: Lock,
              placeholder: "••••••••",
            },
            {
              id: "latitude",
              label: "Latitude",
              type: "number",
              icon: MapPin,
              placeholder: "0.000000",
            },
            {
              id: "longitude",
              label: "Longitude",
              type: "number",
              icon: MapPin,
              placeholder: "0.000000",
            },
          ].map((field) => (
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
            Register
            <ArrowRight className="ml-2" size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
