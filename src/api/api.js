import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:9000/'

export const contactsApi = {
  getContacts: () => {
    return axios
      .get('users')
      .then((data) => {
        if (data.status === 200) {
          return { status: 'success', data: data.data }
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
  deleteContact: (id) => {
    return axios
      .delete(`users/${id}`)
      .then((data) => {
        if (data.status === 204) {
          return {
            status: 'success',
            data: data.data
          }
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
  addContact: (contact) => {
    return axios
      .post('users', contact)
      .then((data) => {
        if (data.status === 201) {
          return { status: 'success', data: data.data }
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  },

  getContact: (id) => {
    return axios
      .get(`users/${id}`)
      .then((data) => {
        if (data.status === 200) {
          return { status: 'success', data: data.data }
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
  updateContact: (id, updatedContact) => {
    return axios
      .put(`users/${id}`, updatedContact)
      .then((data) => {
        if (data.status === 200) {
          return {
            status: 'success',
            data: data.data
          }
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}
