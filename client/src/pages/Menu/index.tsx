import { useNavigate } from "react-router-dom"
import axios from "axios"
import { basicUrl } from "../../share/basicUrl"

const Menu = ({ name }: { name: string }) => {
  const navigate = useNavigate()
  const handleStart = async () => {
    console.log(name)
    const availableGames = (await axios.get(`${basicUrl}/games`)).data
        .filter((elem: { player2: null }) => elem.player2 === null)
    if (availableGames.length === 0) {   
        await axios.post(`${basicUrl}/createGame`, {
            player1: name,
            player2: null
        })
    } else {
        navigate("/tictactoe")
    }
    
  }
  return (
    <>
      <h1>Hello, {name}!</h1>
      <button className="btn border-primary" onClick={handleStart}>Create Room: Tic-tac-toe</button>
    </>
  )
}

export default Menu
