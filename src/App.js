import React, { useContext } from "react";
import ManagerDashboard from "./Componets/pages/Manager/managerD";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateCustomer from "./Componets/pages/Manager/createCustomer";
// import Login from "./Componets/login/Login";
import ManagerLogin from "./Componets/pages/Manager/managerLogin";
import RegistrationPage from "./Componets/pages/Manager/Registration";
import AuthContext from "./Componets/auth-context/auth-context";
import AssignedProject from "./Componets/pages/Teachnician/assignedProject";
// import NewCustomerScreen from "./Componets/pages/Manager/createCustomer";
import NewProjectScreen from "./Componets/pages/Manager/createProject";
import ProjectStatus from "./Componets/pages/Manager/projectStatus";
import TechnicianDashboard from "./Componets/pages/Teachnician/techDashboard";
import AdminDashboard from "./Componets/pages/Admin/adminDash";
import Reset from "./Componets/pages/Manager/forgetPassword";
import TimesheetScreen from "./Componets/pages/Manager/timeSheetsandReports";
import TimesheetEntry from "./Componets/pages/Manager/timeSheetEntry";
import AddTimesheetEntryForm from "./Componets/pages/Manager/addTimeSheetForm";
import LoginFrontPage from "./Componets/pages/Common/Login";
import AdminLogin from "./Componets/pages/Admin/AdminLogin";
import TechnicianLogin from "./Componets/pages/Teachnician/TeachLogin";
import TimeSheet from "./Componets/pages/Teachnician/timeSheetShow";
import ShowCreatedProject from "./Componets/pages/Manager/showCreatedProject";
import JobProgress from "./Componets/pages/Manager/jobiProgress";
import JobAssigned from "./Componets/pages/Teachnician/JobAssigned";
import JobEWaitingAprroval from "./Componets/pages/Teachnician/JobWaitingApproval";
import JobClosed from "./Componets/pages/Teachnician/JobClosed";
import JobWaitingApprovalM from "./Componets/pages/Manager/jobWaitingApproval";
import ProjectManager from "./Componets/pages/Manager/ProjectManager";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          exact
          element={!authCtx.isLoggedIn && <LoginFrontPage />}
        />
      </Routes>

      
      <Routes>
        <Route
          path="/adminLogin"
          element={!authCtx.isLoggedIn && <AdminLogin />}
        ></Route>
        {/* <Route path="/register" element={!authCtx.isLoggedIn && <RegistrationPage /> }></Route> */}
      </Routes>
      <Routes>
        <Route
          path="/managerL"
          element={!authCtx.isLoggedIn && <ManagerDashboard />}
        ></Route>
        <Route
          path="/register"
          element={!authCtx.isLoggedIn && <RegistrationPage />}
        ></Route>
        <Route
          path="/mangerLogin"
          element={!authCtx.isLoggedIn && <ManagerLogin />}
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/techLogin"
          element={!authCtx.isLoggedIn && <TechnicianLogin />}
        ></Route>
      </Routes>
      <Routes>
        <Route path="/reset" element={!authCtx.isLoggedIn && <Reset />}></Route>

        <Route
          path="/manager"
          element={
            !authCtx.isLoggedIn ? (
              <AddTimesheetEntryForm />
            ) : (
              <Navigate to={"/"} />
            )
          }
        ></Route>

        <Route
          path="/manager"
          element={
            authCtx.isLoggedIn ? <ManagerDashboard /> : <Navigate to={"/"} />
          }
        ></Route>
        <Route path="/timeSheetss" element={<TimeSheet />}></Route>
      </Routes>

      <Routes>
      <Route path="/projectmanager" element={<ProjectManager />}></Route>
        <Route path="/createCustomer" element={<CreateCustomer />}></Route>
        <Route path="/assignTech" element={<AssignedProject />}></Route>
        <Route path="/createP" element={<NewProjectScreen />}></Route>
        <Route path="/projectStatus" element={<ProjectStatus />}></Route>
        <Route path="/techD" element={<TechnicianDashboard />}></Route>
        <Route path="/AdminD" element={<AdminDashboard />}></Route>
        <Route path="/timeSheet" element={<TimesheetScreen />}></Route>
        <Route path="/timeSheetEntry" element={<TimesheetEntry />}></Route>
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
      </Routes>

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
