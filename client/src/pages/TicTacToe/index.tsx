import { useEffect, useState } from 'react';
import { Board } from './Board';
import PageWrapper from '../../components/PageWrapper';
import { useParams } from 'react-router-dom';
import { socket } from '../../share/socket';

export default function TicTacToe({ name }: { name: string }) {
  const { id } = useParams();
  const [history, setHistory] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState(0);
  const [userRole, setUserRole] = useState('O');
  const [xIsNext, setxIsNext] = useState(currentMove % 2 === 0);

  const userRoleHandler = ({ role, board }: { role: string, board: string }) => {
    setUserRole(role)
    setHistory(Array.from(board, (char) => (char === '-' ? null : char)))
  }

  function handlePlay(nextSquares: (string | null)[]) {
    if ((userRole === 'O' && !xIsNext) || (userRole === 'X' && xIsNext)) {
      const nextHistory =  nextSquares;
      setHistory(nextHistory);
      socket.emit('playerMove', {
        id,
        name,
        board: nextHistory.map((element) => (element === null ? '-' : element)).join('')
      })
      setCurrentMove(nextHistory.length - 1);
    }
  }

  const handleUpdateBoard = ({ board, xIsNext }: { board: string, xIsNext: boolean }) => {
    setHistory(Array.from(board, (char) => (char === '-' ? null : char)))

    setxIsNext(xIsNext)
  }

  useEffect(() => {
    socket.emit('userInTictack', {
      id,
      name
    })

    socket.on('userRole', userRoleHandler);
    socket.on('updateBoard', handleUpdateBoard)
    return () => {
      socket.off("userRole", userRoleHandler);
      socket.off('updateBoard', handleUpdateBoard)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <div className="game">
        <h1>Your role: {userRole}</h1>
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={history} onPlay={handlePlay} />
        </div>
      </div>
    </PageWrapper>
  );
}
