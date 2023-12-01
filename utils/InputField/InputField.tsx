import { ChangeEventHandler } from 'react'
import styles from './InputField.module.css'

interface TextareaFieldProps {
    text: string
    error: string
    touched: boolean
    placeholder: string
    name: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    value: string
    maxLength?: number
    title?: string
}

interface InputFieldProps {
    text: string
    error: string
    touched: boolean
    type: string
    placeholder: string
    name: string
    onChange: ChangeEventHandler<HTMLInputElement>
    value: string
    maxLength?: number
    title?: string
}

const InputField = ({
    text,
    error,
    touched,
    type,
    placeholder,
    name,
    onChange,
    value,
    title,
    maxLength = 1000000
}: InputFieldProps) => {
    return (
        <>
            <p className={styles.text}>{text}</p>
            <div className='mainInput'>
                <input
                    className={error && touched && error ? styles.inputError : ''}
                    type={type === 'email' ? 'text' : type}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    value={value}
                    maxLength={maxLength}
                    title={title || ''}
                />
            </div>
            <p className={styles.error}>{error && touched && error}</p>
        </>
    )
}

export const TextareaField = ({
    text,
    error,
    touched,
    placeholder,
    name,
    onChange,
    value,
    title,
    maxLength = 1000000
}: TextareaFieldProps) => {
    return (
        <>
            <p className={styles.text}>{text}</p>
            <div className='mainInput'>
                <textarea
                    className={error && touched && error ? styles.inputError : ''}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    value={value}
                    maxLength={maxLength}
                    title={title || ''}
                />
            </div>
            <p className={styles.error}>{error && touched && error}</p>
        </>
    )
}

export default InputField