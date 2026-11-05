// Base URL of the mockapi.io project. Resources needed (create them on mockapi.io):
//   /orchids   -> name, rating(Number), isSpecial(Boolean), isNatural(Boolean),
//                 image, color, origin, category
//   /accounts  -> username, password, role  (at least one record with role "admin")
// NOTE: use the "API endpoint" shown in mockapi (it can differ from the project id in the browser URL).
export const API_URL =
  import.meta.env.VITE_API_URL ?? 'https://6adff4c48e42963c8d5e85ec.mockapi.io'

export const ORCHIDS_URL = `${API_URL}/orchids`
export const ACCOUNTS_URL = `${API_URL}/accounts`
