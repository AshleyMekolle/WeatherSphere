import { createBrowserRouter,  RouterProvider,} from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Login } from "./pages/Login";
import { Post } from "./pages/Post";
import { Home } from "./pages/Home";
import { Weatherapp} from "./pages/Weatherapp"
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import React from "react";


const router = createBrowserRouter([
  
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home/>
      },


        {  
          path: "/post",
          element: <Post/>
          },
      {
      path: "/weather",
      element: <Weatherapp/>
        },
        {
          path: "/about",
          element: <About/>
            }
    ]
  },

  {
    path: "/login",
    element: <Login/>,
  },     
   {
      path: "/signin",
      element: <SignIn/>
    },
    {
      path: "*",
      element: <NotFound />,
    },

]);

function App() {


  return (
    <div className="app">

       <div className="container">
        

       <RouterProvider router={router}/>
     </div>
     
    </div>
  );
}



export default App;
