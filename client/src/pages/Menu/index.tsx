import { useNavigate } from "react-router-dom"
import axios from "axios"
import { socket } from "../../share/socket"
import { useEffect, useState } from "react"
import { IGame } from "../../share/interfaces/Game"
import PageWrapper from "../../components/PageWrapper"

const Menu = ({ name }: { name: string }) => {
  const navigate = useNavigate()
  const [isTictacAvailable, setIsTictacAvailable] = useState(false)
  const [isTictacCreated, setIsTictacCreated] = useState(false)
  const [isTenAvailable, setIsTenAvailable] = useState(false)
  const [isTenCreated, setIsTenCreated] = useState(false)
  const [availableGames, setAvailableGames] = useState<IGame[]>([])
  const basicUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;  

  const checkIsTictacAvailable = (array = availableGames) => {
    if (array.length > 0) {
      setIsTictacAvailable(true);
    } else {
      setIsTictacAvailable(false);
    }
  }

  const checkIsTenAvailable = (array = availableGames) => {
    if (array.length > 0) {
      setIsTenAvailable(true);
    } else {
      setIsTenAvailable(false);
    }
  }

  const getAvailableGames = async () => {
    try {
      const res : IGame[] = (await axios.get(`${basicUrl}/game/games`)).data;

      setIsTictacCreated(res.some((obj: IGame) => obj.player1 === name && obj.player2 == null && obj.gameType === 'tictactoe'));
      setIsTenCreated(res.some((obj: IGame) => obj.player1 === name && obj.player2 == null && obj.gameType === 'tensticks'))

      const filteredResTic = res.filter((elem: IGame) => elem.player2 === null && elem.player1 !== name && elem.gameType === 'tictactoe')
      const filteredResTen = res.filter((elem: IGame) => elem.player2 === null && elem.player1 !== name && elem.gameType === 'tensticks')
      checkIsTictacAvailable(filteredResTic)
      checkIsTenAvailable(filteredResTen)

      return filteredResTic.concat(filteredResTen);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const gameCreatedHandler = async () => {
    setAvailableGames(await getAvailableGames())
  }

  const gameUpdatedHandler = (game: IGame) => {
    if (game.gameType === 'tictactoe') {
      navigate(`/tictactoe/${game.id}`)
    } else if (game.gameType === 'tensticks') {
      navigate(`/tensticks/${game.id}`)
    }
  }

  const handleStartTic = async () => {
    setAvailableGames((await getAvailableGames()))
    if (!isTictacCreated) {
      if (availableGames.length === 0) {   
        socket.emit('createGame', {
            player1: name,
            player2: null,
            gameType: 'tictactoe'
        })
      } else {
        const gameRoom = availableGames.find((elem) => elem.gameType === 'tictactoe')
        if (gameRoom) {
          gameRoom.player2 = name
          socket.emit('updateGame', {
            id: gameRoom.id,
            updatedData: gameRoom
          })
        }
      }
    }
  }
  
  const handleStartTen = async () => {
    setAvailableGames((await getAvailableGames()))
    if (!isTenCreated) {
      if (!isTenAvailable) {   
        socket.emit('createGame', {
            player1: name,
            player2: null,
            gameType: 'tensticks'
        })
      } else {
        const gameRoom = availableGames.find((elem) => elem.gameType === 'tensticks')
        if (gameRoom) {
          gameRoom.player2 = name
          socket.emit('updateGame', {
            id: gameRoom.id,
            updatedData: gameRoom
          })
        }
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAvailableGames(await getAvailableGames());
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();

    socket.on('gameCreated', gameCreatedHandler);
    socket.on('gameUpdated', gameUpdatedHandler);
    return () => {
        socket.off("gameCreated", gameCreatedHandler);
        socket.off("gameUpdated", gameUpdatedHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <h1>Hello, {name}!</h1>
      <button className="btn border-primary" onClick={handleStartTic}>
        {isTictacAvailable ? (
          <div>Go To Room: Tic-tac-toe</div>
        ) : (
          isTictacCreated ? (
            <div>Wait For Player</div>
          ) : (
            <div>Create Room: Tic-tac-toe</div>
          )
        )}
      </button>
      <button className="btn border-primary" onClick={handleStartTen}>
        {isTenAvailable ? (
          <div>Go To Room: Ten Sticks</div>
        ) : (
          isTenCreated ? (
            <div>Wait For Player</div>
          ) : (
            <div>Create Room: Ten Sticks</div>
          )
        )}
      </button>
    </PageWrapper>
  )
}

export default Menu
