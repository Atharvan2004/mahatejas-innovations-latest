import { Link } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <Navbar />
      <div className="relative -top-10 flex min-h-screen flex-col text-white lg:flex-row">
        {/* Sidebar */}
        <div className="w-full bg-slate-100 lg:w-1/4">
          <nav className="">
            <ul className="flex items-center justify-evenly lg:flex-col">
              <li className="py-2 lg:mb-4">
                <Link to="/me" className="text-lg font-semibold">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/me/orders">My Orders</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Profile and Orders Section */}
        <div className="w-full p-4 lg:w-3/4">
          <p>
            <b>Name: </b>
            {user && `${user.firstName} ${user.lastName}`}
          </p>
          <p>
            <b>Email: </b>
            {user && user.email}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
