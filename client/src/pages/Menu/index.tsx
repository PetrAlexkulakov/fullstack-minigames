import { useNavigate } from "react-router-dom"
import axios from "axios"
import { basicUrl } from "../../share/basicUrl"
import { useEffect, useState } from "react"
import { IGame } from "../../share/interfaces/Game"
import PageWrapper from "../../components/PageWrapper"

const Menu = ({ name }: { name: string }) => {
  const navigate = useNavigate()
  const [isTictacAvailable, setIsTictacAvailable] = useState(false)//todo
  let availableGames: IGame[] = []

  const handleStart = async () => {
    availableGames = (await axios.get(`${basicUrl}/games`)).data
    .filter((elem: { player2: null }) => elem.player2 === null)
    if (availableGames.length === 0) {   
        await axios.post(`${basicUrl}/game/createGame`, {
            player1: name,
            player2: null
        })
    } else {
      const gameRoom = availableGames[0]
      gameRoom.player2 = name
      await axios.put(`${basicUrl}/game/${gameRoom.id}`, gameRoom)

      navigate("/tictactoe")
    }
  }

  useEffect(() => {
    if (availableGames.length > 0) {
      setIsTictacAvailable(true)
    } else {
      setIsTictacAvailable(false)
    }
  }, [availableGames])

  return (
    <PageWrapper>
      <h1>Hello, {name}!</h1>
      <button className="btn border-primary" onClick={handleStart}>
        { isTictacAvailable ? 
          <div>Create Room: Tic-tac-toe</div>
          :
          <div>Go To Room: Tic-tac-toe</div>
        }
      </button>
    </PageWrapper>
  )
}

export default Menu
