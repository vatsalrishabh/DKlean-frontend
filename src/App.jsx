import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loader from "./Components/Loader";
import AboutUs from "./Components/AboutUs";
// import BookAnAppointment from "./Components/BookAnAppointment";
import DoctorLogin from "./Components/DoctorLogin";
import PatientLogin from "./Components/PatientLogin";
import Home from "./Components/Home";
// import Navbar from "./Components/Navbar";
import Navbar from "./Components/Navbar/Navbar";
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
// import DoctorNavbar from "./Components/DoctorDashboard/DoctorNavbar";
// import AllPatientProfile from "./Components/DoctorDashboard/AllPatientProfile";
// import PatientProfile from "./Components/PatientProfile";
// import ManageAppointments from "./Components/DoctorDashboard/ManageAppointments";
// import PrescribeMedicine from "./Components/PrescribeMedicine";
import EditPatientProfile from "./Components/EditPatientProfile";
// import DEditPProfile from "./Components/DoctorDashboard/DEditPProfile";
// import DPProfile from "./Components/DoctorDashboard/DPProfile";
// import DUpcoming from "./Components/DoctorDashboard/DUpcoming";
// import PatientPrescription from "./Components/DoctorDashboard/PatientPrescription";
import FinalReport from "./Components/DoctorDashboard/FinalReport";
// import ManageMulAppointment from "./Components/DoctorDashboard/ManageMulAppointment";
import Dates from "./Components/Calendar/Dates";
import DonorForgotPass from "./Components/DonorForgotPass";
import AdminLogin from "./Admin/AdminLogin";
import AdminForgotPass from "./Components/AdminForgotPass";
// import EditBookAnAppointment from "./Components/EditBookAnAppointment";
import DonationPage from "./Components/Donations/DonationPage";
import DonorDashboard from "./Donor/DonorDashboard";
import DonorLogin from "./Components/DonorLogin";
import AdminDashboard from "./Admin/AdminDasboard";
// import SubAdminLogin from "./Components/SubAdminLogin";
// import SubAdminDashboard from "./SubAdmin/SubAdminDashboard";
import DoctorForgotPass from "./Components/DoctorForgotPass";
import SubAdminForgotPass from "./Components/SubAdminForgotPass";
// import AllAppointment from "./Patient/AllAppointment";
import Testimony from "./Components/Testimony/Testimony";
import HomeSmall from "./Components/HomeSmall";
import DoctorSlider from "./Components/DoctorSlider";
import Professional from "./Components/Professional";
import PricingAndCart from "./PricingAndCart/PricingAndCart";
// import PatientDashboardModern from "./Patient/PatientDashboardModern";
import PatientDash from "./Patient/PatientDash";
import PaymentPage from "./PaymentPage/PaymentPage";
import PositionPractice from "./Components/PositionPractice";
import PatientBookAnApp from "./Patient/PatientBookAnApp";
import Services from "./Components/Services";
import Gallery from "./Components/Gallery";
import Slider from "./Components/Slider";
import Diagnosis from "./ServicesCategory/Diagnosis";
import Neurology from "./ServicesCategory/Neurology";
import Rehabilitation from "./ServicesCategory/Rehabilitation";
import Cardiology from "./ServicesCategory/Cardiology";
import Psychiatry from "./ServicesCategory/Psychiatry";
import Physiotherapy from "./ServicesCategory/Physiotherapy";
import DonationReceipt from "./Components/Donations/DonationReceipt";
import SpeedDiall from "./Components/SpeedDial/SpeedDiall";

// home images 
import img from "./assets/home/bgone.jpeg"
import imgone from "./assets/home/bgtwo.jpeg"

// contact-us images
import contactone from "./assets/home/contactone.jpeg";

//donate and /donorlogin
import donateone from "./assets/home/donateone.png"


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
          // console.log(decoded.exp + "sdf" + currentTime);
          if (decoded.exp < currentTime) {
            console.warn(`${key} token has expired.`);
            localStorage.removeItem(key);
            location.reload();
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
    <SpeedDiall/>      {/* speed dial  */}
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/dates" element={<Dates />} />



          <Route
            path="/donate"
            element={
              <>
                <Navbar userType="donorDetails" />
                <Slider imgArray={[donateone]} />
                <DonationPage />    {/*contains left and right donation page  */}
                <Footer />
              </>
            }
          />


<Route
            path="/donatereceipt"
            element={
              <>
                <Navbar userType="donorDetails" />
                <DonationReceipt/>
                <Footer />
              </>
            }
          />

<Route
  path="/donatereceipt/:transactionId"
  element={
    <>
      <Navbar userType="donorDetails" />
      <DonationReceipt />
      <Footer />
    </>
  }
/>

          <Route
            path="/home"
            element={
              <>
                <Navbar userType="userDetails"/>
                <Slider imgArray={[imgone, img]}/>
                <DoctorSlider />
                <HomeSmall />
                <PricingAndCart />
                <Testimony />
                <Professional />
                {/* <div className="p-8 bg-[#f3f4f6]" >

                </div> */}
                <Footer />
              </>
            }
          />

          <Route path="/pres/:bookingId" element={<Prescription />} />

          {/* History page starts */}
          <Route
            path="/pApp"
            element={
              loggedInUser.isloggedIn ? (
                <>
                <Navbar userType="userDetails"/>
               <PatientNavbar
                    localstorage="userDetails"
                    oneName="Dashboard"
                    linkOne="/patientlogin"
                    twoName="All Appointments"
                    linkTwo="/pApp"
                    threeName="Book an Appointment"
                    linkThree="/patientlogin"
                    fourtName="Profile Setting"
                    linkFour="/patientlogin"
                  /> 
                    <PatientDash />
                  {/* <AllAppointment /> */}
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
            path="/admin/allApp"
            element={
              loggedInAdmin.isloggedIn ? (
                <>
              <PatientNavbar
                    localstorage="adminDetails"
                    oneName="Admin Dashboard"
                    linkOne="/adminlogin"
                    twoName="Upcoming Appointments"
                    linkTwo="/admin/allApp"
                    threeName="Donations "
                    linkThree="/admin/allDonation"
                    fourtName="Add Services"
                    linkFour="/admin/bookAp"
                  />   {/* the above is smarpthone navbar */}
                  <AdminDashboard/>
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
            path="/admin/addDoctor"
            element={
              loggedInAdmin.isloggedIn ? (
                <>
              <PatientNavbar
                    localstorage="adminDetails"
                    oneName="Admin Dashboard"
                    linkOne="/adminlogin"
                    twoName="Upcoming Appointments"
                    linkTwo="/admin/allApp"
                    threeName="Donations "
                    linkThree="/admin/allDonation"
                    fourtName="Add Services"
                    linkFour="/admin/bookAp"
                  />   {/* the above is smarpthone navbar */}
                  <AdminDashboard/>
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
            path="/admin/allDonation"
            element={
              loggedInAdmin.isloggedIn ? (
                <>
              <PatientNavbar
                    localstorage="adminDetails"
                    oneName="Admin Dashboard"
                    linkOne="/adminlogin"
                    twoName="Upcoming Appointments"
                    linkTwo="/admin/allApp"
                    threeName="Donations "
                    linkThree="/admin/allDonation"
                    fourtName="Add Services"
                    linkFour="/admin/bookAp"
                  />   {/* the above is smarpthone navbar */}
               <AdminDashboard/>        {/*  the left navbar and 5 big boxes  */}
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
          {/* History page ends */}


          <Route
            path="/contactSupport"
            element={
              loggedInUser.isloggedIn ? (
                <>
               <PatientNavbar
                    localstorage="userDetails"
                    oneName="Dashboard"
                    linkOne="/patientlogin"
                    twoName="All Appointments"
                    linkTwo="/pApp"
                  threeName="Book an Appointment"
                    linkThree="/patientlogin"
                    fourtName="Profile Setting"
                    linkFour="/patientlogin"
                  /> 
                    <PatientDash />
                  {/* <AllAppointment /> */}
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
            path="/patient/dates"
            element={
              loggedInUser.isloggedIn ? (
                <>
                 <PatientNavbar
                    localstorage="userDetails"
                    oneName="Dashboard"
                    linkOne="/patientlogin"
                    twoName="All Appointments"
                    linkTwo="/pApp"
                  threeName="Book an Appointment"
                    linkThree="/patientlogin"
                    fourtName="Profile Setting"
                    linkFour="/patientlogin"
                  /> 
                <Navbar/>
              <Dates/>   {/* the calendar and time slots - in timeslots only two componets Universalpatieent, FinalSelect */}
                  {/* <AllAppointment /> */}
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
            path="/bookphysio"
            element={
              loggedInUser.isloggedIn ? (
                <>
                  <Navbar userType="userDetails"/>
                  <PatientNavbar
                    localstorage="userDetails"
                    oneName="Dashboard"
                    linkOne="/patientlogin"
                    twoName="All Appointments"
                    linkTwo="/pApp"
                 threeName="Book an Appointment"
                    linkThree="/patientlogin"
                    fourtName="Profile Setting"
                    linkFour="/patientlogin"
                  />    
                    {/* smartphone navbar above and its link */}
                 <PatientBookAnApp/>
                  {/* <PatientDashboardModern/> */}
                  {/* <Footer /> */}
                </>
              ) : (
                <>
                  <Navbar userType="userDetails"/>
                  <PatientLogin />
                  <Footer />
                </>
              )
            }
          />


<Route
            path="/bookbloodtest"
            element={
              loggedInUser.isloggedIn ? (
                <>
                  <Navbar userType="userDetails"/>
                  <PatientNavbar
                    localstorage="userDetails"
                    oneName="Dashboard"
                    linkOne="/patientlogin"
                    twoName="All Appointments"
                    linkTwo="/pApp"
                  threeName="Book an Appointment"
                    linkThree="/patientlogin"
                    fourtName="Profile Setting"
                    linkFour="/patientlogin"
                  />    
                    {/* smartphone navbar above and its link */}
                 <PatientBookAnApp/>
                  {/* <PatientDashboardModern/> */}
                  {/* <Footer /> */}
                </>
              ) : (
                <>
                  <Navbar userType="userDetails"/>
                  <PatientLogin />
                  <Footer />
                </>
              )
            }
          />

       

          <Route
            path="/patientlogin"
            element={
              loggedInUser.isloggedIn ? (
                <>
                  <Navbar userType="userDetails"/>
                  <PatientNavbar
                    localstorage="userDetails"
                    oneName="Dashboard"
                    linkOne="/patientlogin"
                    twoName="All Appointments"
                    linkTwo="/pApp"
                  threeName="Book an Appointment"
                    linkThree="/patientlogin"
                    fourtName="Profile Setting"
                    linkFour="/patientlogin"
                  />    
                    {/* smartphone navbar above and its link */}
                  <PatientDash />
                  {/* <PatientDashboardModern/> */}
                  {/* <Footer /> */}
                </>
              ) : (
                <>
                  <Navbar userType="userDetails"/>
                  <PatientLogin />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/doctorlogin"
            element={
              loggedInDoctor.isloggedIn ? (
                <>
                  <PatientNavbar
                    localstorage="doctorDetails"
                    oneName="Dashboard"
                    linkOne="/doctorlogin"
                 
                    threeName="Manage Appointment"
                    linkThree="/doctor/manageApp"
                   
                  />
                  <DoctorDashboard />
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
            path="/doctor/UpcomingApp"
            element={
              loggedInDoctor.isloggedIn ? (
                <>
                 <PatientNavbar
                    localstorage="doctorDetails"
                    oneName="Dashboard"
                    linkOne="/doctorlogin"
                 
                    threeName="Manage Appointment"
                    linkThree="/doctor/manageApp"
                  
                  />
                  <DoctorDashboard />
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
            path="/doctor/manageApp"
            element={
              loggedInDoctor.isloggedIn ? (
                <>
                 <PatientNavbar
                    localstorage="doctorDetails"
                    oneName="Dashboard"
                    linkOne="/doctorlogin"
                 
                    threeName="Manage Appointment"
                    linkThree="/doctor/manageApp"
                   
                  />
                  <DoctorDashboard />
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
            path="/doctor/contactSupport"
            element={
              loggedInDoctor.isloggedIn ? (
                <>
                 <PatientNavbar
                    localstorage="doctorDetails"
                    oneName="Dashboard"
                    linkOne="/doctorlogin"
                    // twoName="Edit Appointments"
                    // linkTwo="/doctor/UpcomingApp"
                    threeName="Manage Appointment"
                    linkThree="/doctor/manageApp"
                
                  />
                  <DoctorDashboard />
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
            path="/adminlogin"
            element={
              loggedInAdmin.isloggedIn ? (
                <>
                  <PatientNavbar
                    localstorage="userDetails"
                    oneName="Admin Dashboard"
                    linkOne="/adminlogin"
                    twoName="Upcoming Appointments"
                    linkTwo="/admin/allApp"
                    threeName="Donations "
                    linkThree="/admin/allDonation"
                    fourtName="Add Services"
                    linkFour="/admin/bookAp"
                  />
                  <AdminDashboard />
                  {/* <Footer /> */}
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
            path="/admin/bookAp"
            element={
              loggedInAdmin.isloggedIn ? (
                <>
                  <PatientNavbar
                    localstorage="doctorDetails"
                    oneName="Admin Dashboard"
                    linkOne="/adminlogin"
                    twoName="Upcoming Appointments"
                    linkTwo="/admin/allApp"
                    threeName="Donations "
                    linkThree="/admin/allDonation"
                    fourtName="Add Services"
                    linkFour="/admin/bookAp"
                  />   {/* the above is smarpthone navbar */}
                  <AdminDashboard/>
                  {/* <DoctorDashboard /> */}
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




          {/* <Route
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
          /> */}

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
            path="/donorlogin"
            element={
              loggedInDonor.isloggedIn ? (
                <>
              <div className="lg:block hidden">  <Navbar userType="donorDetails" /></div>  
                  {/* <PatientNavbar /> */}
                  <PatientNavbar
                    localstorage="donorDetails"
                    oneName="Your Donations"
                    linkOne="/donorlogin"
                    twoName="Donor"
                    linkTwo="/appointments"
                    threeName="Manage Appointment"
                    linkThree="/selectDis"
                    fourtName="Doctor History"
                    linkFour="/history"
                  /> 
                  <DonorDashboard />
                  {/* <Footer /> */}
                </>
              ) : (
                <>
                  <Navbar userType="donorDetails" />
                  <DonorLogin />
                  <Footer />
                </>
              )
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

         

          <Route
            path="/about"
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
            path="/services"
            element={
              <>
                <Navbar />
                <Services />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />
           <Route
            path="/gallery"
            element={
              <>
                <Navbar />
                <Gallery />
                {/* <ChatBotButton /> */}
                <Footer />
              </>
            }
          />
          <Route
            path="/contact-us"
            element={
              <>
                <Navbar />
                <Slider imgArray={[contactone]} />
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
            <PatientNavbar
                    localstorage="userDetails"
                    oneName="Dashboard"
                    linkOne="/patientlogin"
                    twoName="All Appointments"
                    linkTwo="/pApp"
                   threeName="Book an Appointment"
                    linkThree="/patientlogin"
                    fourtName="Profile Setting"
                    linkFour="/patientlogin"
                  />    
                <PatientDash />
                  {/* <PatientNavbar />
                  <BookAnAppointment /> */}
                  {/* <ChatBotButton /> */}
                </>
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />

<Route
            path="/profileSettings"
            element={
              loggedInUser.isloggedIn ? (
                <>
                <PatientNavbar
                    localstorage="userDetails"
                    oneName="Dashboard"
                    linkOne="/doctorlogin"
                    twoName="Upcoming Appointments"
                    linkTwo="/appointments"
                    threeName="Manage Appointment"
                    linkThree="/selectDis"
                    fourtName="Doctor History"
                    linkFour="/history"
                  />
                  <PatientDash/>
                  {/* <BookAnAppointment /> */}
                  {/* <ChatBotButton /> */}
                </>
              ) : (
                <PatientNotLoggedIn />
              )
            }
          />



          <Route
            path="/patientprofile"
            element={
              loggedInUser.isloggedIn ? (
                <>
                 <PatientNavbar
                    localstorage="userDetails"
                    oneName="Dashboard"
                    linkOne="/patientlogin"
                    twoName="All Appointments"
                    linkTwo="/pApp"
                    threeName="Book an Appointment"
                    linkThree="/patientlogin"
                    fourtName="Profile Setting"
                    linkFour="/patientlogin"
                  />    
                    {/* smartphone navbar above and its link */}
                  <PatientDash />
               
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
            path="/finalreport"
            element={
              loggedInUser.isloggedIn ? <FinalReport /> : <PatientNotLoggedIn />
            }
          />
          <Route
            path="/patient/payment"
            element={
              loggedInUser.isloggedIn ? <PaymentPage /> :<> <Navbar />
              <PatientLogin />
              <Footer /></>
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
          {/* <Route
            path="/position"
            element={
              <>
               <PositionPractice />
              </>
            }
          /> */}
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

<Route
            path="/diagnosis"
            element={
              <>
                <Navbar />
                <Diagnosis/>
                <Footer />
              </>
            }
          />
          <Route
            path="/neurology"
            element={
              <>
                <Navbar />
                <Neurology />
                <Footer />
              </>
            }
          />
          <Route
            path="/rehabilitation"
            element={
              <>
                <Navbar />
                <Rehabilitation />
                <Footer />
              </>
            }
          />
          <Route
            path="/cardiology"
            element={
              <>
                <Navbar />
                <Cardiology />
                <Footer />
              </>
            }
          />
          <Route
            path="/psychiatry"
            element={
              <>
                <Navbar />
                <Psychiatry />
                <Footer />
              </>
            }
          />
          <Route
            path="/physiotherapy"
            element={
              <>
                <Navbar />
                <Physiotherapy />
                <Footer />
              </>
            }
          />
          

          
         
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
