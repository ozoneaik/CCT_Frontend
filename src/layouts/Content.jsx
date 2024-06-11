import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Navigate} from "react-router-dom";
import {useEffect} from "react";
import axiosClient from "../axios.js";

// eslint-disable-next-line react/prop-types
function Content({children}) {
    const {userToken, setCurrentUser} = useStateContext();
    if (userToken){
        return <Navigate to="/login" />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosClient.get('/me')
            .then(({ data }) => {
                setCurrentUser(data)
            })
    }, [setCurrentUser, userToken])

    
    return (
        <>
            <Navbar/>
            {/*<Sidebar/>*/}
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