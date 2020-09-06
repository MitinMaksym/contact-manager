import { takeEvery, call, all, put } from 'redux-saga/effects'
import { contactsApi } from '../api/api'
import {
  FETCH_CONTACTS,
  REQUEST_CONTACTS,
  REMOVE_CONTACT,
  CONTACT_DELETED,
  SET_LOADING,
  ADD_CONTACT,
  CONTACT_ADDED,
  GET_CONTACT,
  RETRIEVED_CONTACT_FOR_UPADATE,
  CONTACT_UPDATED,
  UPDATE_CONTACT
} from './types'

export function* sagaWatcher() {
  yield all([
    takeEvery(REQUEST_CONTACTS, requestContacts),
    takeEvery(REMOVE_CONTACT, deleteContact),
    takeEvery(ADD_CONTACT, addContact),
    takeEvery(GET_CONTACT, getContact),
    takeEvery(UPDATE_CONTACT, updateContact)
  ])
}

function* requestContacts() {
  try {
    yield put({ type: SET_LOADING, payload: true })
    const result = yield call(contactsApi.getContacts)
    if (result.status === 'success') {
      yield put({ type: FETCH_CONTACTS, payload: result.data })
      yield put({ type: SET_LOADING, payload: false })
    }
  } catch (err) {
    yield put({ type: SET_LOADING, payload: false })
    console.log(err)
  }
}

function* deleteContact(action) {
  try {
    yield put({ type: SET_LOADING, payload: true })

    const result = yield call(contactsApi.deleteContact, action.payload)
    if (result.status === 'success') {
      yield put({ type: CONTACT_DELETED, payload: action.payload })
      yield put({ type: SET_LOADING, payload: false })
    }
  } catch (err) {
    yield put({ type: SET_LOADING, payload: false })
    console.log(err)
  }
}

function* addContact(action) {
  try {
    const result = yield call(contactsApi.addContact, action.payload)
    if (result.status === 'success') {
      yield put({ type: CONTACT_ADDED, payload: result.data })
    }
  } catch (err) {
    console.log(err)
  }
}

function* getContact(action) {
  try {
    yield put({ type: SET_LOADING, payload: true })

    const result = yield call(contactsApi.getContact, action.payload)
    if (result.status === 'success') {
      yield put({ type: RETRIEVED_CONTACT_FOR_UPADATE, payload: result.data })
      yield put({ type: SET_LOADING, payload: false })
    }
  } catch (err) {
    console.log(err)
    yield put({ type: SET_LOADING, payload: false })
  }
}

function* updateContact({ payload: { id, newContact } }) {
  try {
    const result = yield call(contactsApi.updateContact, id, newContact)
    if (result.status === 'success') {
      yield put({ type: CONTACT_UPDATED, payload: result.data })
    }
  } catch (err) {
    console.log(err)
  }
}
