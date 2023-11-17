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
import Termos from "./pages/Termos"
import Faq from './pages/Faq';
import Product from './pages/Product';
import Splash from './pages/Splash';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash/>,
  },
  {
    path: "/inicio",
    element: <Home/>,
  },
  {
    path: "/config",
    element:  <Privete><Config/></Privete>,
  },
  {
    path: "/termos",
    element:  <Termos/>,
  },
  {
    path: "/faq",
    element:  <Faq/>,
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
  {
    path: "/produtos",
    element: <Product/>,
  },
  
]);

export {router};