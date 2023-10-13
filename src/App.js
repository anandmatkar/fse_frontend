import React, { useContext } from 'react';
import ManagerDashboard from './Componets/pages/Manager/managerD';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateCustomer from './Componets/pages/Manager/createCustomer';
// import Login from "./Componets/login/Login";
import ManagerLogin from './Componets/pages/Manager/managerLogin';
import RegistrationPage from './Componets/pages/Manager/Registration';
import AuthContext from './Componets/auth-context/auth-context';
import AssignedProject from './Componets/pages/Teachnician/assignedProject';
// import NewCustomerScreen from "./Componets/pages/Manager/createCustomer";
import NewProjectScreen from './Componets/pages/Manager/createProject';
import ProjectStatus from './Componets/pages/Manager/projectStatus';
import TechnicianDashboard from './Componets/pages/Teachnician/techDashboard';
import AdminDashboard from './Componets/pages/Admin/adminDash';
import Reset from './Componets/pages/Manager/forgetPassword';
import TimesheetScreen from './Componets/pages/Manager/timeSheetsandReports';
import TimesheetEntry from './Componets/pages/Manager/timeSheetEntry';
import AddTimesheetEntryForm from './Componets/pages/Manager/addTimeSheetForm';
import LoginFrontPage from './Componets/pages/Common/Login';
import AdminLogin from './Componets/pages/Admin/AdminLogin';
import TechnicianLogin from './Componets/pages/Teachnician/TeachLogin';
import TimeSheet from './Componets/pages/Teachnician/timeSheetShow';
import ShowCreatedProject from './Componets/pages/Manager/showCreatedProject';
import JobProgress from './Componets/pages/Manager/jobiProgress';
import JobAssigned from './Componets/pages/Teachnician/JobAssigned';
import JobEWaitingAprroval from './Componets/pages/Teachnician/JobWaitingApproval';
import JobClosed from './Componets/pages/Teachnician/JobClosed';
import JobWaitingApprovalM from './Componets/pages/Manager/jobWaitingApproval';
import ProjectManager from './Componets/pages/Manager/ProjectManager';
import AccountWA from './Componets/pages/Admin/AccountW';
import NewAccount from './Componets/pages/Manager/customerInfo';
import Userverified from './Componets/pages/Manager/Userverified';
import Registeredaccount from './Componets/pages/Admin/Registeredaccount';
import TechnicianTable from './Componets/pages/Teachnician/assignedProject';
import ProjectList from './Componets/pages/Teachnician/viewProjectDetails';
import NavbarManager from './Componets/pages/Manager/Navbar';
import ManageTechnician from './Componets/pages/Manager/ManageTechnician';
import CreateTechnician from './Componets/pages/Manager/CreateTechnician';
import DetailofJobwaiting from './Componets/pages/Teachnician/DetailofJobwaiting';
import DeatailofJobAssign from './Componets/pages/Teachnician/DeatailofJobAssign';
import DetailofJobclosed from './Componets/pages/Teachnician/DetailofJobclosed';
import ViewTechnicianProfile from './Componets/pages/Manager/ViewTechnicianProfile';
import ShowManagerProfile from './Componets/pages/Manager/ShowManagerProfile';
import ProjectStatusDetails from './Componets/pages/Manager/ProjectStatusDetails';
import CustomerList from './Componets/pages/Manager/CustomerList';
import CustomerEditedDetails from './Componets/pages/Manager/CustomerEditedDetails';
import UpdateTechincianprofile from './Componets/pages/Teachnician/UpdateTechincianProfile.js';
import TechnicianForgotPassword from './Componets/pages/Teachnician/TechnicianForgotPassword';
import ChangePassword from './Componets/pages/Teachnician/ChangePassword';
import TimeSheetForApproved from './Componets/pages/Manager/TimeSheetForApproved';
import ProjectReportData from './Componets/pages/Manager/ProjectReportData';
import ProjectRequestedForApproval from './Componets/pages/Manager/ProjectRequestedForApproval';
import ViewMachineInfo from './Componets/pages/Manager/ViewMachineInfo';
import ViewProjectMachineInfo from './Componets/pages/Manager/ViewProjectMachineInfo';
import EditProjectMachineInfo from './Componets/pages/Manager/EditProjectMachineInfo';
import CompletedProjects from './Componets/pages/Manager/CompletedProjects';
import DetailsOfMachineData from './Componets/pages/Manager/DetailsOfMachineData';
import AssignMachineData from './Componets/pages/Teachnician/AssignMachineData';
import AssignReportData from './Componets/pages/Teachnician/AssignReportData';
import AssignTimesheetData from './Componets/pages/Teachnician/AssignTimesheetData';
import AssignprojectAttachments from './Componets/pages/Teachnician/AssignprojectAttachments';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" exact element={<LoginFrontPage />} />
      </Routes>

      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />}></Route>
        {/* <Route path="/register" element={!authCtx.isLoggedIn && <RegistrationPage /> }></Route> */}
      </Routes>
      <Routes>
        <Route path="/managerL" element={<ManagerDashboard />}></Route>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/mangerLogin" element={<ManagerLogin />}></Route>
      </Routes>
      <Routes>
        <Route path="/techLogin" element={<TechnicianLogin />}></Route>
        <Route
          path="/updateTechnicianprofile"
          element={<UpdateTechincianprofile />}
        ></Route>
        <Route path="/ChangePassword" element={<ChangePassword />}></Route>
      </Routes>
      <Routes>
        <Route path="/reset" element={<Reset />}></Route>
        <Route
          path="/managert"
          element={
            !authCtx.isLoggedIn ? (
              <AddTimesheetEntryForm />
            ) : (
              <Navigate to={'/'} />
            )
          }
        ></Route>
        {/* Manager Routes */}
        <Route path="/navbarmanager" element={<NavbarManager />}></Route>
        <Route path="/manager" element={<ManagerDashboard />}></Route>
        <Route path="/managetechnician" element={<ManageTechnician />} />
        <Route path="/createtechnician" element={<CreateTechnician />} />
        <Route
          path="/viewtechnicianprofile/:technicianID"
          element={<ViewTechnicianProfile />}
        />
        <Route path="/managemachineinfo" element={<ViewMachineInfo />} />
        <Route
          path="/project-attached-machine-details/:projectID"
          element={<ViewProjectMachineInfo />}
        />
        <Route
          path="/project-attached-machine-details/edit-machine/:projectID/:machineID"
          element={<EditProjectMachineInfo />}
        />
        <Route path="/timeSheetss" element={<TimeSheet />}></Route>
        <Route path="/customerlist" element={<CustomerList />}></Route>
        <Route
          path="/customerediteddetails/:customerID"
          element={<CustomerEditedDetails />}
        ></Route>
        <Route
          path="/projectstatusdetails/:projectId"
          element={<ProjectStatusDetails />}
        ></Route>
        <Route
          path="/timesheetforapproval/:techId/:projectId"
          element={<TimeSheetForApproved />}
        />
        <Route
          path="/ProjectReportData/:techId/:projectId"
          element={<ProjectReportData />}
        />
        <Route
          path="/projectRequestedForApproval"
          element={<ProjectRequestedForApproval />}
        />
        <Route path="/completedprojects" element={<CompletedProjects />} />
        <Route
          path="/detailsOfMachineData/:machineId/:projectId"
          element={<DetailsOfMachineData />}
        />
      </Routes>

      <Routes>
        <Route path="/projectmanager" element={<ProjectManager />}></Route>
        <Route
          path="/showmanagerprofile"
          element={<ShowManagerProfile />}
        ></Route>
        <Route path="/createCustomer" element={<CreateCustomer />}></Route>
        <Route path="/assignTech" element={<AssignedProject />}></Route>
        <Route path="/createP" element={<NewProjectScreen />}></Route>
        <Route path="/projectStatus" element={<ProjectStatus />}></Route>
        <Route path="/techD" element={<TechnicianDashboard />}></Route>
        <Route path="/AdminD" element={<AdminDashboard />}></Route>
        <Route path="/timeSheet" element={<TimesheetScreen />}></Route>
        <Route path="/timeSheetEntry" element={<TimesheetEntry />}></Route>
        <Route path="/newaccount" element={<NewAccount />}></Route>
        <Route
          path="/timeSheetForm"
          element={<AddTimesheetEntryForm />}
        ></Route>
        <Route path="/showproject" element={<ShowCreatedProject />}></Route>
        <Route path="/projectprogress" element={<JobProgress />}></Route>
        <Route path="/JobAssigned" element={<JobAssigned />}></Route>
        <Route path="/JobClosed" element={<JobClosed />}></Route>
        <Route path="/JobApproval" element={<JobEWaitingAprroval />}></Route>
        <Route
          path="/WaitingAprroval"
          element={<JobWaitingApprovalM />}
        ></Route>
        <Route path="AccountWA" element={<AccountWA />}></Route>
        <Route path="/verifyManager" element={<Userverified />}></Route>
        <Route path="registerdaccount" element={<Registeredaccount />}></Route>
        <Route path="techniciantable" element={<TechnicianTable />}></Route>
        <Route path="projectlist" element={<ProjectList />}></Route>
        <Route
          path="DetailofJobwaiting/:projectID"
          element={<DetailofJobwaiting />}
        ></Route>
        <Route
          path="DeatilsodJobAssign/:projectID"
          element={<DeatailofJobAssign />}
        ></Route>
        <Route
          path="DetailsofJobClosed/:projectID"
          element={<DetailofJobclosed />}
        ></Route>
        <Route
          path="TechnicianForgotPassword"
          element={<TechnicianForgotPassword />}
        ></Route>
      
        <Route path="AssignMachineData/:projectID" element={<AssignMachineData/>} ></Route>
        <Route path="AssignReportData/:projectID" element={<AssignReportData/>} ></Route>
        <Route path="AssignTimesheetData/:projectID" element={<AssignTimesheetData/>} ></Route>
        <Route path="AssignProjectAttachments/:projectID" element={<AssignprojectAttachments/>}></Route>
        
      </Routes>
      {/* jst for push */}
      <Routes></Routes>
    </React.Fragment>
  );
}

export default App;

//After backend is connected it should be look like this
// const App = () => {
// 	return (
// 		<div>
// 			<BrowserRouter>
// 				<Route path="/login" exact component={Login} />
// 				<Route path="/register" exact component={Register} />
// 				<Route path="/dashboard" exact component={Dashboard} />
// 			</BrowserRouter>
// 		</div>
// 	)
// }
