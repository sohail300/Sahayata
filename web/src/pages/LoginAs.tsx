import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Building } from "lucide-react";

export default function LoginAs() {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/admin/login");
  };

  const handleDistrictAdmin = () => {
    navigate("/districtadmin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">Sahayta</h1>
          <p className="text-emerald-600">Choose your login type</p>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleAdmin}
            className="w-full bg-white hover:bg-emerald-50 text-emerald-800 font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex items-center justify-between group"
          >
            <div className="flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3 text-emerald-600" />
              <span>Admin Login</span>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={handleDistrictAdmin}
            className="w-full bg-white hover:bg-emerald-50 text-emerald-800 font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex items-center justify-between group"
          >
            <div className="flex items-center">
              <Building className="w-6 h-6 mr-3 text-emerald-600" />
              <span>District Admin Login</span>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
