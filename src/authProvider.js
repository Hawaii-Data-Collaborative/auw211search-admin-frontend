import axios from 'axios'
import { API_URL } from './constants'

const rawuser = localStorage.getItem('user')

export const authProvider = {
  user: rawuser ? JSON.parse(rawuser) : null,
  _checkingSession: false,

  async getIdentity() {
    if (this._checkingSession) {
      return null
    }

    if (!this.user) {
      this._checkingSession = true
      const url = API_URL + '/session'
      const res = await axios.get(url)
      this._checkingSession = false
      const user = res.data.user
      if (!user) {
        throw new Error('Not logged in')
      }
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
    }

    return this.user ? { id: 1, fullName: this.user.email } : null
  },

  // called when the user attempts to log in
  async login({ username, password }) {
    const url = API_URL + '/login'
    const res = await axios.post(url, { email: username, password })
    const user = res.data.user
    if (!user) {
      throw new Error('Invalid credentials')
    }
    this.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },

  // called when the user clicks on the logout button
  async logout() {
    const url = API_URL + '/logout'
    await axios.post(url)
    localStorage.removeItem('user')
    this.user = null
  },

  // called when the API returns an error
  async checkError({ status }) {
    if (status === 401 || status === 403) {
      localStorage.removeItem('user')
      throw new Error(status)
    }
  },

  // called when the user navigates to a new location, to check for authentication
  async checkAuth() {
    if (!this.user) {
      throw new Error('Not logged in')
    }
  },

  // called when the user navigates to a new location, to check for permissions / roles
  async getPermissions() {
    return []
  }
}
