import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
import Menu from './Menu';
import TicTacToe from './TicTacToe';
import PrivateRoute from '../components/PrivateRoute';

const AppRouter = () => {
  const [name, setName] = useState(localStorage.getItem('name') || '')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login name={name} setName={setName} />} />
        <Route element={<PrivateRoute name={name} />}>
          <Route path="/menu" element={<Menu name={name} />} />
          <Route path="/tictactoe/:id" element={<TicTacToe name={name} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

// Не должно быть регистрации и аутентификации (в данном приложении). 
// Вход в приложение только через ввод имени (без пароля, без регистрации и т.п.). 

// Задача №7 не содержит "детальных требований": только реализуйте многопользовательскую игровую платформу 
// как минимум для двух игр — "крестики-нолики" и что-нибудь еще, например, 
// Морской бой или Реверси (для 2 игроков - но параллельно может идти множество игр между разными парами игроков).
//  Игрок выбирает игру при создании игровой сессии, а противник выбрает сессию, к которой подключается для игры.

// Сделайте это круто, просто для использования, чтобы было интересно играть.  
// Вообразите, что вы хотите это кому-нибудь продать или оставить себе это приложение для портфолио.

// Конечно, игрок должен получать ход противника сразу (без перезагрузки страницу). 
// Обратите внимание, что речь идет о УДАЛЕННОЙ игре по сети, 
// а не просто рисовании поля для двух игроков за одним компьютером.
