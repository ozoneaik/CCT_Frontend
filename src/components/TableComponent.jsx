import Loading from "./Loading.jsx";

function TableComponent(props) {
    // eslint-disable-next-line react/prop-types
    const { thead, tbody, dataFields } = props;

    // ฟังก์ชันสำหรับจัดรูปแบบตัวเลขให้มี comma
    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    return (
        <div className={'table-responsive'}>
            <table className={'table table-bordered'}>
                <thead>
                <tr>
                    {/* eslint-disable-next-line react/prop-types */}
                    {thead.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {tbody === undefined || tbody === null ? (
                    <tr>
                        {/* eslint-disable-next-line react/prop-types */}
                        <td colSpan={thead.length}>
                            <Loading/>
                        </td>
                    </tr>
                    // eslint-disable-next-line react/prop-types
                ) : tbody.length > 0 ? (
                    // eslint-disable-next-line react/prop-types
                    tbody.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* eslint-disable-next-line react/prop-types */}
                            {dataFields.map((field, fieldIndex) => (
                                <td key={fieldIndex}>
                                    {typeof row[field] === 'number' ? formatNumber(row[field]) : row[field]}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        {/* eslint-disable-next-line react/prop-types */}
                        <td colSpan={thead.length} className="text-center">

                            {
                                // eslint-disable-next-line react/prop-types
                                props.showLoading === true ? (
                                    <span>ไม่มีข้อมูล</span>
                                ) : (
                                    <Loading/>
                                )
                            }
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;