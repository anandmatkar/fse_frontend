import Base from "antd/es/typography/Base";
import { Base_Url } from "./Base_Url";

export const Technician_Base_Url = `${Base_Url}api/v1/technician`;

// change password
export const Technician_ChnagePassword = `${Base_Url}api/v1/technician/changePassword`;

// Detail of job Assign  , Detail of job waiting , Deatail of job closed
export const Technician_Assigned_Projects = `${Base_Url}api/v1/technician/assignedProjectList`;
export const Technician_Assigned_Project_Details = `${Base_Url}api/v1/technician/assignedProjectDetails`;
export const Technician_DetailJobAssign = `${Base_Url}api/v1/technician/assignedProjectDetails`;
export const Technician_DeleteTimesheet = `${Base_Url}api/v1/technician/deleteTimesheet`;
export const Technician_DeleteReport = `${Base_Url}api/v1/technician/deleteReport`;
export const Technician_Upload_Agreement = `${Base_Url}api/v1/technician/uploadAgreement`;
export const Technician_Edit_Report = `${Base_Url}api/v1/technician/editReport`;
export const Show_Signed_Paper_To_Tech = `${Base_Url}api/v1/technician/showSignedPaper`;
export const Delete_Signed_Paper = `${Base_Url}api/v1/technician/deleteSignedPaper`;

// Jobassigned , jobwaiting , jobclosed
export const Technician_ProjectList = `${Base_Url}api/v1/technician/assignedProjectList`;

// New report modal
export const Technician_ReportAttach = `${Base_Url}api/v1/technician/uploadReportAttach`;
export const Technician_NewCreateReport = `${Base_Url}api/v1/technician/createReport`;
export const Technician_Show_Report_Attach = `${Base_Url}api/v1/technician/showReportAttach`;
export const Technician_Edit_Report_Attach = `${Base_Url}api/v1/technician/editReportDoc`;

// Requesrt Approval
export const Technician_ReportRequestApproval = `${Base_Url}api/v1/technician/submitReportForApproval`;

// request timesheet approval
export const Technician_Timesheet_Approval = `${Base_Url}api/v1/technician/requestForTimesheetApproval`;

// Timesheet modal
export const Technician_TimesheetAttach = `${Base_Url}api/v1/technician/uploadTimesheetAttachements`;

// userdetail profile pic
export const Technician_upload_Profile_Pic = `${Base_Url}api/v1/technician/uploadProfilePic`;
