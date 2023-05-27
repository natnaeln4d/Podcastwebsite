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

import Signup from './componets/Auth/Signup.jsx';
import Login from './componets/Auth/Login.jsx'
import Viewers from './componets/Admin/Viewers.jsx';
import Comments from './componets/Admin/Comments.jsx';
import Addvideo from './componets/Admin/Addvideo.jsx';
const router = createBrowserRouter([
  {
    path: "/home",
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
    path:"/",
    element:<Login />
  },
  {
    path:"/comments",
    element:<Comments />
  },
  {
    path:"/addvideo",
    element:<Addvideo />
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
