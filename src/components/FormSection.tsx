import './FormSection.css'

export interface InputProps{
    id: any,
    label: any,
    name: any,
    type: any,
    placeholder: any,
    errorMessage: any,
    handleChange: any,
    values: any,
    formValidation: any,
}

const FormSection:React.FC <InputProps> = ( props ) => {

    const { formValidation, values, handleChange, errorMessage, ...rest } = props

    return(
      <>
        <div className="formSection">
            <label className='formSection-label'>{rest.name === 'acceptTerms' ? rest.label : rest.label}</label>
            <input className='formSection-input'{...rest}  onChange={handleChange} />
            {values[rest.name] && <span className='formSection-error' style={ formValidation[rest.name] ? {color: 'green'} : {color: 'red'}}>{errorMessage}</span>}
        </div>
      </>
    )
  }
  
  export default FormSection;