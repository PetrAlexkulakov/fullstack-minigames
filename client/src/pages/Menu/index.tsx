import { useNavigate } from "react-router-dom"
import axios from "axios"
import { io } from "socket.io-client";
import { useEffect, useState } from "react"
import { IGame } from "../../share/interfaces/Game"
import PageWrapper from "../../components/PageWrapper"

const Menu = ({ name }: { name: string }) => {
  const navigate = useNavigate()
  const [isTictacAvailable, setIsTictacAvailable] = useState(false)
  const [isTictacCreated, setIsTictacCreated] = useState(false)
  const [availableGames, setAvailableGames] = useState<IGame[]>([])
  const basicUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;  
  const socket = io(basicUrl);

  const getAvailableGames = async () => {
    try {
      const res : IGame[] = (await axios.get(`${basicUrl}/game/games`)).data;
      setIsTictacCreated(res.some((obj: IGame) => obj.player1 === name));
      return res.filter((elem: IGame) => elem.player2 === null && elem.player1 !== name);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const gameCreatedHandler = (game: IGame) => {
    setAvailableGames((prev) => [...prev, game])
  }

  const gameUpdatedHandler = (game: IGame) => {
    navigate(`/tictactoe/${game.id}`)
  }

  const handleStart = async () => {
    setAvailableGames((await getAvailableGames()))
    if (!isTictacCreated) {
      if (availableGames.length === 0) {   
        socket.emit('createGame', {
            player1: name,
            player2: null
        })
      } else {
        const gameRoom = availableGames[0]
        gameRoom.player2 = name
        const game = socket.emit('updateGame', {
          id: gameRoom.id,
          updatedData: gameRoom
        })
  
        navigate(`/tictactoe/${game.id}`)
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAvailableGames(await getAvailableGames());
  
        if (availableGames.length > 0) {
          setIsTictacAvailable(true);
        } else {
          setIsTictacAvailable(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableGames])

  useEffect(() => {
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
      <button className="btn border-primary" onClick={handleStart}>
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
    </PageWrapper>
  )
}

export default Menu
