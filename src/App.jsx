// src/App.js
import React from 'react'
import EmailSignatureForm from './components/EmailSignatureForm'
import './App.css'

const App = () => {
  return (
    <div>
      <h1>Email Signature Generator</h1>
      <p className="instructions">To use this email generator, fill in the fields below and click the "Copy HTML Signature Button", then paste the code into your email signature provider.</p>
      <EmailSignatureForm />
    </div>
  )
}

export default App
