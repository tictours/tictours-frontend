import React from 'react'
import FieldComponent from '../../common/FieldComponent'
import { useAsync } from '../../../utilis/useAsync'
import { URLS } from '../../../../constants'

const Destination = () => {
    const Data  = [
        { id: 1, name: 'Destination 1' },
        { id: 2, name: 'Destination 2' },
        { id: 3, name: 'Destination 3' },
        { id: 4, name: 'Destination 4' },
        { id: 5, name: 'Destination 5' },
      ]
      const url = URLS.DESTINATION_URL
      const destinationData = useAsync(url)
        return (
          <>
             <FieldComponent title='Destination' addTitle='Destination' 
              tableData={destinationData?.data?.data} url={url}/>
          </>
        )
}

export default Destination