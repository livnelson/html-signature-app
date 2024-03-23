import React, { useState } from 'react'
import DOMPurify from 'dompurify'

const EmailSignatureForm = () => {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [cellPhone, setCellPhone] = useState('')
  const [email, setEmail] = useState('')
  const [photoURL, setPhotoURL] = useState('')

  const sanitizeAndEscape = (input) => {
    const sanitizedInput = DOMPurify.sanitize(input)
    return sanitizedInput
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
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
        <table cellpadding="0" cellspacing="0" style="width: auto; height: 121px;">
          <tr>
            <td style="padding: 4px 10px; border-right: 1px solid #ccc">
              <img
                src="${sanitizedProfileImg}"
                alt="Profile Photo"
                style="width: 90px; height: 90px;"
              />
              <h5 style="margin: 3px 0px 0px 0px; color: #ef8022; font-size: 13px;">${sanitizedName}</h5>
                <p style="margin: 0; font-size: 10px"><strong>${sanitizedTitle}</strong></p>
            </td>
            <td style="padding: 0px 10px">
              <p style="margin: 0px; font-size: 12px">
                <span style="color:#ef8022;"><strong>M:</strong></span>
                <a href="tel:${sanitizedCellPhone}" style="text-decoration: none; color: #000; cursor:pointer;">${sanitizedCellPhone}</a>
              </p>
              <p style="margin: 6px 0px; font-size: 12px">
                <span style="color:#ef8022;"><strong>O:</strong></span>
                <a href="tel: 3239000511" style="text-decoration: none; color: #000; cursor:pointer;">323-900-0511</a>
              </p>
              <p style="margin: 4px 0px; font-size: 12px">
                <a href="mailto:${sanitizedEmail}" style="text-decoration: none; color: #000; cursor:pointer;"
                  >${sanitizedEmail}</a
                >
              </p>
              <img
                src="https://res.cloudinary.com/dovuffpii/image/upload/v1711154850/Peoplescape/peoplescape-hr-logo_figp7x.png"
                alt="Peoplescape HR Logo"
                style="width: 150px; margin-top: 4px;"
              />
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
    return signature
  }

  const handleCopySignature = () => {
    const signature = generateSignature()
    navigator.clipboard
      .writeText(signature)
      .then(() => alert('HTML signature copied to clipboard!'))
      .catch((error) => console.error('Clipboard copy error:', error))
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
      <button onClick={handleCopySignature}>Copy HTML Signature</button>
    </div>
  )
}

export default EmailSignatureForm