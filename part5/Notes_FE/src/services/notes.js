import axios from "axios"

const baseUrl = '/api/notes'
// CHANGED
// const baseUrl = 'http://localhost:3002/notes'

let token = null

const setToken = newToken => {
  token = newToken ? `Bearer ${newToken}` : null
  console.log('token now:', token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {  
  const config = {
    headers: { Authorization: token }
  }

  console.log('sending token:', token)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data

//  BEFORE:
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
}

const update = async (id, newObject) => {    
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  console.log('sending token:', token)

  const response = await axios.delete(`${baseUrl}/${id}`, config) 
  return response.data
}

export default { getAll, create, update, remove, setToken }