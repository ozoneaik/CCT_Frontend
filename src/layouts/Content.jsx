import Navbar from "./Navbar.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Content({children}) {
    const {currentUser,userToken} = useStateContext();
    console.log(userToken)
    if (!userToken){
        return <Navigate to="/login" />;
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