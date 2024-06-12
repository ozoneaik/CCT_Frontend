import Content from "../layouts/Content.jsx";
import {Link, useNavigate} from "react-router-dom";


function NotFound()
{
    const navigate = useNavigate();
    return (
        <Content header={'not found'} header_sub={'not found'}>
            <div className="error-page">
                <h2 className="headline text-warning">404</h2>
                <div className="error-content">
                    <h3><i className="fas fa-exclamation-triangle text-warning"></i>อ๊ะ! ไม่พบหน้านี้ หรืออาจเกิดปัญหาบางอย่าง</h3>
                    <p>
                        เราไม่พบหน้าที่คุณกำลังมองหา ในระหว่างนี้ คุณอาจกลับไปที่<Link to={'#'}>หลัก</Link>
                    </p>
                    <button onClick={()=>navigate('/')} className={'btn btn-warning '}>กลับไปหน้าหลัก</button>
                </div>
            </div>
        </Content>
    );
}

export default NotFound;