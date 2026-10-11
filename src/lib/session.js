const TOKEN_KEY = 'token'
const USER_ID_KEY = 'id'

export const session = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  getUserId() {
    const id = Number.parseInt(localStorage.getItem(USER_ID_KEY), 10)
    return Number.isNaN(id) ? null : id
  },

  save({ token, id } = {}) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    }
    if (id !== undefined && id !== null) {
      localStorage.setItem(USER_ID_KEY, String(id))
    }
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
  },
}
