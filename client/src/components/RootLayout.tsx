import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Container from "./Container";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
  
        <Navbar />
     
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
