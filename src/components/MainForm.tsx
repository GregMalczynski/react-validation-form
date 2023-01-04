import './App.css';
import { useEffect, useState } from 'react';
import useValidateData from '../hooks/useValidateData';
import FormSection from '../components/FormSection';

export interface ValidateProps{
    setIsValidate: any,
}

const MainForm:React.FC <ValidateProps> = ({setIsValidate}) => {

  const  [ 
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
  ] = useValidateData()

  const [ checkTermsMessage, setCheckTermsMessage ] = useState(false)

  useEffect(() => {
    usernameValidate()
  }, [values.username])

  useEffect(() => {
    emailValidate()
  }, [values.email])

  useEffect(() => {
    passwordValidate()
  }, [values.password])

  useEffect(() => {
    confirmPasswordValidate()
  }, [values.confirmPassword])

  const inputs = [
    {
      id: 1,
      label: 'Username',
      name: 'username',
      type: 'text',
      errorMessage: error.username,
      placeholder: 'Username',
      required: true,
    },
    {
      id: 2,
      label: 'Email',
      name: 'email',
      type: 'text',
      errorMessage: error.email,
      placeholder: 'Email',
      required: true,
    },
    {
      id: 3,
      label: 'Birthday',
      name: 'birthday',
      type: 'date',
      errorMessage: '',
      placeholder: 'Birthday',
    },
    {
      id: 4,
      label: 'Password',
      name: 'password',
      type: 'password',
      errorMessage: error.password,
      placeholder: 'Password',
      required: true,
    },
    {
      id: 5,
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      errorMessage: error.confirmPassword,
      placeholder: 'Confirm Password',
      required: true,
      disabled: confirmPasswordDisable,
    },
  ]

  const handleChangeTerms = () => {
    setValues({...values, acceptTerms: !values.acceptTerms})
    setFormValidation({...formValidation, acceptTerms: !formValidation.acceptTerms})
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const { username, email, password, confirmPassword, acceptTerms } = formValidation

    if ( username && email && password && confirmPassword ) {
      if ( !acceptTerms ) {
        setCheckTermsMessage(true)
      } else {
        setIsValidate(true)
          let validValues = values
          console.log(validValues)
      }
    }
  }

  const handleChange = (e: any) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

console.count('render')
  return(
    <>
      <div className='app'>
        <div className='app-wrapper'>
        <div className='app-name'>Login Form</div>
          <form className='app-form' onSubmit={handleSubmit}>
            {inputs.map((item: any) => 
              <FormSection 
                key={item.id} 
                {...item} 
                handleChange={handleChange} 
                values={values}
                formValidation={formValidation}
              />)}
              <div className='form-terms-wrapper'>
                <div className='form-terms-text'>
                  Terms : App is an abbreviated form of the word "application." An application is a software program that's 
                  designed to perform a specific function directly for the user or, in some cases, for another application program.
                </div>
                <div className='form-terms-checkbox'>
                  <input type='checkbox' value={values.acceptTerms} checked={values.acceptTerms} onChange={handleChangeTerms}></input> Accept Terms <br/>
                  <span className='formSection-error'>{checkTermsMessage ? 'Please accept terms' : ''}</span>
                </div>
              </div>
              <button className='form-submit'>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default MainForm;