import React from 'react'
import { Route } from 'react-router-dom'
import HotelFields from '.'

// menu data
const Data  = [
  { id: 1, name: 'Field 1' },
  { id: 2, name: 'Field 2' },
  { id: 3, name: 'Field 3' },
  { id: 4, name: 'Field 4' },
  { id: 5, name: 'Field 5' },
]

export const PropertyCategory = () => {
  return (
    <>
       <HotelFields title='Property Category' addTitle='Category' tableData={Data}/>
    </>
  )
}
export const PropertyTypes = () => {
  return (
    <>
       <HotelFields title='Property Types' addTitle='Type' tableData={Data}/>
    </>
  )
}
export const RoomTypes = () => {
  return (
    <>
       <HotelFields title='Room Types' addTitle='Type' tableData={Data}/>
    </>
  )
}
export const MarketTypes = () => {
  return (
    <>
       <HotelFields title='Market Types' addTitle='Type' tableData={Data}/>
    </>
  )
}
export const RoomAmenities = () => {
  return (
    <>
       <HotelFields title='Room Amenities' addTitle='Amenity' tableData={Data}/>
    </>
  )
}
export const HotelAmenities = () => {
  return (
    <>
       <HotelFields title='Hotel Amenities' addTitle='Amenity' tableData={Data}/>
    </>
  )
}
export const MealPlan = () => {
  return (
    <>
       <HotelFields title='Meal Plan' addTitle='Plan' tableData={Data}/>
    </>
  )
}

