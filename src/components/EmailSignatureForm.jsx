import React, { useState } from 'react'
import DOMPurify from 'dompurify'
import { HexColorPicker, HexColorInput } from 'react-colorful'

const EmailSignatureForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [title, setTitle] = useState('')
  const [cellPhone, setCellPhone] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const [email, setEmail] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [logoURL, setLogoURL] = useState('')
  const [color, setColor] = useState('#44a1a0')
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
    const sanitizedCompanyPhone = sanitizeAndEscape(companyPhone)
    const sanitizedCompanyWebsite = sanitizeAndEscape(companyWebsite)
    const sanitizedCellPhone = sanitizeAndEscape(cellPhone)
    const sanitizedEmail = sanitizeAndEscape(email)
    const sanitizedProfileImg = sanitizeAndEscape(photoURL)
    const sanitizedLogo = sanitizeAndEscape(logoURL)

    const signature = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          http-equiv="X-UA-Compatible"
          content="IE=edge"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>HTML Email Signature</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Calibri, sans-serif;">
        <p style="margin: 0; font-family: Calibri, sans-serif;">Warm Regards,</p>
        <p style="margin: 2px 0px 10px 0px; font-family: Calibri, sans-serif;">${sanitizedFirstName}</p>
        <table
          cellpadding="0"
          cellspacing="0"
          style="
            width: 100%;
            height: auto;
            max-width: 500px;
            margin-top: 6px;
            padding-bottom: 0px;
            border-collapse: collapse;
          "
        >
          <tr>
            <td
              style="
                vertical-align: top;
                width: 100px;
                padding-bottom: 0px;
                border-right: 1px solid #ccc;
              "
            >
              <a
                href="${sanitizedLogo}"
                target="_blank"
                style="text-decoration: none"
              >
                <img 
                  src="${sanitizedProfileImg}" 
                  alt="Profile Photo" 
                  width="90" 
                  height="90" 
                  style="margin: 2px 10px 4px 0px"
                />
                <p style="margin: 4px 5px 0px 0px; font-family: Calibri, sans-serif; color:${color}">
                  <strong>${sanitizedFirstName} ${sanitizedLastName}</strong>
                </p>
                <h6 style="margin: 4px 5px 0px 0px; color: #000">
                  <strong>${sanitizedTitle}</strong>
                </h6>
              </a>
            </td>
            <td style="padding-left: 10px; padding-bottom: 0px; vertical-align: top">
              <p
                style="
                  margin: 0;
                  margin-bottom: 2px;
                  padding-bottom: 3px;
                  font-family: Calibri, sans-serif;
                "
              >
                <span
                  style="
                    color:${color};
                    display: inline-block;
                    width: 14px;
                    text-align: center;
                  "
                >
                  <strong>M:&nbsp;&nbsp;</strong>
                </span>
                <a
                  href="tel:${sanitizedCellPhone}"
                  style="
                    text-decoration: none;
                    color: #000;
                    display: inline-block;
                    width: 100px;
                    vertical-align: middle;
                  "
                >
                  ${sanitizedCellPhone}</a
                >
              </p>
              <p
                style="
                  margin: 0;
                  margin-bottom: 2px;
                  padding-bottom: 3px;
                  font-family: Calibri, sans-serif;
                "
              >
                <span
                  style="
                    color:${color};
                    display: inline-block;
                    width: 14px;
                    text-align: center;
                  "
                >
                  <strong>O:&nbsp;&nbsp;</strong>
                </span>
                <a
                  href="${sanitizedCompanyPhone}"
                  style="
                    text-decoration: none;
                    color: #000;
                    display: inline-block;
                    width: 100px;
                    vertical-align: middle;
                  "
                >
                  ${sanitizedCompanyPhone}</a
                >
              </p>
              <p style="margin: 0; margin-bottom: 2px; padding-bottom: 3px; font-family: Calibri, sans-serif;">
                <a
                  href="mailto:${sanitizedEmail}"
                  style="
                    text-decoration: none;
                    color: #000;
                  "
                  >${sanitizedEmail}</a
                >
              </p>
              <a
                href="${sanitizedCompanyWebsite}"
                target="_blank"
              >
                <img
                  src="${sanitizedLogo}"
                  alt="Company Logo"
                  width="150"
                  height="auto"
                  style="margin-top: 10px; margin-bottom: 0px; padding-bottom: 0px;"
                />
              </a>
            </td>
          </tr>
        </table>
        <p style="margin: 12px 0px 0px 0px; font-family: Calibri, sans-serif;">
          <strong
            >I respect your personal time and do not expect a response when you are
            not at work.</strong
          >
        </p>
      </body>
    </html>
                `
    return signature
  }

  const handleDownloadSignature = (e) => {
    e.preventDefault()
    if (
      !firstName ||
      !lastName ||
      !title ||
      !cellPhone ||
      !email ||
      !photoURL
    ) {
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
      <div className='form-background'>
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
          <label>Company Phone:</label>
          <input
            type='tel'
            value={companyPhone}
            placeholder='555-867-5309'
            required
            onChange={(e) => {
              const formattedPhone = e.target.value
                .replace(/\D/g, '') // Remove non-numeric characters
                .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') // Format to XXX-XXX-XXXX
              setCompanyPhone(formattedPhone)
            }}
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
          <p className='placeholder'>
            Here is a placeholder you can use for
            testing: https://rb.gy/4ash41
          </p>
          <br />
          <label>Company Logo URL:</label>
          <input
            type='url'
            value={logoURL}
            placeholder='https://example.com'
            required
            onChange={(e) => setLogoURL(e.target.value)}
          />
          <p className='placeholder'>
            Here is a placeholder you can use for
            testing: https://rb.gy/s23eb1
          </p>
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleDownloadSignature}>
            Download HTML Signature
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmailSignatureForm
