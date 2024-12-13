import axios from 'axios'

const jsonPlaceholderApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export default jsonPlaceholderApi
