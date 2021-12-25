import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Customer from './Customers';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar';




ReactDOM.render(

    <Router>
    <Navbar></Navbar>
    <Switch>
    <Route path="/customers">
           <Customer/>
       </Route> 
    <Route path="/">
           <App/>
       </Route>

    </Switch>
    </Router>       
    ,document.getElementById('root')
);


