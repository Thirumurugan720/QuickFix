import { useContext } from 'react'
import { BookingContext } from './booking-context'

export const useBookings = () => useContext(BookingContext)
