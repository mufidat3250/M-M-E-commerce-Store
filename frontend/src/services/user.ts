import axios from "axios";


const baseUrl = 'http://localhost:8000/api/v1'

// interface IUserCredential {
//     name: string,
//     email:string,
//     file:string
// }

const createUser = async(userCredentials:unknown) => {
  const config = {headers: {"Content-Type" : "multipart/form-data"}}
  const response =  await axios.post(`${baseUrl}/auth/create-user`, userCredentials, config)
  return response.data
}

export default {
    createUser,
}