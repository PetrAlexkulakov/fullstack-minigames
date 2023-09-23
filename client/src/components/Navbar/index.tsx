import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './style.module.scss';
import  BurgerMenu  from 'react-burger-menu'

const Navbar = () => {
  const Menu = BurgerMenu['slide'];
  const isSmall = window.innerWidth > 750 ? false : true;
  const [user, setUser] = useState(localStorage.getItem('name') || '');
  const navigation = useNavigate();
  const handleLogin = () => { navigation('/login') };
  const handleLogout = () => {
    localStorage.removeItem('name');
    setUser(''); 
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container me-0">
        <a className="navbar-brand" href="/menu">Minigames</a>
        {isSmall ?
          <Menu 
            className="bg-dark w-50"
            disableAutoFocus
            customBurgerIcon={ 
              <div className={classes.btnMenu}></div>
            } 
            right
            styles={{
              bmBurgerButton: {
                width: '100%',
              },
              bmItemList: {
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              },
              bmMenuWrap: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
              bmOverlay: {
                background: 'rgba(0, 0, 0, 0)'
              }
            }}
          >
            <a className="nav-link mb-1" href="/menu">Home</a>
            {user ? (
                <button className={classes.btnSignOut + ' mb-1'} onClick={handleLogout}/>
              ) : (
                <button className={classes.btnSignIn + ' mb-1'} onClick={handleLogin}/>
            )}
          </Menu>
          :
          <>
            <div className="collapse navbar-collapse me-2" id="navbarSupportedContent">
              <ul className="d-flex align-items-center gap-3 navbar-nav ms-auto mb-2 mb-lg-0" style={{alignItems: "center"}}>
                <li className="nav-item"><a className="nav-link" href="/menu">Home</a></li>
                <li className="nav-item">
                {user ? (
                  <button className={classes.btnSignOut} onClick={handleLogout}/>
                ) : (
                  <button className={classes.btnSignIn} onClick={handleLogin}/>
                )}</li>
              </ul>
            </div>
          </>
        }
      </div>
    </nav>
  )
}

export default Navbar
