// src/App.js
import React from 'react'
import EmailSignatureForm from './components/EmailSignatureForm'
import './App.css'

const App = () => {
  return (
    <div>
      <h1>Email Signature Generator</h1>
      <p className="instructions">To use this email generator, fill in the fields below and click the "Download HTML Signature Button", then rightclick on the file and paste it into your email signature provider.</p>
      <EmailSignatureForm />
    </div>
  )
}

export default App
