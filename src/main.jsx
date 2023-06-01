/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import App from './App.jsx'
import './index.css'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllPodcast from './componets/Admin/AllPodcast.jsx';
import Addpodcast from './componets/Admin/Addpodcast.jsx';
import Updatepodcast from './componets/Admin/Updatepodcast.jsx';
import { Provider } from 'react-redux';
import Signup from './componets/Auth/Signup.jsx';
import Login from './componets/Auth/Login.jsx'
import Viewers from './componets/Admin/Viewers.jsx';
import Comments from './componets/Admin/Comments.jsx';
import Addvideo from './componets/Admin/Addvideo.jsx';
import ContactMessage from './componets/Admin/ContactMessage.jsx';
import ForgetPassword from './componets/Auth/ForgetPassword.jsx';
import ResetPassword from './componets/Auth/ResetPassword.jsx';
import PinVerify from './componets/Auth/PinVerify.jsx';
import AllAudio from './componets/Admin/AllAudio.jsx';
import AllVideo from './componets/Admin/AllVideo.jsx';
import store from './app/store';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/allpodcast",
    element:<AllPodcast />
  },
  {
    path:"/addpodcast",
    element:<Addpodcast />
  },
  {
    path:"/updatepodacast",
    element:<Updatepodcast />
  },
  {
    path:"/viewer",
    element:<Viewers />
  },
  {
    path:"/signup",
    element:<Signup />
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/comments",
    element:<Comments />
  },
  {
    path:"/addvideo",
    element:<Addvideo />
  },
  {
    path:"/contactsmsg",
    element:<ContactMessage />
  },
  {
    path:"/forgetpassword",
    element:<ForgetPassword />
  },
  {
    path:"/resetpassword",
    element:<ResetPassword />
  },
  {
    path:"/pinverify",
    element:<PinVerify />
  },
  {
    path:"/allAudio",
    element:<AllAudio />
  },
  {
    path:"/allVideo",
    element:<AllVideo />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
       <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
)
