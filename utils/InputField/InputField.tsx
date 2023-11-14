import { ChangeEventHandler } from 'react'
import styles from './InputField.module.css'

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
            <p className='text-[22px]'>{text}</p>
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

export default InputField