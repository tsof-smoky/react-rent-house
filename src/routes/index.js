import LoginLayout from "../components/LoginLayout";
import AdminLayout from "../components/AdminLayout";

import Home from "../pages/Home";
import House from "../pages/House";
import HouseDetail from "../pages/HouseDetail";
import Roommate from "../pages/Roommate";
import Support from "../pages/Support";
import Login from "../pages/Login";
import Register from "../pages/Register";
import forgotPassword from "../pages/ForgotPassword";
import UserList from "../pages/Admin/UserList";
import HouseList from "../pages/Admin/HouseList";
import HouseRequestList from "../pages/Admin/HouseRequestList";
import RoommateRequestList from "../pages/Admin/RoommateRequestList";

const adminRoutes = [
  { path: "/admin", component: UserList, layout: AdminLayout },
  { path: "/admin/house", component: HouseList, layout: AdminLayout },
  {
    path: "/admin/houserequest",
    component: HouseRequestList,
    layout: AdminLayout,
  },
  {
    path: "/admin/roommaterequest",
    component: RoommateRequestList,
    layout: AdminLayout,
  },
];
const userRoutes = [
  { path: "/", component: Home },
  { path: "/house", component: House },
  { path: "/house/:houseId", component: HouseDetail },
  { path: "/roommate", component: Roommate },
  { path: "/support", component: Support },
];
const publicRoutes = [
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
  { path: "/ForgotPassword", component: forgotPassword, layout: LoginLayout },
];

export { adminRoutes, userRoutes, publicRoutes };
