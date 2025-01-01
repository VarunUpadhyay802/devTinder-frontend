import { Outlet } from "react-router-dom";
NavBar
import Footer from "./Footer";
import NavBar from "./NavBar";
const Body = () => {
  return (
    <div>
      <NavBar />
      {/* outlet comes from react router dom and will render the children of the body */}
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
