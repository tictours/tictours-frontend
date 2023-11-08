import React from 'react';
import { URLS } from '../../../../constants';
import { DetailComponent } from '../../common/DetailComponent';

function HotelDetail() {
  
  const url = URLS.HOTEL_URL
  const array = [
    {label:'Hotel',value:'document_2',type:'image',isMulti:true},
    {label:'Name',value:'name'},
    {label:'Destination',value:'destination_name'},
    {label:'Sub Destination',value:'sub_destination_name'},
    {label:'Place',value:'place'},
    {label:'Category',value:'category_name'},
    {label:'Property Type',value:'property_type_name'},
    {label:'Sales Number',value:'sales_no'},
    {label:'Sales Email',value:'sales_email'},
    {label:'Reservation Number',value:'reservation_no'},
    {label:'Reservation Email',value:'reservation_email'},
    {label:'Address',value:'address'},
    {label:'Phone Number',value:'phone_number'},
    {label:'Amenites',value:'amenities'},
    {label:'Rooms',value:'rooms',type:'table',table:[
      {tableLabel:'#',tableValue:'index'},
      {tableLabel:'market',tableValue:'market_type_name'},
      {tableLabel:'Start date',tableValue:'to_date'},
      {tableLabel:'From date',tableValue:'from_date'},
      {tableLabel:'Type',tableValue:'room_type_name'},
      {tableLabel:'Single',tableValue:'single_bed_amount'},
      {tableLabel:'Double',tableValue:'double_bed_amount'},
      {tableLabel:'Extra',tableValue:'extra_bed_amount'},
      {tableLabel:'Child W',tableValue:'child_w_bed_amount'},
      {tableLabel:'Child N',tableValue:'child_n_bed_amount'},
      {tableLabel:'Occupancy',tableValue:'occupancy'},
      {tableLabel:'Cut Off',tableValue:'allotted_cut_off_days'},
  ]},
  ]
  return (
    <>
    <DetailComponent title="Hotel" url={url} array={array}/>
    </>
  );
}

export default HotelDetail;
