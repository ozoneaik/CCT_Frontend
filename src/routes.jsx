import {createBrowserRouter} from "react-router-dom";
import Main from "./pages/Main.jsx";
import FeaturedPromotions from "./pages/FeaturedPromotions.jsx";
import RepeatOrders from "./pages/RepeatOrders.jsx";
import TargetShops from "./pages/TargetShops.jsx";
import Training from "./pages/Training.jsx";
import Booths from "./pages/BoothPage/Booths.jsx";
import NewProducts from "./pages/NewProducts.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import App from "./App.jsx";

export const router = createBrowserRouter([
    {path: '/', element: <Main/>},
    {path: '/main', element: <Main/>},
    {path: '/TargetShops/:month/:year/:cust_id/:cust_name', element: <TargetShops/>}, // เป้าที่จะทำ
    {path: '/FeaturePromotion/:month/:year/:cust_id/:cust_name', element: <FeaturedPromotions/>}, // รายการโปรโมชั่นนำเสนอ
    {path: '/RepeatOrders/:month/:year/:cust_id/:cust_name', element: <RepeatOrders/>}, // รายการสินค้าสั่งซ้ำ
    {path: '/Training/:month/:year/:cust_id/:cust_name', element: <Training/>}, // ระยะเวลาอบรม
    {path: '/Booths/:month/:year/:cust_id/:cust_name', element: <Booths/>}, // ระยะเวลาออกบูธ
    {path: '/NewProducts/:month/:year/:cust_id/:cust_name', element: <NewProducts/>}, // รายการสินค้านำเสนอใหม่
    {path : '/manage-user',element: <App/>},
    {path: '/login', element: <Login/>},
    {path: '*',element : <NotFound/>}
])