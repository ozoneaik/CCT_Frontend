import {Link} from "react-router-dom";

export default function CardComponent(
    {
        // eslint-disable-next-line react/prop-types
        uri='#', title='ไม่ได้ประกาศ title', val=0 , background = '#fff', percent,icon = 'fa-chart-column'

    }) {
    const formattedVal = isNaN(parseFloat(val)) ? val : parseFloat(val).toLocaleString();

    return (

            <div className={'col-sm-12 col-md-3 col-lg-3 col-xl-3'}>
                <Link to={uri}>
                    <div className={`small-box pb-2 ${background}`}>
                        <div className="inner">
                            <p className={'p-0 m-0 my-2'}>{title}</p>
                            <h1 style={{fontSize: 35}}>
                                {formattedVal}
                            </h1>

                        </div>
                        <div className="icon">
                            <i className={`fa-solid ${icon}`} style={{fontSize: 30}}></i>
                        </div>
                    </div>
                </Link>
            </div>

    )
}