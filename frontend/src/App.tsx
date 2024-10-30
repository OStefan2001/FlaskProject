import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CreateUser from '../src/Authentificator/createUser';
import LoginCard from '../src/Authentificator/logIn';
import logo from '../src/assets/Logo.png';
import './App.css';

function App() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleBackToLogin = () => {
    setIsRegistering(false);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-tertiary bg-secondary">
        <Container>
          <Navbar.Brand href="#home" className='mx-auto text-light'><img src={logo} alt='logo' style={{ height: '50px'}} /> Track and save</Navbar.Brand>
        </Container>
      </Navbar>
      {isRegistering ? (
        <CreateUser onBackToLogin={handleBackToLogin} />
      ) : (
        <LoginCard onRegisterClick={handleRegisterClick} />
      )}
    </>
  )
}
export default App
