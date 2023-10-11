import Base from 'antd/es/typography/Base';
import { Base_Url } from './Base_Url';

/////////////////////////Manager Creation Api////////////////////////////////////////////
export const Create_Manager_Api = `${Base_Url}api/v1/manager/createManager`;
export const managerlogin_Api = `${Base_Url}api/v1/manager/managerLogin`;
export const Upload_ProfilePic_Manager = `${Base_Url}api/v1/manager/uploadProfilePic`;
////////////////////////////Create Customer API///////////////////////////////////////
export const Create_Customer_Api = `${Base_Url}api/v1/manager/createCustomer`;
export const Create_Project_Api = `${Base_Url}api/v1/manager/createProject`;
export const Forgot_Password_Api = `${Base_Url}api/v1/manager/forgotPassword`;
export const Reset_Password_Api = `${Base_Url}api/v1/manager/resetPassword`;
export const Upload_File_Attach = `${Base_Url}api/v1/manager/uploadProjectAttach`;
export const Upload_Machine_Files = `${Base_Url}api/v1/manager/uploadMachineFiles`;
export const Teachnician_List_Api = `${Base_Url}api/v1/manager/technicianLists`;
export const Customer_List_Api = `${Base_Url}api/v1/manager/customerList`;
export const Update_Customer_Details = `${Base_Url}api/v1/manager/updateCustomer`;
export const Confirm_Mail_Api = `${Base_Url}api/v1/manager/confirmEmail`;
export const Technician_Lists_Manager = `${Base_Url}api/v1/manager/technicianLists`;
///////////////////////////Upload Profile Manager//////////////////////////
export const Profile_Upload_Manager = `${Base_Url}api/v1/manager/uploadProfilePic`;

////////////////////Project Status Manager //////////////////////////////////
export const Project_List_Manager = `${Base_Url}api/v1/manager/projectList`;
export const Project_Count_Manager = `${Base_Url}api/v1/manager/projectCount`;
//////////////////////Technician Create Manager ///////////////////////////

export const Create_Technician_Api = `${Base_Url}api/v1/manager/createTechnician`;
export const Upload_Technician_Profile = `${Base_Url}api/v1/technician/uploadProfilePic`;
export const Upload_Technician_Documents = `${Base_Url}api/v1/manager/uploadTechnicianDocuments`;
export const Project_Machine_Details = `${Base_Url}api/v1/manager/machineDetails`;
export const Edit_Project_Machine_Details = `${Base_Url}api/v1/manager/editMachineDetails`;
export const Manager_Forget_Password = `${Base_Url}api/v1/manager/forgotPassword`;
export const Verify_Manager_Api = `${Base_Url}api/v1/manager/verifyManager`;
export const Upload_Manager_Profile = `${Base_Url}api/v1/manager/uploadProfilePic`
export const Show_Manager_Profile = `${Base_Url}api/v1/manager/showProfile`
export const Update_Manager_Profile = `${Base_Url}api/v1/manager/updateProfile`
