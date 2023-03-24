import axios from 'axios'
import { API_URL } from './constants'

export const authProvider = {
  user: null,
  _didLoad: false,
  _promise: null,

  async getIdentity() {
    const handleResponse = res => {
      const user = res.data?.user
      if (!user) {
        throw new Error('Not logged in')
      }
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
    }

    if (this._promise) {
      const res = await this._promise
      handleResponse(res)
    } else if (!this.user) {
      let url = API_URL + '/session'
      const params = new URLSearchParams(window.location.search)
      if (params.has('__superSecretSpoofId')) {
        url += '?' + params.toString()
        window.location.search = ''
      }
      const promise = axios.get(url).catch(err => {
        this._didLoad = true
        if (err?.response?.status === 401) {
          throw new Error('Not logged in')
        }
      })
      this._promise = promise
      const res = await promise
      this._didLoad = true
      this._promise = null
      handleResponse(res)
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
    this._didLoad = true
    localStorage.setItem('user', JSON.stringify(user))
    window.location = '/'
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
    let user
    if (this._didLoad) {
      user = this.user
    } else {
      user = await this.getIdentity()
    }

    if (!user) {
      throw new Error('Not logged in')
    }
  },

  // called when the user navigates to a new location, to check for permissions / roles
  async getPermissions() {
    return this.user?.permissions || []
  },

  getPermissionsSync() {
    return this.user?.permissions || []
  }
}
