import Navbar from "./Navbar.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Navigate} from "react-router-dom";
import {useEffect} from "react";
import {GetProfileApi} from "../api/login_api.js";

// eslint-disable-next-line react/prop-types
function Content({children}) {
    const {currentUser,userToken,setCurrentUser} = useStateContext();
    if (!userToken){
        return <Navigate to="/login" />;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = ()=> {
        GetProfileApi((data)=>{
            setCurrentUser(data);
        });
    }

    return (
        <>
            <Navbar username={currentUser.name} saleId={currentUser.username} />
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