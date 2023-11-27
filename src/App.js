import React from "react";
import ManagerDashboard from "./Componets/pages/Manager/managerD";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CreateCustomer from "./Componets/pages/Manager/createCustomer";
import ManagerLogin from "./Componets/pages/Manager/managerLogin";
import RegistrationPage from "./Componets/pages/Manager/Registration";
import AuthContext from "./Componets/auth-context/auth-context";
import NewProjectScreen from "./Componets/pages/Manager/createProject";
import ProjectStatus from "./Componets/pages/Manager/projectStatus";
import TechnicianDashboard from "./Componets/pages/Teachnician/techDashboard";
import AdminDashboard from "./Componets/pages/Admin/adminDash";
import Reset from "./Componets/pages/Manager/forgetPassword";
import LoginFrontPage from "./Componets/pages/Common/Login";
import AdminLogin from "./Componets/pages/Admin/AdminLogin";
import TechnicianLogin from "./Componets/pages/Teachnician/TeachLogin";
import JobProgress from "./Componets/pages/Manager/jobiProgress";
import JobAssigned from "./Componets/pages/Teachnician/JobAssigned";
import JobEWaitingAprroval from "./Componets/pages/Teachnician/JobWaitingApproval";
import JobClosed from "./Componets/pages/Teachnician/JobClosed";
import AccountWA from "./Componets/pages/Admin/AccountW";
import NewAccount from "./Componets/pages/Manager/customerInfo";
import Userverified from "./Componets/pages/Manager/Userverified";
import Registeredaccount from "./Componets/pages/Admin/Registeredaccount";
import ManageTechnician from "./Componets/pages/Manager/ManageTechnician";
import CreateTechnician from "./Componets/pages/Manager/CreateTechnician";
import DetailofJobwaiting from "./Componets/pages/Teachnician/DetailofJobwaiting";
import DeatailofJobAssign from "./Componets/pages/Teachnician/DeatailofJobAssign";
import DetailofJobclosed from "./Componets/pages/Teachnician/DetailofJobclosed";
import ViewTechnicianProfile from "./Componets/pages/Manager/ViewTechnicianProfile";
import ShowManagerProfile from "./Componets/pages/Manager/ShowManagerProfile";
import ProjectStatusDetails from "./Componets/pages/Manager/ProjectStatusDetails";
import CustomerList from "./Componets/pages/Manager/CustomerList";
import CustomerEditedDetails from "./Componets/pages/Manager/CustomerEditedDetails";
import UpdateTechincianprofile from "./Componets/pages/Teachnician/UpdateTechincianProfile.js";
import TechnicianForgotPassword from "./Componets/pages/Teachnician/TechnicianForgotPassword";
import ChangePassword from "./Componets/pages/Teachnician/ChangePassword";
import TimeSheetForApproved from "./Componets/pages/Manager/TimeSheetForApproved";
import ProjectReportData from "./Componets/pages/Manager/ProjectReportData";
import ProjectRequestedForApproval from "./Componets/pages/Manager/ProjectRequestedForApproval";
import ViewMachineInfo from "./Componets/pages/Manager/ViewMachineInfo";
import ViewProjectMachineInfo from "./Componets/pages/Manager/ViewProjectMachineInfo";
import EditProjectMachineInfo from "./Componets/pages/Manager/EditProjectMachineInfo";
import CompletedProjects from "./Componets/pages/Manager/CompletedProjects";
import DetailsOfMachineData from "./Componets/pages/Manager/DetailsOfMachineData";
import AssignMachineData from "./Componets/pages/Teachnician/AssignMachineData";
import AssignReportData from "./Componets/pages/Teachnician/AssignReportData";
import AssignTimesheetData from "./Componets/pages/Teachnician/AssignTimesheetData";
import AssignprojectAttachments from "./Componets/pages/Teachnician/AssignprojectAttachments";
import WaitingMachineData from "./Componets/pages/Teachnician/WaitingMachineData";
import WaitingReportData from "./Componets/pages/Teachnician/WaitingReportData";
import WaitingTimesheetData from "./Componets/pages/Teachnician/WaitingTimesheetData";
import WaitingProjectAttachment from "./Componets/pages/Teachnician/WaitingProjectAttachment";
import CompleteMachineData from "./Componets/pages/Teachnician/CompleteMachineData";
import CompleteReportData from "./Componets/pages/Teachnician/CompleteReportData";
import CompleteTimesheetData from "./Componets/pages/Teachnician/CompleteTimesheetData";
import CompleteProejctAttachment from "./Componets/pages/Teachnician/CompleteProejctAttachment";
import ProjectData from "./Componets/pages/Manager/ProjectData";
import Cookies from "js-cookie";
import ProjectDetails from "./Componets/pages/Manager/ProjectDetails";
import TechnicianProjectDetails from "./Componets/pages/Teachnician/TechnicianProjectDetails";
import ViewSignedPaperTimesheet from "./Componets/pages/Teachnician/ViewSignedPaperTimesheet.js";

// Define a function to check if the user is authenticated
function isAuthenticated() {
  return !!Cookies.get("token");
}

// Define a function to get the user's role
function getUserRole() {
  return Cookies.get("role");
}

// ProtectedRoute component to protect routes based on role
function ProtectedRoute({ role, children }) {
  const isAuthenticatedUser = isAuthenticated();
  const userRole = getUserRole();

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticatedUser) {
    return <Navigate to="/" />;
  }

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <React.Fragment>
      {/* ===============================================Main Dashboard============================================================================= */}

      <Routes>
        <Route path="/" exact element={<LoginFrontPage />} />
      </Routes>

      {/* ===================================================ADMIN================================================================= */}

      <Routes>
        <Route
          path="/AdminD"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AccountWA"
          element={
            <ProtectedRoute role="Admin">
              <AccountWA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registerdaccount"
          element={
            <ProtectedRoute role="Admin">
              <Registeredaccount />
            </ProtectedRoute>
          }
        />

        <Route path="/adminLogin" element={<AdminLogin />}></Route>
      </Routes>

      {/* ===============================================MANAGER====================================================================== */}

      <Routes>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/mangerLogin" element={<ManagerLogin />}></Route>
        <Route path="/verifyManager" element={<Userverified />} />
        <Route path="/reset" element={<Reset />} />
        <Route
          path="/completedprojects"
          element={
            <ProtectedRoute role="Manager">
              <CompletedProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createCustomer"
          element={
            <ProtectedRoute role="Manager">
              <CreateCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createP"
          element={
            <ProtectedRoute role="Manager">
              <NewProjectScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createtechnician"
          element={
            <ProtectedRoute role="Manager">
              <CreateTechnician />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newaccount"
          element={
            <ProtectedRoute role="Manager">
              <NewAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customerlist"
          element={
            <ProtectedRoute role="Manager">
              <CustomerList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projectprogress"
          element={
            <ProtectedRoute role="Manager">
              <JobProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute role="Manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/managetechnician"
          element={
            <ProtectedRoute role="Manager">
              <ManageTechnician />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projectStatus"
          element={
            <ProtectedRoute role="Manager">
              <ProjectStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projectDetails/:projectID"
          element={
            <ProtectedRoute role="Manager">
              <ProjectDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/managemachineinfo"
          element={
            <ProtectedRoute role="Manager">
              <ViewMachineInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customerediteddetails/:customerID"
          element={
            <ProtectedRoute role="Manager">
              <CustomerEditedDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detailsOfMachineData/:techID/:projectId"
          element={
            <ProtectedRoute role="Manager">
              <DetailsOfMachineData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project-attached-machine-details/edit-machine/:projectID/:machineID"
          element={
            <ProtectedRoute role="Manager">
              <EditProjectMachineInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projectdata/:machineId/:projectId/:techID"
          element={
            <ProtectedRoute role="Manager">
              <ProjectData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProjectReportData/:techId/:projectId"
          element={
            <ProtectedRoute role="Manager">
              <ProjectReportData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projectRequestedForApproval"
          element={
            <ProtectedRoute role="Manager">
              <ProjectRequestedForApproval />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projectstatusdetails/:projectId"
          element={
            <ProtectedRoute role="Manager">
              <ProjectStatusDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showmanagerprofile"
          element={
            <ProtectedRoute role="Manager">
              <ShowManagerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timesheetforapproval/:techId/:projectId"
          element={
            <ProtectedRoute role="Manager">
              <TimeSheetForApproved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project-attached-machine-details/:projectID"
          element={
            <ProtectedRoute role="Manager">
              <ViewProjectMachineInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewtechnicianprofile/:technicianID"
          element={
            <ProtectedRoute role="Manager">
              <ViewTechnicianProfile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/*================================================Technician Routes==================================================== */}

      <Routes>
        <Route path="/ChangePassword" element={<ChangePassword />}></Route>
        <Route path="/techLogin" element={<TechnicianLogin />}></Route>

        <Route
          path="/JobAssigned"
          element={
            <ProtectedRoute role="Technician">
              <JobAssigned />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/JobClosed"
          element={
            <ProtectedRoute role="Technician">
              <JobClosed />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/JobApproval"
          element={
            <ProtectedRoute role="Technician">
              <JobEWaitingAprroval />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/techD"
          element={
            <ProtectedRoute role="Technician">
              <TechnicianDashboard />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/technicianProjectDetails/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <TechnicianProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-signed-paper-timesheet/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <ViewSignedPaperTimesheet />
            </ProtectedRoute>
          }
        />

        <Route
          path="AssignMachineData/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <AssignMachineData />{" "}
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="AssignProjectAttachments/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <AssignprojectAttachments />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="AssignReportData/:projectID/:machineID"
          element={
            <ProtectedRoute role="Technician">
              <AssignReportData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="AssignTimesheetData/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <AssignTimesheetData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="DeatilsodJobAssign/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <DeatailofJobAssign />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="DetailofJobwaiting/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <DetailofJobwaiting />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="DetailsofJobClosed/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <DetailofJobclosed />{" "}
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="TechnicianForgotPassword"
          element={<TechnicianForgotPassword />}
        ></Route>

        <Route
          path="WaitingMachineData/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <WaitingMachineData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="WaitingReportData/:projectID/:machineID"
          element={
            <ProtectedRoute role="Technician">
              <WaitingReportData />{" "}
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="WaitingTimesheetData/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <WaitingTimesheetData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="WaitingProjectAttachments/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <WaitingProjectAttachment />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/updateTechnicianprofile"
          element={
            <ProtectedRoute role="Technician">
              <UpdateTechincianprofile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="CompleteMachineData/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <CompleteMachineData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="CompleteReportData/:projectID/:machineID"
          element={
            <ProtectedRoute role="Technician">
              <CompleteReportData />{" "}
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="CompleteTimesheetData/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <CompleteTimesheetData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="CompleteProjectAttachments/:projectID"
          element={
            <ProtectedRoute role="Technician">
              <CompleteProejctAttachment />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
