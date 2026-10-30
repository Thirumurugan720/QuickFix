import { useEffect, useState } from 'react'
import { AuthContext } from './auth-context'
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/localStorage'

const demoAccounts = [
  { id: 'admin-demo', name: 'QuickFix Admin', email: 'admin@quickfix.com', phone: '9876543210', password: 'Admin123', role: 'admin' },
  { id: 'customer-demo', name: 'Alex Morgan', email: 'user@quickfix.com', phone: '9876501234', password: 'User123', role: 'customer' },
]

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = readStorage(STORAGE_KEYS.users, null)
    return Array.isArray(saved) && saved.length ? saved : demoAccounts
  })
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.currentUser, null))

  useEffect(() => { writeStorage(STORAGE_KEYS.users, users) }, [users])

  const login = (email, password) => {
    const match = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password)
    if (!match) return { error: 'Those details don’t match an account. Please try again.' }
    const safeUser = { id: match.id, name: match.name, email: match.email, phone: match.phone, role: match.role }
    setUser(safeUser)
    writeStorage(STORAGE_KEYS.currentUser, safeUser)
    return { user: safeUser }
  }

  const register = (form) => {
    if (users.some((item) => item.email.toLowerCase() === form.email.trim().toLowerCase())) return { error: 'An account with this email already exists.' }
    const created = { id: `user-${Date.now()}`, name: form.name.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.trim(), password: form.password, role: 'customer' }
    setUsers((current) => [...current, created])
    const safeUser = { id: created.id, name: created.name, email: created.email, phone: created.phone, role: created.role }
    setUser(safeUser)
    writeStorage(STORAGE_KEYS.currentUser, safeUser)
    return { user: safeUser }
  }

  const updateProfile = (changes) => {
    const updatedUser = { ...user, ...changes }
    setUsers((current) => current.map((item) => item.id === user.id ? { ...item, ...changes } : item))
    setUser(updatedUser)
    writeStorage(STORAGE_KEYS.currentUser, updatedUser)
    return updatedUser
  }

  const changePassword = (currentPassword, nextPassword) => {
    const account = users.find((item) => item.id === user?.id)
    if (!account || account.password !== currentPassword) return { error: 'Your current password is incorrect.' }
    setUsers((current) => current.map((item) => item.id === user.id ? { ...item, password: nextPassword } : item))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    writeStorage(STORAGE_KEYS.currentUser, null)
  }

  return <AuthContext.Provider value={{ user, users, login, register, logout, updateProfile, changePassword }}>{children}</AuthContext.Provider>
}
