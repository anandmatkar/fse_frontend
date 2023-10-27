import Base from 'antd/es/typography/Base';
import { Base_Url } from './Base_Url';

// change password
export const Technician_ChnagePassword = `${Base_Url}api/v1/technician/changePassword`

// Detail of job Assign  , Detail of job waiting , Deatail of job closed
export const Technician_Assigned_Projects = `${Base_Url}api/v1/technician/assignedProjectList`
export const Technician_DetailJobAssign = `${Base_Url}api/v1/technician/assignedProjectDetails`
export const Technician_DeleteTimesheet = `${Base_Url}api/v1/technician/deleteTimesheet`
export const Technician_DeleteReport = `${Base_Url}api/v1/technician/deleteReport`

// Jobassigned , jobwaiting , jobclosed
export const Technician_ProjectList = `${Base_Url}api/v1/technician/assignedProjectList`

// New report modal
export const Technician_ReportAttach = `${Base_Url}api/v1/technician/uploadReportAttach`
export const Technician_NewCreateReport = `${Base_Url}api/v1/technician/createReport`

// Requesrt Approval
export const Technician_ReportRequestApproval = `${Base_Url}api/v1/technician/submitReportForApproval`

// request timesheet approval 
export const Technician_Timesheet_Approval = `${Base_Url}api/v1/technician/requestForTimesheetApproval`

// Timesheet modal
export const Technician_TimesheetAttach = `${Base_Url}api/v1/technician/uploadTimesheetAttachements`

// userdetail profile pic
export const Technician_upload_Profile_Pic = `${Base_Url}api/v1/technician/uploadProfilePic`