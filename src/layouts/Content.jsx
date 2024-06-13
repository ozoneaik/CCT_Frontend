import Navbar from "./Navbar.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Content({children}) {
    const {userToken} = useStateContext();
    if (!userToken){
        return <Navigate to="/login" />;
    }

    
    return (
        <>
            <Navbar/>
            <div className={'content-wrapper'}>
                <section className="content-header">
                    <div className="container-fluid">
                        {children}
                    </div>
                </section>
            </div>

        </>
    );
}

export default Content;