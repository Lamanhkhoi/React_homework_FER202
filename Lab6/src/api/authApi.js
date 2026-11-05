import axios from 'axios'
import { ACCOUNTS_URL } from './config'

// Admin login against the /accounts resource on mockapi.

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
