// import { createSlice } from "@reduxjs/toolkit";

// const initialAuthState = { mailToken: localStorage.getItem("mailBoxToken") , MailBoxId:JSON.parse(localStorage.getItem('mailBoxId'))};

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialAuthState,
//   reducers: {
//     setToken(state, action) {
//       localStorage.setItem("mailBoxToken", action.payload);
//       state.mailToken = action.payload;
//     },
//     setEmailId(state,action)
//     {
//       localStorage.setItem('mailBoxId',JSON.stringify(action.payload));
//       state.MailBoxId=action.payload;
//     }
//   },
// });

// export const authAction=authSlice.actions;
// export default authSlice.reducer;