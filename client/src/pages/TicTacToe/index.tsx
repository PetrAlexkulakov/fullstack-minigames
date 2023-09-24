import { useEffect, useState } from 'react';
import { Board } from './Board';
import PageWrapper from '../../components/PageWrapper';
import { useParams } from 'react-router-dom';
import { socket } from '../../share/socket';

export default function TicTacToe({ name }: { name: string }) {
  const { id } = useParams();
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [userRole, setUserRole] = useState('0');
  const xIsNext = currentMove % 2 === 0;
  const currentSquares: (string | null)[] = history[currentMove];

  const userRoleHandler = ({ role }: { role: string }) => {
    setUserRole(role)
  }

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  useEffect(() => {
    socket.emit('userInTictack', {
      id,
      name
    })

    socket.on('userRole', userRoleHandler);
    return () => {
      socket.off("userRole", userRoleHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <div className="game">
        <h1>Your role: {userRole}</h1>
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
      </div>
    </PageWrapper>
  );
}
