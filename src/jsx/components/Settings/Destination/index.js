import React from 'react'
import FieldComponent from '../../common/FieldComponent'

const Destination = () => {
    const Data  = [
        { id: 1, name: 'Destination 1' },
        { id: 2, name: 'Destination 2' },
        { id: 3, name: 'Destination 3' },
        { id: 4, name: 'Destination 4' },
        { id: 5, name: 'Destination 5' },
      ]
        return (
          <>
             <FieldComponent title='Destination' addTitle='Destination' tableData={Data} />
          </>
        )
}

export default Destination