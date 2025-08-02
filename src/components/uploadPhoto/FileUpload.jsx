import React from 'react'
import './FileUpload.scss'

// component for file upload
function FileUpload({
  onChange,
  file,
  error = false,
  errorText,
  className = '',
  accept = 'image/*',
  placeholder = 'Upload your photo',
}) {
  return (
    <div className={`file-upload__container ${className}`}>
      <div
        className={`file-upload__wrapper ${
          error ? 'file-upload__wrapper--error' : ''
        }`}
      >
        {/* Button and input for file selection */}
        <label className="file-upload__label">
          <span className="file-upload__button">Upload</span>
          <input
            className="file-upload__input"
            type="file"
            accept={accept}
            onChange={onChange}
          />
        </label>
        {/* Name of the selected file or placeholder */}
        <span className="file-upload__name">
          {file ? file.name : placeholder}
        </span>
      </div>
      {/* Error text if any */}
      {error && errorText && (
        <p className="file-upload__error-text">{errorText}</p>
      )}
    </div>
  )
}

export default FileUpload
