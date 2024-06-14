import Loading from "./Loading.jsx";

function TableComponent(props) {
    // eslint-disable-next-line react/prop-types
    const { thead, tbody, dataFields } = props;

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
                                <td key={fieldIndex}>{row[field]}</td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        {/* eslint-disable-next-line react/prop-types */}
                        <td colSpan={thead.length} className="text-center">
                            ไม่มีข้อมูล
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;