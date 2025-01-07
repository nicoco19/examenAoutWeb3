import axios from "axios"

const baseUrl = "http://localhost:3000/books"

const getAll = () => axios.get(baseUrl).then(response => response.data)
const update = (book, payload) => axios.patch(`${baseUrl}/${book}`, payload).then(response => response.data)
const create = (bookPayload) => axios.post(baseUrl, bookPayload).then(response => response.data)
const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default {getAll, update, create, remove}