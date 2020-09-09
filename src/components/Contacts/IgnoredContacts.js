import React,{Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { SEND_IGNORED } from '../../redux/types';

import Contact from './Contact/Contact';
import Spinner from '../Spinner/Spinner';




function IgnoredContacts(props) {
const isLoading = useSelector((state) => state.isLoading)
const ignoredContacts = useSelector((state) => state.ignoredContacts)
const dispatch = useDispatch()
 
 const sendIgnoredContacts = (users) => {
   dispatch({type:SEND_IGNORED, payload: users})
 }
  
    if (!ignoredContacts.length && !isLoading) return <h2>IGNORED CONTACTS NOT FOUND</h2>
    if (isLoading) {
        return <Spinner/>
    }
    return  (
        <Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Ignored</span> List
        </h1>
        {ignoredContacts.map((contact,idx) => {
            return <Contact key={contact.id} contact={contact}/>
        })}
         <input
            type="submit"
            value="Send Far Away"
            className="btn btn-light btn-block"
            onClick = {() => sendIgnoredContacts(ignoredContacts)}
          />
        
      </Fragment>
    )
  }


  export default IgnoredContacts