import React, { useState } from 'react'
import DOMPurify from 'dompurify'

const EmailSignatureForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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

  const generateSignature = () => {
    const sanitizedFirstName = sanitizeAndEscape(firstName)
    const sanitizedLastName = sanitizeAndEscape(lastName)
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
      </head>    
      <body>
        <p style="font-family: Arial, sans-serif; font-size: 12px; margin: 6px 6px;">Warm Regards,</p>
        <p style="font-family: Arial, sans-serif; font-size: 18px; line-height: 1; margin: 6px 0px 4px 6px;">Name</p>
        <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; max-width: 320px; ">
          <tr>
            <td style="padding: 4px 10px; border-right: 1px solid #ccc; max-width: 104px;">
              <img src="${sanitizedProfileImg}" alt="Profile Photo" width="90" height="90" />
              <h5 style="margin: 3px 0px; color: #ef8022; font-size: 13px;">${sanitizedFirstName} ${sanitizedLastName}</h5>
              <p style="margin: 0; font-size: 10px;"><strong>${sanitizedTitle}</strong></p>
            </td> 
            <td style="padding: 0px 10px; margin-top: 0px; margin-bottom: 0px;">
              <div style="vertical-align: top; margin-left: 4px;">
                <p style="margin: 0px; font-size: 12px; line-height: 16px;">
                  <span style="color:#ef8022;"><strong>M:</strong></span>
                  <a href="tel:760-880-7005" style="text-decoration: none; color: #000; cursor:pointer;">760-880-7005</a>
                </p>
                <p style="margin: 6px 0px; font-size: 12px; line-height: 16px;">
                <span style="color:#ef8022;"><strong>O:</strong></span>
                <a href="tel:${sanitizedCellPhone}" style="text-decoration: none; color: #000; cursor:pointer;">${sanitizedCellPhone}</a>
                </p>
                <p style="margin: 6px 0px; font-size: 12px; line-height: 16px;">
                  <a href="mailto:${sanitizedEmail}" style="text-decoration: none; color: #000; cursor:pointer;">${sanitizedEmail}</a>
                </p>
                <img
                  src="https://peoplescapehr.com/wp-content/uploads/2020/07/peoplescape_logo_2020-e1594693165758.png"
                  alt="Peoplescape HR Logo"
                  width="150"
                  height="auto"
                  style="margin-top: px;"
                />
              </div>
            </td>
          </tr>
        </table>
        <p style="font-size: 12px; font-family: Arial, sans-serif; margin: 10px 0px 0px 6px;"><strong>I respect your personal time and do not expect a response when you are not at work.</strong></p>
      </body>
    </html>
   `
    return signature
  }

  const handleDownloadSignature = (e) => {
    e.preventDefault()
    if (!firstName || !lastName || !title || !cellPhone || !email || !photoURL) {
      setError('Please fill in all fields.')
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
    } else {
      const signature = generateSignature()
      const blob = new Blob([signature], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${sanitizeAndEscape(firstName)}_signature.html`
      a.click()
      setError('')
    }
  }

  return (
    <div className='email-generator'>
      <form className='email-generator-form'>
        <label>First Name:</label>
        <input
          type='text'
          value={firstName}
          placeholder='John'
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label>Last Name:</label>
        <input
          type='text'
          value={lastName}
          placeholder='Doe'
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label>Title:</label>
        <input
          type='text'
          value={title}
          placeholder='Job Title'
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Mobile Phone:</label>
        <input
          type='tel'
          value={cellPhone}
          placeholder='555-867-5309'
          required
          onChange={(e) => {
            const formattedPhone = e.target.value
              .replace(/\D/g, '') // Remove non-numeric characters
              .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') // Format to XXX-XXX-XXXX
            setCellPhone(formattedPhone)
          }}
        />
        <br />
        <label>Email:</label>
        <input
          type='email'
          value={email}
          placeholder='name@website.com'
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Profile Photo URL:</label>
        <input
          type='url'
          value={photoURL}
          placeholder='https://example.com'
          required
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <br />
        <button onClick={handleDownloadSignature}>Download HTML Signature</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default EmailSignatureForm
