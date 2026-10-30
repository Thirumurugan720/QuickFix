import { useState } from 'react'
import { BookingContext } from './booking-context'
import { initialServices } from '../data/services'
import { makeId, readStorage, STORAGE_KEYS, writeStorage } from '../utils/localStorage'

export function BookingProvider({ children }) {
  const [services, setServices] = useState(() => {
    const saved = readStorage(STORAGE_KEYS.services, null)
    return Array.isArray(saved) ? saved : initialServices
  })
  const [bookings, setBookings] = useState(() => {
    const saved = readStorage(STORAGE_KEYS.bookings, [])
    return Array.isArray(saved) ? saved : []
  })

  const saveServices = (next) => {
    setServices(next)
    writeStorage(STORAGE_KEYS.services, next)
  }
  const saveBookings = (next) => {
    setBookings(next)
    writeStorage(STORAGE_KEYS.bookings, next)
  }
  const addBooking = (details) => {
    const booking = { ...details, id: makeId('QF'), status: 'Pending', createdAt: new Date().toISOString(), provider: '' }
    saveBookings([booking, ...bookings])
    return booking
  }
  const updateBooking = (id, changes) => saveBookings(bookings.map((item) => item.id === id ? { ...item, ...changes } : item))
  const cancelBooking = (id, userId) => {
    const booking = bookings.find((item) => item.id === id && item.userId === userId)
    if (!booking || ['Completed', 'Cancelled'].includes(booking.status)) return false
    updateBooking(id, { status: 'Cancelled' })
    return true
  }
  return <BookingContext.Provider value={{ services, bookings, saveServices, addBooking, updateBooking, cancelBooking }}>{children}</BookingContext.Provider>
}
