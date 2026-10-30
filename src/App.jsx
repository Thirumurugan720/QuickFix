import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { Footer, Navbar, ProtectedRoute } from './components/SiteChrome'
import { About, Booking, Contact, Home, Login, MyBookings, Profile, Register, ServiceDetails, Services } from './pages/Pages'
import { AdminLayout, Dashboard, ManageBookings, ManageCustomers, ManageServices } from './admin/AdminPages'

function CustomerLayout() {
  return <><Navbar /><main className="site-main"><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/services/:id" element={<ServiceDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/booking/:id" element={<ProtectedRoute role="customer"><Booking /></ProtectedRoute>} />
    <Route path="/bookings" element={<ProtectedRoute role="customer"><MyBookings /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute role="customer"><Profile /></ProtectedRoute>} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></main><Footer /></>
}

function App() {
  return <AuthProvider><BookingProvider><BrowserRouter><Routes>
    <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
      <Route index element={<Dashboard />} />
      <Route path="services" element={<ManageServices />} />
      <Route path="bookings" element={<ManageBookings />} />
      <Route path="customers" element={<ManageCustomers />} />
    </Route>
    <Route path="*" element={<CustomerLayout />} />
  </Routes></BrowserRouter></BookingProvider></AuthProvider>
}

export default App
