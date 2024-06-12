import ReactDOM from 'react-dom/client'
import './index.css'
import './assets/styles/fonts.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";

import '../src/assets/plugins/adminlte/css/adminlte.min.css'
import '../src/assets/plugins/adminlte/js/adminlte.min.js'
import '../src/assets/plugins/fontawesome.js'
import '../src/assets/plugins/jquery-3.7.1.js'


ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <RouterProvider router={router}/>
    </ContextProvider>
)
