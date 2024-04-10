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
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap"
          rel="stylesheet"
        />
        <style>
          .dancing-script-signature {
            font-family: 'Dancing Script', cursive;
            font-weight: 500;
            font-style: normal;
          }
          .signature-table {
            width: 100%;
            max-width: 500px; /* Adjust max-width as needed */
            border-collapse: collapse;
          }
          .signature-table td {
            padding: 6px;
            vertical-align: top;
          }
          .profile-cell {
            padding-right: 0; /* Remove right padding for profile image cell */
            border-right: 1px solid #ccc;
            width: 100px; /* Adjust width of profile image column */
          }
          .profile-cell img {
            display: block;
            width: 100%; /* Ensure profile image fills the column */
            height: auto;
            margin-bottom: 6px;
          }
        </style>
        <title>HTML Email Signature</title>
      </head>
      <body style="margin: 0; padding: 0">
        <p style="margin: 0; font-family: Calibri, sans-serif">Warm Regards,</p>
        <p class="dancing-script-signature" style="margin: 4px 0px; font-size: 18px">
          ${sanitizedFirstName}
        </p>
        <table
          class="signature-table"
          cellpadding="0"
          cellspacing="0"
          style="width: 100%; font-family: Calibri, sans-serif; margin-top: 6px"
        >
          <tr>
            <td class="profile-cell">
              <a
                href="https://peoplescapehr.com/our-team/"
                target="_blank"
                style="text-decoration: none"
              >
                <!-- !REMOVE PLACEHOLDER IMAGE AND COMMENT IN LINE BELOW BEFORE DYPLOYING -->
                <img
                  src="https://cdn.pixabay.com/photo/2017/02/21/16/30/mexico-2086549_1280.jpg"
                  alt="Profile Photo"
                  width="90"
                  height="90"
                />
                <!-- <img
                  src="${sanitizedProfileImg}"
                  alt="Profile Photo"
                  width="90"
                  height="90"
                  style="margin-right: 6px"
                /> -->
                <h5 style="margin: 0; color: #ef8022; font-size: 11px; line-height: 1.15">
                  ${sanitizedFirstName} ${sanitizedLastName}
                </h5>
                <p style="margin: 0; font-size: 10px"><strong>${sanitizedTitle}</strong></p>
              </a>
            </td>
            <td>
              <p style="margin: 0; font-size: 12px">
                <span style="color: #ef8022"><strong>M:</strong></span>
                <a href="tel:760-880-7005" style="text-decoration: none; color: #000">760-880-7005</a>
              </p>
              <p style="margin: 0; font-size: 12px">
                <span style="color: #ef8022"><strong>O:</strong></span>
                <a href="tel:${sanitizedCellPhone}" style="text-decoration: none; color: #000"
                  >${sanitizedCellPhone}</a
                >
              </p>
              <p style="margin: 0; font-size: 12px">
                <a href="mailto:${sanitizedEmail}" style="text-decoration: none; color: #000"
                  >${sanitizedEmail}</a
                >
              </p>
              <a href="https://peoplescapehr.com/" target="_blank">
                <img
                  src="https://peoplescapehr.com/wp-content/uploads/2020/07/peoplescape_logo_2020-e1594693165758.png"
                  alt="Peoplescape HR Logo"
                  width="150"
                  height="auto"
                  style="margin-top: 4px"
                />
              </a>
            </td>
          </tr>
        </table>
        <p style="font-size: 12px; font-family: Calibri, sans-serif; margin: 10px 6px 0">
          <strong
            >I respect your personal time and do not expect a response when you are not at work.</strong
          >
        </p>
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
