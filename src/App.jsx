import { useState } from 'react'
import EmailSignatureForm from './components/EmailSignatureForm'
import './App.css'

const App = () => {
  const [generatedSignature, setGeneratedSignature] = useState('')
  const [signature, setSignature] = useState('')

  const handlePreviewUpdate = (generatedSignature) => {
    setSignature(generatedSignature)
  }

  const handleGenerateSignature = (signature) => {
    setGeneratedSignature(signature)
  }

  return (
    <div className='email-generator'>
      <div className='form-container'>
        <h1>Email Signature Generator</h1>
        <h2>Ready to create your signature?</h2>
        <ol className='instructions'>
          <li>
            Fill in the information you want to include (name, title, etc).
          </li>
          <li>Click the "Download HTML Signature" button.</li>
          <li>
            You'll see a downloaded file on your computer. Right-click on it and
            choose "copy."
          </li>
          <li>
            Then, head over to your email signature settings and find the
            edit/add signature option. Paste the entire file there.
          </li>
        </ol>
        <EmailSignatureForm
          onGenerateSignature={handleGenerateSignature}
          onPreviewUpdate={handlePreviewUpdate}
          signature={signature}
          generatedSignature={generatedSignature}
        />
      </div>
      {/* <div className='preview-container'>
        <h3>Preview</h3>
        <div className='preview' dangerouslySetInnerHTML={{ __html: signature }}></div>
      </div> */}
    </div>
  )
}

export default App
