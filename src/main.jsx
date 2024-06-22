import ReactDOM from 'react-dom/client'
import './index.css'
import './assets/styles/fonts.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";
import 'bootstrap/dist/js/bootstrap.bundle.js'

const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider initialCurrentUser={currentUser}>
        <RouterProvider router={router}/>
    </ContextProvider>
)
