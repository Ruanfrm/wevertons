// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Error from './pages/Error/Error';
import Config from './pages/config/Config'
import AdminPage from './pages/AdminPage';
import Login from "./pages/Login"
import Privete from './routes/privete';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/config",
    element: <Config/>,
  },
  {
    path: "/adm",
    element: <Privete><AdminPage/></Privete> ,
  },
  {
    path: "*",
    element: <Error/>,
  },
  
  {
    path: "/login",
    element: <Login/>,
  },
  
]);

export {router};
