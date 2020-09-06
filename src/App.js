import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Contacts from './components/Contacts/Contacts'
import Header from './components/layout/Header'
import { Switch, Route } from 'react-router-dom'
import AddContact from './components/Contacts/AddContact'
import UpdateContact from './components/Contacts/UpdateContact'

function App() {
  return (
    <div className="App">
      <Header branding="Contact Manager" />
      <Switch>
        <Route path="/" exact component={Contacts} />
        <Route path="/contact/add" exact component={AddContact} />
        <Route path="/contact/update/:id" exact component={UpdateContact} />
      </Switch>
    </div>
  )
}

export default App
