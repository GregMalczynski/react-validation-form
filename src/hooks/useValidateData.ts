import { useState } from 'react';

const useValidateData = () => {

    const [ values, setValues ] = useState<any>({
        username: '',
        email: '',
        birthday: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      })

    const [ error, setError ] = useState<any>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })

    const [ confirmPasswordDisable, setConfirmPasswordEnableDisable ] = useState(true)

      const [ formValidation, setFormValidation ] = useState<any>({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        acceptTerms: false,
      })

    
    const usernameValidate = () => {

        setFormValidation({...formValidation, username: false})
    
        const validParm = {
          minLength: 4,
          maxLength: 12,
          textFormat: /^[A-Za-z]+$/
        }
    
        const { minLength, maxLength, textFormat } = validParm;
    
        const fieldValue = values.username.trim()
    
          if ( fieldValue.length < minLength || fieldValue.length > maxLength ) {
            setError({...error, username: `Invalid length / should be between ${minLength} - ${maxLength} characters`})
          } else if (!fieldValue.match(textFormat)) {
            setError({...error, username: 'Only letters'})
          } else {
            setError({...error, username: 'Success'})
            setFormValidation({...formValidation, username: true})
          }
    }
    
    const emailValidate = () => {
    
        setFormValidation({...formValidation, email: false})
    
        const validParm = {
          textFormat: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
    
        const { textFormat } = validParm;
    
        const fieldValue = values.email.trim()

        if ( !fieldValue.match(textFormat) ) {
            setError({...error, email: 'Email should contains @ character'})
          } else {
            setError({...error, email: 'Success'})
            setFormValidation({...formValidation, email: true})
          }
    }
    
    const passwordValidate = () => {
    
        setFormValidation({...formValidation, password: false})
    
        const validParm = {
          minLength: 6,
          textFormat: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        }
    
        const { minLength, textFormat } = validParm;
    
        const fieldValue = values.password.trim()
    
          if ( !fieldValue.match(textFormat) || fieldValue.length < minLength ) {
            setConfirmPasswordEnableDisable(true)
            setError({...error, password: `Password must has at least ${minLength} characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)`})
          } 
          
          else {
            setError({...error, password: 'Success'})
            setConfirmPasswordEnableDisable(false)
            setFormValidation({...formValidation, password: true})
          }
    }
    
    const confirmPasswordValidate = () => {
    
        setFormValidation({...formValidation, confirmPassword: false})
    
        const fieldValue = values.confirmPassword.trim()
      
          if ( !confirmPasswordDisable ) {
    
            if ( fieldValue === values.password ) {
              setError({...error, confirmPassword: 'Success'})
              setFormValidation({...formValidation, confirmPassword: true})
            } else {
              setError({...error, confirmPassword: 'Password not match'})
            }
        }
      }

      return [ 
        values, 
        setValues, 
        error, 
        confirmPasswordDisable, 
        formValidation, 
        usernameValidate, 
        emailValidate, 
        passwordValidate, 
        confirmPasswordValidate, 
        setFormValidation 
        ]
}

export default useValidateData;