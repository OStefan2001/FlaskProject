import { FormEvent, useEffect, useState } from 'react';
import SuccessComponent from '../Dashboard/LoggedIn';
import './style.css';

interface LoginCardProps {
  onRegisterClick: () => void;
}

function LoginCard({ onRegisterClick }: LoginCardProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
  const [userName, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserName = localStorage.getItem('userName');

    if (storedLoginStatus === 'true' && storedUserName) {
      setIsLoggedIn(true);
      setUsername(storedUserName);
    }
  }, []);
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true); 
    try {
      const response = await fetch('/api/logIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true); 
        setUsername(data.username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', data.username);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Mesaj sau parolă invalidă');
      }
    } catch (err) {
      setError('Eroare la logare. Te rugăm să încerci din nou.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false'); // Ștergem starea din localStorage
        setUsername(''); // Resetăm numele utilizatorului
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message);
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };


  return (
    <>
      {isLoggedIn ? (
        <SuccessComponent userName={userName} onLogout={handleLogout} />
      ) : (
        <div className="card card-size mx-auto mt-5">
          <div className="card-header">
            <h5 className="text-center">Login</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-dark w-100">Login</button>
                </>
              )}
            </form>
            <div className="mt-3 text-center">
              <button className="btn btn-link" onClick={onRegisterClick}>
                Nu am cont? Creează cont
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginCard;
