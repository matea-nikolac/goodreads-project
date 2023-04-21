import { Buffer } from 'buffer'
import { useNavigate } from 'react-router-dom'

const tokenName = 'user-token'

export const getToken = () => localStorage.getItem(tokenName)

export const setToken = (token) => localStorage.setItem(tokenName, token)

export const getPayload = () => {
  const token = getToken()
  // console.log('TOKEN', token)
  if (!token) return false
  const splitToken = token.split('.')
  const payloadString = splitToken[1]
  return JSON.parse(Buffer.from(payloadString, 'base64'))
}

export const isAuthenticated = () => {
  const payload = getPayload()
  // console.log('PAYLOAD', payload)
  if (!payload) return false
  const timeNow = Date.now() / 1000
  // console.log('IS AUTHENTICATED', payload.exp > timeNow)
  return (payload.exp > timeNow) ? true : false
}

export const handleLogout = (navigate) => {
  localStorage.removeItem(tokenName)
  navigate('/login')
}

// export const setHeaders = () => {
//   return {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   }
// }

// export const userIsOwner = (review) => {
//   const payload = getPayload()
//   if (!payload) return false
//   if (review){
//     const ownerId = review.owner ? review.owner.id : null
//     const addedById = review.addedBy ? review.addedBy._id : null
//     return payload.sub === ownerId || payload.sub === addedById
//   }
// }