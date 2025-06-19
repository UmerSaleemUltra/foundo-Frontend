import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./user-dashboard/pages/UserDashboard";
import AdminDashboard from "./admin-dashboard/pages/AdminDashboard";
import { useDispatch, useSelector } from "react-redux";
import { login } from './redux/slices/user-slice';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { get_data } from "./api"
import Signup from './user-dashboard/pages/Signup';
import Login from './user-dashboard/pages/Login';
import Order from './user-dashboard/pages/Order';
import PermissionDenied from "./user-dashboard/components/PermissionDenied"
import AdminLogin from './user-dashboard/pages/AdminLogin';
import ForgotPassword from './user-dashboard/pages/ForgotPassword';
import ResetPassword from './user-dashboard/pages/ResetPassword';
import Home from './website/Home';
import PrivacyPolicy from './website/PrivacyPolicy';
import Terms from './website/Terms';
import ScreenLoading from './website/components/ScreenLoading';
import Pricing from './website/Pricing';
import FAQPage from './website/FAQPage';
import Success from './user-dashboard/pages/Success';
import Failure from './user-dashboard/pages/Failure';
import AddonSuccess from './user-dashboard/pages/AddonSuccess';
import AddonFailure from './user-dashboard/pages/AddonFailure';
import CouponModal from './website/components/CouponModal';
import ContactPage from './website/ContactPage';
import AccessUser from './admin-dashboard/pages/AccessUser';
import AboutPage from "./website/AboutPage"
import BusinessFormation from './website/BusinessFormation';



function App() {

  const dispatch = useDispatch();
  const [screenLoading, setScreenLoading] = useState(true)
  const { isLoggedIn, user_data } = useSelector(state => state.user);
  const token = localStorage.getItem("authToken");

  const get_user = async () => {
    const current_data = await get_data("user/get-user", { headers: { "Authorization": token } });

    if (current_data?.status === true) {
      dispatch(login(current_data?.data));
    } else {
    }
  };

  useEffect(() => {
    get_user();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setScreenLoading(false)
    }, 1500);
  }, [])


  return (
    <>
      {
        screenLoading ? (
          <ScreenLoading />
        ) : (
          <div className="App">
            <Toaster position="top-right" />
            <Router>
              <Routes>

                {
                  user_data?.is_user ?
                    <Route element={<UserDashboard />} path="/dashboard/*" />
                    :
                    <>
                      <Route element={<PermissionDenied
                        type='auth'
                        title={'Login to view your Dashboard'} />} path="/dashboard/*" />
                    </>
                }

                {
                  user_data?.is_super_admin ?
                    <Route element={<AdminDashboard />} path="/admin/dashboard/*" />
                    :
                    <>
                      <Route element={<PermissionDenied
                        type='auth'
                        title={'Login to view your Dashboard'} />} path="/admin/dashboard/*" />
                    </>
                }

                <Route element={<Signup />} path="/create-account" />
                <Route element={<Login />} path="/login" />

                <Route element={<ForgotPassword />} path="/forget-password" />
                <Route element={<ResetPassword />} path="/reset-password/:token" />

                <Route element={<AdminLogin />} path="/admin/login" />
                <Route element={<AccessUser />} path="/admin/access-user" />

                <Route element={<Home />} path="/" />
                <Route element={<PrivacyPolicy />} path="/privacy-policy" />
                <Route element={<Terms />} path="/terms-and-conditions" />

                <Route element={<Pricing />} path="/pricing" />
                <Route element={<FAQPage />} path="/faq" />
                <Route element={<Order />} path="/order" />
                <Route element={<ContactPage />} path="/contact" />

                <Route element={<Success />} path="/success" />
                <Route element={<AddonSuccess />} path="/success-v2" />

                <Route element={<Failure />} path="/failure" />
                <Route element={<AddonFailure />} path="/failure-v2" />

                <Route element={<AboutPage />} path="/about" />



                {
                  user_data?.is_super_admin || user_data?.is_user ?
                    <Route element={<BusinessFormation />} path="/business-formation" />
                    :
                    <>
                      <Route element={<PermissionDenied
                        type='auth'
                        title={'Login to view your Dashboard'} />} path="/admin/dashboard/*" />
                    </>
                }

              </Routes>
            </Router>

          </div>
        )
      }
    </>
  );
}

export default App;