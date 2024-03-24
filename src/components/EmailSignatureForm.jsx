import React, { useState } from 'react'
import DOMPurify from 'dompurify'

const EmailSignatureForm = () => {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [cellPhone, setCellPhone] = useState('')
  const [email, setEmail] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [error, setError] = useState('')

  const sanitizeAndEscape = (input) => {
    const sanitizedInput = DOMPurify.sanitize(input)
    return sanitizedInput
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  const isValidEmail = (email) => {
    // Simple email validation using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const isValidURL = (url) => {
    // Simple URL validation using regex
    const urlPattern = /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.[\w\d]{2,}$/i
    return urlPattern.test(url)
  }

  const generateSignature = () => {
    const sanitizedName = sanitizeAndEscape(name)
    const sanitizedTitle = sanitizeAndEscape(title)
    const sanitizedCellPhone = sanitizeAndEscape(cellPhone)
    const sanitizedEmail = sanitizeAndEscape(email)
    const sanitizedProfileImg = sanitizeAndEscape(photoURL)

    const signature = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Signature</title>
      </head>
      <body style="font-family: Arial, sans-serif">
        <table cellpadding="0" cellspacing="0" style="width: 300px;">
          <tr>
            <td style="padding: 4px 10px; border-right: 1px solid #ccc">
              <img src="https://res.cloudinary.com/dovuffpii/image/upload/v1711154514/Peoplescape/belinda_uuekxk.jpg" alt="Profile Photo" width="90" height="90" />
              <h5 style="margin: 3px 0px; color: #ef8022; font-size: 13px;">Belinda Morris</h5>
              <p style="margin: 0; font-size: 10px"><strong>CEO &amp; Founder</strong></p>
            </td>
            <td style="padding: 0px 10px">
              <p style="margin: 0px; font-size: 12px">
                <span style="color:#ef8022;"><strong>M:</strong></span>
                <a href="tel:760-880-7005" style="text-decoration: none; color: #000; cursor:pointer;">760-880-7005</a>
              </p>
              <p style="margin: 6px 0px; font-size: 12px">
                <span style="color:#ef8022;"><strong>O:</strong></span>
                <a href="tel:3239000511" style="text-decoration: none; color: #000; cursor:pointer;">323-900-0511</a>
              </p>
              <p style="margin: 4px 0px; font-size: 12px">
                <a href="mailto:belinda@peoplescapehr.com" style="text-decoration: none; color: #000; cursor:pointer;">belinda@peoplescapehr.com</a>
              </p>
              <img src="https://res.cloudinary.com/dovuffpii/image/upload/v1711154850/Peoplescape/peoplescape-hr-logo_figp7x.png" alt="Peoplescape HR Logo" width="150" height="auto" />
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
    return signature
  }

  const handleDownloadSignature = () => {
    if (!name || !title || !cellPhone || !email || !photoURL) {
      setError('Please fill in all fields.')
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
    } else if (!isValidURL(photoURL)) {
      setError('Please enter a valid URL for the Profile Photo.')
    } else {
      const signature = generateSignature()
      const blob = new Blob([signature], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${sanitizeAndEscape(name)}_signature.html`
      a.click()
      setError('')
    }
  }

  return (
    <div className='email-generator'>
      <label>Name:</label>
      <input type='text' value={name} required onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Title:</label>
      <input type='text' value={title} required onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Mobile Phone:</label>
      <input type='tel' value={cellPhone} required onChange={(e) => setCellPhone(e.target.value)} />
      <br />
      <label>Email:</label>
      <input type='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Profile Photo URL:</label>
      <input type='url' value={photoURL} required onChange={(e) => setPhotoURL(e.target.value)} />
      <br />
      <button onClick={handleDownloadSignature}>Download HTML Signature</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default EmailSignatureForm
