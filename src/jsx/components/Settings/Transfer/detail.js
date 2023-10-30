import React from 'react';
import {useParams} from 'react-router-dom'
import { useAsync } from '../../../utilis/useAsync';
import { URLS } from '../../../../constants';
import { Table } from 'react-bootstrap';

function DetailTransfer() {
  const {id} = useParams()
  const detailUrl = `${URLS.TRANSFER_URL}/${id}`
  const {data} = useAsync(detailUrl,!!id)
  const detailData = data?.data
  const DetailComponent = ({label,value,style}) => {
    return (
      <div className="mb-3">
      <h4 className="text-primary">{label}:</h4>
      <h6>{value}</h6>
    </div>
    )
  }
  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className='text-white'>Transfer Details</h4>
        </div>
        <div className="card-body">
          <div className='mb-3'>
          <img src={detailData?.image} style={{height:'8rem',width:'8rem'}}></img>
          </div>
          <DetailComponent label='Name' value={detailData?.vehicle_name} />
          <DetailComponent label='Vehicle Number' value={detailData?.vehicle_number} />
          <DetailComponent label='Phone Number' value={detailData?.phone_number} />
          <DetailComponent label='Destination' value={detailData?.destination?.name} />
          <DetailComponent label='Description' value={detailData?.description} />
          <div className="col-12 mt-4">
                    <Table responsive className="custom-table-bordered">
                      <thead className="thead-table">
                        <tr>
                          <th>#</th>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>Type</th>
                          <th>Cost</th>
                          <th>Adult Cost</th>
                          <th>Child Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!!detailData?.estimations?.length ? (
                          detailData?.estimations?.map((data, key) => {
                            return (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data.from_date}</td>
                                <td>{data.to_date}</td>
                                <td>{data.type}</td>
                                <td>{data.cost}</td>
                                <td>{data.adult_cost}</td>
                                <td>{data.child_cost}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr id="empty-table-data">
                            <td colSpan={8} style={{ textAlign: "center" }}>
                              Empty !
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
        </div>
      </div>
    </div>
  );
}

export default DetailTransfer;
