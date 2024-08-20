// rrd imports
import { Outlet } from "react-router-dom";

// components
import { Footer, Navbar } from "../components";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="site-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
