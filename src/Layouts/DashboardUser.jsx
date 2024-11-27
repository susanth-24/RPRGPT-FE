import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../components/Sidebar/Sidebar";
import SidebarUser from "../components/Sidebar/SidebarUser";
// import routes from "../routes"
import routesuser from "../routesuser";
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
const DashboardUser = (props) => {
    const { ...rest } = props;
    const location = useLocation();
    const [open, setOpen] = React.useState(true);
    const [currentRoute, setCurrentRoute] = React.useState("Chat");
  
    React.useEffect(() => {
      window.addEventListener("resize", () =>
        window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
      );
    }, []);
    React.useEffect(() => {
      getActiveRoute(routesuser);
    }, [location.pathname]);
  
    const getActiveRoute = (routes) => {
      let activeRoute = "chat";
      for (let i = 0; i < routes.length; i++) {
        if (
          window.location.href.indexOf(
            routes[i].layout + "/" + routes[i].path
          ) !== -1
        ) {
          setCurrentRoute(routes[i].name);
        }
      }
      return activeRoute;
    };
    const getActiveNavbar = (routes) => {
      let activeNavbar = false;
      for (let i = 0; i < routes.length; i++) {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
      return activeNavbar;
    };
    const getRoutes = (routes) => {
      return routes.map((prop, key) => {
        if (prop.layout === "/user") {
          return (
            <Route path={`/${prop.path}`} element={prop.component} key={key} />
          );
        } else {
          return null;
        }
      });
    };
  
    return (
      <div className="flex h-full  w-full">
        <SidebarUser open={open} onClose={() => setOpen(false)} />
        {/* Navbar & Main Content */}
        <div className="h-full w-full bg-lightPrimary ">
          {/* Main Content */}
          <main
            className={`mx-[2px] min-h-screen h-full flex-none transition-all md:pr-2 xl:ml-[250px]`}
          >
            {/* Routes */}
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                logoText={"Horizon UI Tailwind React"}
                brandText={currentRoute}
                secondary={getActiveNavbar(routesuser)}
                {...rest}
              />
              <div className=" mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Routes>
                  {getRoutes(routesuser)}
  
                  <Route
                    path="/"
                    element={<Navigate to="/user/chat" replace />}
                  />
                </Routes>
              </div>
              <div className="p-2">
              <Footer />
            </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  

export default DashboardUser
