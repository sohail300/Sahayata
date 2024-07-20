import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  HelpCircle,
  Info,
  Download,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const ProfileOption = ({ icon, text, onClick }) => (
  <div
    className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:bg-emerald-50 cursor-pointer transition-all duration-300 ease-in-out"
    onClick={onClick}
  >
    {icon}
    <span className="ml-4 text-lg font-semibold text-emerald-600">{text}</span>
  </div>
);

function ProfileItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center">
      <Icon className="h-6 w-6 text-emerald-600 mr-3" />
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default function DistrictAdminProfile() {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName") || "John Doe";
  const mobileNumber = localStorage.getItem("mobileNumber") || "+1234567890";
  const email = localStorage.getItem("email") || "+1234567890";
  const latitude = localStorage.getItem("latitude") || "+1234567890";
  const longitude = localStorage.getItem("longitude") || "+1234567890";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-emerald-600 mb-2">
                {fullName}
              </h2>
              <ProfileItem icon={User} label="Full Name" value={fullName} />
              <ProfileItem
                icon={Phone}
                label="Mobile Number"
                value={mobileNumber}
              />
              <ProfileItem icon={Mail} label="Email" value={email} />
              <ProfileItem icon={MapPin} label="Latitude" value={latitude} />
              <ProfileItem icon={MapPin} label="Longitude" value={longitude} />
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
                  onClick={() => navigate("/districtadmin/editProfile")}
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
