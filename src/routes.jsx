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

export const router = createBrowserRouter([
    {path: '/', element: <Main/>},
    {path: '/main', element: <Main/>},
    {path: '/TargetShops/:month/:year/:cust_id', element: <TargetShops/>}, // เป้าที่จะทำ
    {path: '/FeaturePromotion/:month/:year/:cust_id', element: <FeaturedPromotions/>}, // รายการโปรโมชั่นนำเสนอ
    {path: '/RepeatOrders', element: <RepeatOrders/>}, // รายการสินค้าสั่งซ้ำ
    {path: '/Training/:month/:year/:cust_id', element: <Training/>}, // ระยะเวลาอบรม
    {path: '/Booths/:month/:year/:cust_id', element: <Booths/>}, // ระยะเวลาออกบูธ
    {path: '/NewProducts', element: <NewProducts/>}, // รายการสินค้านำเสนอใหม่
    {path: '/login', element: <Login/>},
    {path: '*',element : <NotFound/>}
])