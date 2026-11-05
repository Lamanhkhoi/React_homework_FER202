import axios from 'axios'
import { ACCOUNTS_URL } from './config'

// Admin login against the /accounts resource on mockapi (no real auth server).
// Idea: GET all accounts, then find the one with the same username + password and role "admin".
// We compare with === (exact match) on the client.
// Plain-text passwords are acceptable only because this is a lab with a mock API.
export function loginAdmin(username, password) {
  return axios.get(ACCOUNTS_URL).then((response) => {
    const account = response.data.find(
      (acc) => acc.username === username && acc.password === password && acc.role === 'admin'
    )
    if (!account) {
      throw new Error('Invalid username or password')
    }
    return account
  })
}

export { ACCOUNTS_URL }
