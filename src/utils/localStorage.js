export const STORAGE_KEYS = {
  users: 'quickfix_users',
  currentUser: 'quickfix_current_user',
  services: 'quickfix_services',
  bookings: 'quickfix_bookings',
  messages: 'quickfix_messages',
}

export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (error) {
    console.error(`Could not read QuickFix data (${key}).`, error)
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent('quickfix:storage', { detail: { key } }))
  } catch (error) {
    console.error(`Could not save QuickFix data (${key}).`, error)
    throw new Error('Your changes could not be saved in this browser. Check available storage and try again.')
  }
}

export function makeId(prefix = 'QF') {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(price) || 0)
}

export function formatDate(date) {
  if (!date) return 'Date not set'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
