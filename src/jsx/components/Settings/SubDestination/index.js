import React from 'react'
import FieldComponent from '../../common/FieldComponent'

const SubDestination = () => {
    const Data  = [
        { id: 1, name: 'Sub Destination 1',parent: 'Destination 1' },
        { id: 2, name: 'Sub Destination 2',parent: 'Destination 1' },
        { id: 3, name: 'Sub Destination 3',parent: 'Destination 1' },
        { id: 4, name: 'Sub Destination 4',parent: 'Destination 1' },
        { id: 5, name: 'Sub Destination 5',parent: 'Destination 2' },
        { id: 6, name: 'Sub Destination 6',parent: 'Destination 2' },
        { id: 7, name: 'Sub Destination 7',parent: 'Destination 2' },
        { id: 8, name: 'Sub Destination 8',parent: 'Destination 2' },
      ]
      const ParentData  = [
        { id: 1, name: 'Destination 1' },
        { id: 2, name: 'Destination 2' },
        { id: 3, name: 'Destination 3' },
        { id: 4, name: 'Destination 4' },
        { id: 5, name: 'Destination 5' },
      ]
        return (
          <>
             <FieldComponent title='Sub Destination' addTitle='Sub Destination' tableData={Data}
              parentName='Destination' parentValue='parent' parentData={ParentData}/>
          </>
        )
}

export default SubDestination