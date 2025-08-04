import React from 'react'
import { cx } from '../../utils/classNames'
import styles from './FileUpload.module.scss'

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
    <div className={cx(styles['file-upload__container'], className)}>
      <div
        className={cx(styles['file-upload__wrapper'], {
          [styles['file-upload__wrapper--error']]: error,
        })}
      >
        <label className={styles['file-upload__label']}>
          <span className={styles['file-upload__button']}>Upload</span>
          <input
            className={styles['file-upload__input']}
            type="file"
            accept={accept}
            onChange={onChange}
          />
        </label>
        <span className={styles['file-upload__name']}>
          {file ? file.name : placeholder}
        </span>
      </div>
      {error && errorText && (
        <p className={styles['file-upload__error-text']}>{errorText}</p>
      )}
    </div>
  )
}

export default FileUpload
