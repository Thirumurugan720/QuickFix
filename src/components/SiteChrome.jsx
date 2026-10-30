import { useState } from 'react'
import { Link, Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiBriefcase, FiCalendar, FiGrid, FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../context/useAuth'
import { formatPrice } from '../utils/localStorage'

const currentYear = new Date().getFullYear()

export function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const signOut = () => { logout(); setOpen(false); navigate('/') }
  const links = [['Home', '/'], ['Services', '/services'], ['About', '/about'], ['Contact', '/contact']]
  return <header className="site-header">
    <nav className="navbar navbar-expand-lg container site-nav">
      <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><FiBriefcase /></span><span>quick<span className="brand-accent">fix</span><small>HOME SERVICES</small></span></Link>
      <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
      <div className={`nav-content ${open ? 'nav-open' : ''}`}>
        <div className="nav-links">{links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive && path !== '/' ? 'active' : ''}`}>{label}</NavLink>)}</div>
        <div className="nav-actions">
          {user ? <>
            {user.role === 'admin' ? <Link className="nav-account" to="/admin"><FiGrid /> Admin</Link> : <Link className="nav-account" to="/bookings"><FiCalendar /> My bookings</Link>}
            <Link className="nav-user" to={user.role === 'admin' ? '/admin' : '/profile'}><span className="avatar">{user.name.charAt(0).toUpperCase()}</span><span className="user-name">Hi, {user.name.split(' ')[0]}</span></Link>
            <button className="btn btn-outline-primary btn-sm" onClick={signOut}>Log out</button>
          </> : <><Link className="nav-login" to="/login" onClick={() => setOpen(false)}>Log in</Link><Link className="btn btn-primary btn-sm" to="/services" onClick={() => setOpen(false)}>Book a service <FiArrowRight /></Link></>}
        </div>
      </div>
    </nav>
  </header>
}

export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="row gy-4 footer-main">
    <div className="col-lg-5"><Link to="/" className="brand footer-brand"><span className="brand-mark"><FiBriefcase /></span><span>quick<span className="brand-accent">fix</span><small>HOME SERVICES</small></span></Link><p className="footer-copy">A little help goes a long way. We make trusted home care easy to book, easy to love.</p></div>
    <div className="col-6 col-lg-2"><h6>Explore</h6><Link to="/services">All services</Link><Link to="/about">About us</Link><Link to="/contact">Contact</Link></div>
    <div className="col-6 col-lg-2"><h6>Your account</h6><Link to="/bookings">My bookings</Link><Link to="/profile">My profile</Link><Link to="/login">Sign in</Link></div>
    <div className="col-lg-3"><h6>Here when you need us</h6><p>Monday–Saturday, 8am–8pm</p><a href="mailto:hello@quickfix.com">hello@quickfix.com</a><p className="footer-phone">+91 800 555 0142</p></div>
  </div><div className="footer-bottom"><span>© {currentYear} QuickFix Home Services</span><span>Made for a more comfortable home.</span></div></div></footer>
}

export function PageIntro({ eyebrow, title, text, centered = false }) {
  return <div className={`page-intro ${centered ? 'text-center' : ''}`}><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</div>
}

export function ServiceCard({ service }) {
  return <article className="service-card">
    <Link to={`/services/${service.id}`} className="service-image-link" aria-label={`View ${service.name} details`}><img src={service.image} alt={service.name} className="service-image" loading="lazy" /><span className="service-rating">★ {service.rating || '4.8'} <small>({service.reviews || 120})</small></span></Link>
    <div className="service-card-body"><div className="service-card-heading"><div><span className="service-category">{service.category || 'Home service'}</span><h3>{service.name}</h3></div><strong>{formatPrice(service.price)}<small> / visit</small></strong></div>
      <p>{service.description}</p><div className="service-card-actions"><Link className="btn btn-light" to={`/services/${service.id}`}>Details</Link><Link className="btn btn-primary" to={`/booking/${service.id}`}>Book now <FiArrowRight /></Link></div></div>
  </article>
}

export function ProtectedRoute({ children, role }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (role && user.role !== role) return <div className="access-message"><span className="eyebrow">Access restricted</span><h1>This page is for {role === 'admin' ? 'QuickFix administrators' : 'customers'}.</h1><Link className="btn btn-primary" to="/">Back to home</Link></div>
  return children
}

export function StatusPill({ status }) {
  return <span className={`status-pill status-${(status || 'pending').toLowerCase().replaceAll(' ', '-')}`}>{status}</span>
}

export function Price({ value }) { return <>{formatPrice(value)}</> }
