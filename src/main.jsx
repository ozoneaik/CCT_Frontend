import ReactDOM from 'react-dom/client'
import './index.css'
import './assets/styles/fonts.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <RouterProvider router={router}/>
    </ContextProvider>
)
