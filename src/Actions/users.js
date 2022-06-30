import axios from 'axios'
import config from '../config.json'
import {usersListStore} from "../Store"
import { isValidUrl } from "../helpers/forms"


export const fetchUsers = async (query = '') => {
    try {
      const url = config.url + '/users' + query
      const response = await getData(url)
      usersListStore.update(() => response)
    } catch (error) {
      const result = []
      result['error'] = error.message
      usersListStore.update(() => result)
    }
}

export const addUser = async (data) => {
  const user = await isExistUser(data.username)
  if (user.length > 0) {
    let result = []
    if (!user.error) {
      result['error'] = "Пользователь с таким никнейном существует"
    } else {
      result = user
    }
    return result
  }
  if (!isValidUrl(data.profile_link)) {
    data.profile_link = ''
  }
  const url = config.url + '/users'
  return await sendData(url, data, 'POST')
}

export const editUser = async (userId, data) => {
  if (!isValidUrl(data.profile_link)) {
    data.profile_link = ''
  }
  const url = config.url + '/users/' + userId
  return await sendData(url, data, 'PUT')
}

const sendData = async (url, data, method='POST') => {
  try {
    let response = []
    switch (method) {
      case "POST":
        response = await axios.post(url, data)
        return response.data
      case "PUT":
        response = await axios.put(url, data)
        return response.data
      default:
        return response
    }
  } catch (error) {
    const result = []
    result['error'] = error.message
    return result
  }
}

const getData = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    const result = []
    result['error'] = error.message
    return result
  }
}

const isExistUser = async (username) => {
  const url = config.url + '/users?username=' + username
  return await getData(url)
}