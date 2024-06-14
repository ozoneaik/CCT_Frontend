export default function CardContentComponent(
    // eslint-disable-next-line react/prop-types
    {children, CardHeader = false, CardBody = false, HeaderTitle = 'ไม่ได้กำหนด'}
) {
    return (
        <div className={'card'}>
            {
                CardHeader ? (
                    <div className={'card-header'}>
                        <div className={'card-title'}>{HeaderTitle}</div>
                    </div>
                ) : <></>
            }
            {
                CardBody ? <div className={'card-body'}>{children}</div> : <></>
            }

        </div>
    )
}