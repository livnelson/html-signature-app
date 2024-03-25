// src/App.js
import React from 'react'
import EmailSignatureForm from './components/EmailSignatureForm'
import './App.css'

const App = () => {
  return (
    <div className='email-generator'>
      <h1>Email Signature Generator</h1>
      <h2>Ready to create your signature?</h2>
      <ol className='instructions'>
        <li>Fill in the information you want to include (name, title, etc).</li>
        <li> Click the "Download HTML Signature Button."</li>
        <li>You'll see a downloaded file on your computer. Right-click on it and choose "copy."</li>
        <li>
          Then, head over to your email signature settings and find the edit/add signatiure option.
          Paste the entire file there.
        </li>
      </ol>
      <EmailSignatureForm />
    </div>
  )
}

export default App
