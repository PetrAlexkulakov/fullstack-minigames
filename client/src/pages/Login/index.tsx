import { useNavigate } from "react-router-dom"

const Login = ({ name, setName }: { name: string, setName: React.Dispatch<React.SetStateAction<string>> }) => {
  const navigate = useNavigate()

  const handleContinue = () => {
    if (name !== '') {
      navigate('/menu')
    }
  }

  return (
    <>
      <h3>Enter your name</h3>
      <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
      <button className="btn border-primary" onClick={handleContinue}>Continue</button>
    </>
  )
}

export default Login
