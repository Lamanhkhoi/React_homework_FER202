import axios from 'axios'
import { ORCHIDS_URL } from './config'

// All CRUD calls for /orchids live here. Pages/components must NOT call axios directly.
// Note: axios already throws an error when the status is not 2xx (404, 500, ...),
// so we do not need to check `response.ok` like with fetch. The data is in `response.data`.

// GET /orchids
export function getOrchids() {
  return axios.get(ORCHIDS_URL).then((response) => response.data)
}

// GET /orchids/:id
export function getOrchidById(id) {
  return axios.get(`${ORCHIDS_URL}/${id}`).then((response) => response.data)
}

// POST /orchids   (admin)
export function createOrchid(values) {
  return axios.post(ORCHIDS_URL, values).then((response) => response.data)
}

// PUT /orchids/:id   (admin)
export function updateOrchid(id, values) {
  return axios.put(`${ORCHIDS_URL}/${id}`, values).then((response) => response.data)
}

// DELETE /orchids/:id   (admin)
export function deleteOrchid(id) {
  return axios.delete(`${ORCHIDS_URL}/${id}`).then((response) => response.data)
}
