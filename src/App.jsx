import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loader from "./Components/Loader";
import AboutUs from "./Components/AboutUs";
import BookAnAppointment from "./Components/BookAnAppointment";
import DoctorLogin from "./Components/DoctorLogin";
import PatientLogin from "./Components/PatientLogin";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ContactUs from "./Components/ContactUs";
import ChatBotButton from "./Components/ChatBotButton";
import PageNotFound from "./Components/PageNotFound";
import DoctorDashboard from "./Components/DoctorDashboard";
import PatientDashboard from "../src/Patient/PatientDashboard";
import PatientForgotPass from "./Components/PatientForgotPass";
import PatientNavbar from "./Components/PatientNavbar";
import SchedulePage from "./Components/SchedulePage";
import CancellationRefundPolicies from "./Components/Razorpay/CancellationRefunPolicies";
import PrivacyPolicy from "./Components/Razorpay/PrivacyPolicy";
import ShippingDelivery from "./Components/Razorpay/ShippingDelivery";
import TermsConditions from "./Components/Razorpay/TermsConditions";
// import PaymentPage from "./Components/PaymentPage";
import Prescription from "./Components/PDF/Prescription";
import Payment from "./Components/Payment";
import PatientNotLoggedIn from "./Components/PatientNotLoggedIn";
import VideoCall from "./Components/VideoCall";
import "./App.css";
import PaymentSuccess from "./Components/PaymentSuccess";
import SelectDiseaseType from "./Components/SelectDiseaseType";
import UpcomingApp from "./Components/UpcomingApp";
import PatientHistory from "./Components/PatientHistory";
import DoctorNavbar from "./Components/DoctorDashboard/DoctorNavbar";
import AllPatientProfile from "./Components/DoctorDashboard/AllPatientProfile";
import PatientProfile from "./Components/PatientProfile";
import ManageAppointments from "./Components/DoctorDashboard/ManageAppointments";
import PrescribeMedicine from "./Components/PrescribeMedicine";
import EditPatientProfile from "./Components/EditPatientProfile";
import DEditPProfile from "./Components/DoctorDashboard/DEditPProfile";
import DPProfile from "./Components/DoctorDashboard/DPProfile";
import DUpcoming from "./Components/DoctorDashboard/DUpcoming";
import PatientPrescription from "./Components/DoctorDashboard/PatientPrescription";
import FinalReport from "./Components/DoctorDashboard/FinalReport";
import ManageMulAppointment from "./Components/DoctorDashboard/ManageMulAppointment";
import Dates from "./Components/Calendar/Dates";
import DonorForgotPass from "./Components/DonorForgotPass";
import AdminLogin from "./Admin/AdminLogin";
import AdminForgotPass from "./Components/AdminForgotPass";
import EditBookAnAppointment from "./Components/EditBookAnAppointment";
import DonationPage from "./Components/Donations/DonationPage";
import DonorDashboard from "./Donor/DonorDashboard";
import DonorLogin from "./Components/DonorLogin";
import AdminDashboard from './Admin/AdminDasboard';
import SubAdminLogin from "./Components/SubAdminLogin";
import SubAdminDashboard from './SubAdmin/SubAdminDashboard'
import DoctorForgotPass from "./Components/DoctorForgotPass";
import SubAdminForgotPass from "./Components/SubAdminForgotPass";
import AllAppointment from "./Patient/AllAppointment";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedInAdmin, setLoggedInAdmin] = useState({});
  const [loggedInDoctor, setLoggedInDoctor] = useState({});
  const [loggedInDonor, setLoggedInDonor] = useState({});
  const [loggedInSubAdmin, setLoggedInSubAdmin] = useState({});

  useEffect(() => {
    const loadDetails = (key, setter) => {
      const storedDetails = localStorage.getItem(key);
      if (storedDetails) {
        setter(JSON.parse(storedDetails));
      }
    };
  
    const checkTokenExpiration = (details, key) => {
      if (details?.isloggedIn) {
        try {
          const decoded = jwtDecode(details.jwt);
          const currentTime = Math.floor(Date.now() / 1000);
          if (decoded.exp < currentTime) {
            console.warn(`${key} token has expired.`);
            localStorage.removeItem(key);
          }
        } catch (error) {
          console.error(`Error decoding ${key} token:`, error);
        }
      }
    };
  
    const keys = [
      { key: "userDetails", setter: setLoggedInUser },
      { key: "doctorDetails", setter: setLoggedInDoctor },
      { key: "adminDetails", setter: setLoggedInAdmin },
      { key: "subAdminDetails", setter: setLoggedInSubAdmin },
      { key: "donorDetails", setter: setLoggedInDonor },
    ];
  
    keys.forEach(({ key, setter }) => {
      const details = JSON.parse(localStorage.getItem(key));
      loadDetails(key, setter);
      checkTokenExpiration(details, key);
    });
  
    const intervalId = setInterval(() => {
      keys.forEach(({ key }) => {
        const details = JSON.parse(localStorage.getItem(key));
        checkTokenExpiration(details, key);
      });
    }, 60000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <Router>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/dates" element={<Dates />} />

          <Route
            path="/donate"
            element={
              <>
                <Navbar />
                <DonationPage />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />

          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <Home />

                <Footer />
              </>
            }
          />

          <Route path="/pres/:bookingId" element={<Prescription />} />

{/* History page starts */}
<Route
            path="/pApp"
            element={
              loggedInUser.isloggedIn  ? (
                <>
                  <PatientNavbar />
                  <AllAppointment />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <PatientLogin />
                  <Footer />
                </>
              )
            }
          />
{/* History page ends */}



          <Route
            path="/patientlogin"
            element={
              loggedInUser.isloggedIn  ? (
                <>
                  <PatientNavbar />
                  <PatientDashboard />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <PatientLogin />
                  <Footer />
                </>
              )
            }
          />


<Route
            path="/doctorlogin"
            element={
              loggedInDoctor.isloggedIn?(
                <>
                  <DoctorNavbar />
                  <DoctorDashboard />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          />





<Route
            path="/donorlogin"
            element={
              loggedInDonor.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <DonorDashboard />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DonorLogin/>
                  <Footer />
                </>
              )
            }
          />



<Route
            path="/adminlogin"
            element={
              loggedInAdmin.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <AdminDashboard />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <AdminLogin />
                  <Footer />
                </>
              )
            }
          />


<Route
            path="/subadminlogin"
            element={
              loggedInSubAdmin.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <SubAdminDashboard />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <SubAdminLogin />
                  <Footer />
                </>
              )
            }
          />


{/* all login pages ends here */}

          <Route
            path="/patientforgotPass"
            element={
              <>
                <Navbar />
                <PatientForgotPass />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />

          <Route
            path="/donorforgotPass"
            element={
              <>
                <Navbar />
                <DonorForgotPass />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />

<Route
            path="/doctorforgotPass"
            element={
              <>
                <Navbar />
                <DoctorForgotPass />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />


<Route
            path="/adminforgotPass"
            element={
              <>
                <Navbar />
                <AdminForgotPass />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />

<Route
            path="/subAdminforgotPass"
            element={
              <>
                <Navbar />
                <SubAdminForgotPass />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />


          {/* all admin routes below */}

          <Route
            path="/admin"
            element={
              loggedInAdmin.isLoggedInlo ? (
                <>
                  <DoctorNavbar />
                  <DoctorDashboard />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <AdminLogin />
                  <Footer />
                </>
              )
            }
          />

         

          {/* all the dcotors routes below */}
     

          {/* <Route
            path="/allpatienthistory/:patientId"
            element={
              loggedInDoctor.isLoggedIn ? (
                <>
                  <DoctorNavbar />
                  <DoctorDashboard />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/allpatientprofile"
            element={
              loggedInDoctor.isLoggedIn ? (
                <>
                  <DoctorNavbar />
                  <AllPatientProfile />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/PatientPres"
            element={
              loggedInDoctor.isLoggedIn ? (
                <>
                  <DoctorNavbar />
                  <PatientPrescription />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/DpatientprofileEdit/:patientEmail"
            element={
              loggedInDoctor.isLoggedIn ? (
                <>
                  <DoctorNavbar />
                  <DEditPProfile />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/Dpatientprofile/:patientEmail"
            element={
              loggedInDoctor.isLoggedIn ? (
                <>
                  <DoctorNavbar />
                  <DPProfile />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/manageAppoint"
            element={
              loggedInDoctor.isLoggedIn ? (
                <>
                  <DoctorNavbar />
                  <ManageAppointments />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/manageMulAppoint"
            element={
              loggedInDoctor.isLoggedIn ? (
                <>
                  <DoctorNavbar />
                  <ManageMulAppointment />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/Dappointments"
            element={
              loggedInDoctor.isLoggedIn ? (
                <>
                  <DoctorNavbar />
                  <DUpcoming />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/prescriptions"
            element={
              loggedInDoctor.isLoggedIn ? (
                <>
                  <DoctorNavbar />
                  <PrescribeMedicine />
                  <Footer />
                </>
              ) : (
                <>
                  <Navbar />
                  <DoctorLogin />
                  <Footer />
                </>
              )
            }
          /> */}

          <Route
            path="/aboutus"
            element={
              <>
                <Navbar />
                <AboutUs />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />
          <Route
            path="/contactus"
            element={
              <>
                <Navbar />
                <ContactUs />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />

          

          <Route
            path="/bookAp"
            element={
              loggedInUser.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <BookAnAppointment />
                  {/* <ChatBotButton /> */}
                  <Footer />
                </>
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />

          <Route
            path="/admin/bookAp"
            element={
              loggedInAdmin.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <EditBookAnAppointment />
                  <Footer />
                </>
              ) : (
              <>
    <Navbar/>
<AdminLogin />
    <Footer/>
              </>
               
              )
            }
          />

          <Route
            path="/patientprofile"
            element={
              loggedInUser.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <PatientProfile />
                  <Footer />
                </>
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />

          <Route
            path="/editpatientprofile"
            element={
              loggedInUser.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <EditPatientProfile />
                  <Footer />
                </>
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />

          <Route
            path="/selectDis"
            element={
              loggedInUser.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <SelectDiseaseType />
                  <Footer />
                </>
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />
          <Route
            path="/history"
            element={
              loggedInUser.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <PatientHistory />
                  <Footer />
                </>
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />
          <Route
            path="/appointments"
            element={
              loggedInUser.isloggedIn ? (
                <>
                  <PatientNavbar />
                  <UpcomingApp />
                  <Footer />
                </>
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />
          <Route
            path="/finalreport"
            element={
              loggedInUser.isloggedIn ? <FinalReport /> : <PatientNotLoggedIn />
            }
          />
          <Route
            path="/payment"
            element={
              loggedInUser.isloggedIn ? <Payment /> : <PatientNotLoggedIn />
            }
          />
          <Route
            path="/payment-success"
            element={
              loggedInUser.isloggedIn ? (
                <PaymentSuccess />
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />
          {/* <Route
            path="/bookappointment"
            element={
              <>
                <Navbar />
                <BookAnAppointment />
                <ChatBotButton />
                <Footer />
              </>
            }
          /> */}
          <Route
            path="/schedulepage"
            element={
              loggedInUser.isloggedIn ? (
                <SchedulePage />
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />
          <Route
            path="/cancel"
            element={
              <>
                <Navbar />
                <CancellationRefundPolicies />
                <Footer />
              </>
            }
          />
          <Route
            path="/privacy"
            element={
              <>
                <Navbar />
                <PrivacyPolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/shipping"
            element={
              <>
                <Navbar />
                <ShippingDelivery />
                <Footer />
              </>
            }
          />
          <Route
            path="/terms"
            element={
              <>
                <Navbar />
                <TermsConditions />
                <Footer />
              </>
            }
          />
          <Route path="/videocall" element={<VideoCall />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <PageNotFound />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
