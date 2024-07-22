import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginAs from "./pages/LoginAs";
import DistrictAdminLogin from "./pages/DistrictAdmin/DistrictAdminLogin";
import AdminLogin from "./pages/Admin/AdminLogin";
import DistrictAdminHomepage from "./pages/DistrictAdmin/DistrictAdminHomepage";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import AdminSolvedCases from "./pages/Admin/AdminSolvedCases";
import AdminEmergencyCases from "./pages/Admin/AdminEmergencyCases";
import AdminNormalCases from "./pages/Admin/AdminNormalCases";
import RegisterAdmin from "./pages/DistrictAdmin/RegisterAdmin";
import DistrictAdminProfile from "./pages/DistrictAdmin/DistrictAdminProfile";
import AdminProfile from "./pages/Admin/AdminProfile";
import DistrictAdminEditProfile from "./pages/DistrictAdmin/DistrictAdminEditProfile";
import ForgotPassword from "./pages/DistrictAdmin/ForgotPassword";
import ResetPassword from "./pages/DistrictAdmin/ResetPassword";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginAs />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/homepage" element={<AdminHomepage />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/solvedCases" element={<AdminSolvedCases />} />
        <Route path="/admin/emergencyCases" element={<AdminEmergencyCases />} />
        <Route path="/admin/normalCases" element={<AdminNormalCases />} />

        <Route path="/districtadmin/login" element={<DistrictAdminLogin />} />
        <Route
          path="/districtadmin/homepage"
          element={<DistrictAdminHomepage />}
        />
        <Route
          path="/districtadmin/profile"
          element={<DistrictAdminProfile />}
        />
        <Route
          path="/districtadmin/editProfile"
          element={<DistrictAdminEditProfile />}
        />
        <Route
          path="/districtadmin/solvedCases"
          element={<AdminSolvedCases />}
        />
        <Route
          path="/districtadmin/emergencyCases"
          element={<AdminEmergencyCases />}
        />
        <Route
          path="/districtadmin/normalCases"
          element={<AdminNormalCases />}
        />
        <Route
          path="/districtadmin/registerAdmin"
          element={<RegisterAdmin />}
        />
        <Route
          path="/districtadmin/forgotpassword"
          element={<ForgotPassword />}
        />
        <Route
          path="/districtadmin/resetpassword/:token"
          element={<ResetPassword />}
        />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
