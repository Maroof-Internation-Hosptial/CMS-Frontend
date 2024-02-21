import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./componenets/pages/register";
import Login from "./componenets/pages/login";
import Dashboard from "./componenets/pages/dashboard";
import Contact from "./componenets/pages/contact";
import ForgotPassword from "./componenets/pages/forgot_password";
import RecoverPassword from "./componenets/pages/recover_password";
import Profile from "./componenets/pages/profile";
import Reports from "./componenets/pages/reports";
import MemberManagement from "./componenets/pages/member_management";
import Lockscreen from "./componenets/pages/lockscreen";
import MemberDirectory from "./componenets/pages/member_directory";
import AdminMemberDirectory from "./componenets/pages/admin_member_directory";
import Addevent from "./componenets/pages/addevent";
import Updateevent from "./componenets/pages/updateevent";
import Eventdetails from "./componenets/pages/eventdetails";
import Eventdirectory from "./componenets/pages/eventdirectory";
import AdminEventDirectory from "./componenets/pages/admin_event_direcotory";
import MuawinEventDirectory from "./componenets/pages/muawin_event_directory";
import Compose from "./componenets/pages/compose";
import Read from "./componenets/pages/read";
import Inbox from "./componenets/pages/inbox";
import Donations from "./componenets/pages/donations";
import Literature from "./componenets/pages/literature";
import Configuration from "./componenets/pages/configuration";
import Terms from "./componenets/pages/terms";
import { Toaster } from "sonner";
import VerifyOTP from "./componenets/pages/verifyotp";
import ResetPassword from "./componenets/pages/reset_password";
import UnderConstruction from "./componenets/pages/underconstruction";
import MemberDetails from "./componenets/pages/member_details";
import UpdateMember from "./componenets/pages/updatemember";
import SideBar from "./componenets/Sidebar/SideBar";
import Notifications from "./componenets/pages/notification";
import AddDonation from "./componenets/pages/adddonation";
import DonorsDetail from "./componenets/pages/donorsdetails";
import EventFeedback from "./componenets/pages/eventfeedback";
import AdminProtected from "./routes/AdminProtected";
import CheckActiveUser from "./routes/CheckActiveUser";
import CheckLogin from "./routes/CheckLogin";
import Contacts from "./componenets/pages/contacts";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<SideBar />}>
            <Route element={<CheckActiveUser />}>
              <Route path="/membermanagement" element={<MemberManagement />} />
              <Route path="/directory" element={<MemberDirectory />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/lock" element={<Lockscreen />} />
              <Route path="/memberdetails" element={<MemberDetails />} />
              <Route path="/updatemember" element={<UpdateMember />} />
              <Route path="/addevent" element={<Addevent />} />
              <Route path="/updateevent" element={<Updateevent />} />
              <Route path="/eventfeedback" element={<EventFeedback />} />
              <Route path="/eventdetails" element={<Eventdetails />} />
              <Route path="/eventdirectory" element={<Eventdirectory />} />

              <Route
                path="/muawin-event-directory"
                element={<MuawinEventDirectory />}
              />
              <Route path="/donations" element={<Donations />} />
              <Route path="/literature" element={<Literature />} />
              <Route path="/notifications" element={<Notifications />} />
            </Route>
          </Route>
          <Route element={<AdminProtected />}>
            <Route element={<SideBar />}>
              <Route
                path="/admin-directory"
                element={<AdminMemberDirectory />}
              />
              <Route
                path="/admin-event-directory"
                element={<AdminEventDirectory />}
              />
              <Route path="/config" element={<Configuration />} />
              <Route path="/adddonation" element={<AddDonation />} />
              <Route path="/donorsdetail" element={<DonorsDetail />} />
              <Route path="/contacts" element={<Contacts />} />
            </Route>
          </Route>
          <Route element={<CheckLogin />}>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/under-construction" element={<UnderConstruction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
