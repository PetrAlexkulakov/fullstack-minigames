import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
import Menu from './Menu';

const AppRouter = () => {
  const [name, setName] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login name={name} setName={setName} />} />
        <Route path="/menu" element={<Menu name={name} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
