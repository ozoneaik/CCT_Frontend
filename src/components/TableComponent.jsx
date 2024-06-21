import Loading from "./Loading.jsx";
import { useEffect, useState } from "react";

function TableComponent(props) {
    // eslint-disable-next-line react/prop-types
    const { thead, tbody, dataFields } = props;
    const [loading, setLoading] = useState(true);

    // ฟังก์ชันสำหรับจัดรูปแบบตัวเลขให้มี comma
    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    useEffect(() => {
        if (tbody && tbody.length > 0) {
            setLoading(false);
        } else {
            setLoading(true); // If tbody is empty, set loading to true
        }
        console.log('length >> ', tbody.length);
    }, [tbody]); // Add tbody as a dependency to useEffect

    return (
        <div className={'table-responsive'}>
            {loading ? (
                <Loading />
            ) : (
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
                    {
                        tbody.length > 0 ? (
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
                                <td colSpan={thead.length}>ไม่มีข้อมูล</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TableComponent;