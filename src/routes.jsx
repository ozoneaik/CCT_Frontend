import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import Main from "./pages/Main.jsx";
import FeaturedPromotions from "./pages/FeaturedPromotions.jsx";
import RepeatOrders from "./pages/RepeatOrders.jsx";
import TargetShops from "./pages/TargetShops.jsx";
import Training from "./pages/Training.jsx";
import Booths from "./pages/Booths.jsx";
import NewProducts from "./pages/NewProducts.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";

export const router = createBrowserRouter([
    {path: '/', element: <Main/>},
    {path: '/main', element: <Main/>},
    {path: '/FeaturePromotion', element: <FeaturedPromotions/>},
    {path: '/RepeatOrders', element: <RepeatOrders/>},
    {path: '/TargetShops', element: <TargetShops/>},
    {path: '/Training', element: <Training/>},
    {path: '/Booths', element: <Booths/>},
    {path: '/NewProducts', element: <NewProducts/>},
    {path: '/login', element: <Login/>},
    {path: '*',element : <NotFound/>}
])