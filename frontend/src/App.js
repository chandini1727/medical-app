import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Order from './components/Order';
import Symptom from './components/Symptom';
import PharmacyLocator from './components/PharmacyLocator';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/order" element={<Order />} />
        <Route exact path="/symptom" element={<Symptom />} />
        <Route exact path="/locator" element={<PharmacyLocator />} />
        <Route exact path="/chatbot" element={<Chatbot />} />
        <Route
          exact
          path="/"
          element={
            <h1>
              Welcome!{' '}
              <a href="/order">Order</a> | <a href="/symptom">Symptoms</a> |{' '}
              <a href="/locator">Locator</a> | <a href="/chatbot">Chatbot</a>
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;