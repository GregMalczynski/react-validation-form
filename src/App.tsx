import MainForm from "./components/MainForm";
import SuccessSent from "./components/SuccessSent";
import { useState } from 'react';

const App:React.FC = () => {

  const [ isValidate, setIsValidate ] = useState<any>(false)

  return(
    <>
      {!isValidate ? <MainForm setIsValidate={setIsValidate}/> : <SuccessSent />}
    </>
  )
}

export default App;