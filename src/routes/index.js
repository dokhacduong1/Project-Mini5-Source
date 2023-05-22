import { Navigate } from "react-router-dom";
import LayoutMain from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "../components/PrivateRoutes";
import Topic from "../pages/Topic";
import Quiz from "../pages/Quiz";
import Answers from "../pages/Answers";
import Result from "../pages/Result";
export const routes = [
    {
        path:"/",
        element :<LayoutMain/>,
        children:[
          {
            index:true,
            element:<Home/>
          },
          {
            path:"login",
            element:<Login/>
          },
          {
            path:"register",
            element:<Register/>
          },
          {
            path:"*",
            element:<Navigate to="/" />
          },
          {
            element:<PrivateRoutes/>,
            children:[
              {
                path:"topic",
                element:<Topic/>
              },
              {
                path:"quiz/:id",
                element:<Quiz/>
              },
              {
                path:"answers",
                element:<Answers/>
              },
              {
                path:"result/:id",
                element:<Result/>
              }
            ]
          }
        ]
    }
]