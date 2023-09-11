import React from 'react'

const NoData = ({colSpan=8}) => {
    return (
        <>
            <tr id='empty-table-data'>
                <td colSpan={colSpan} style={{ textAlign: 'center' }}>
                    No Data Found !
                </td>
            </tr>
        </>
    )
}

export default NoData