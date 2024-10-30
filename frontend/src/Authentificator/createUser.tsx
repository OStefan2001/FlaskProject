import { FormEvent, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
interface CreateUserProps{
  onBackToLogin: ( )=>void;
}
function CreateUser({ onBackToLogin }: CreateUserProps){
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsername('');
        setEmail('');
        setPassword('');
        console.log('User created:', data);
      } else {
        setError(data.message || 'An error occurred while creating the user.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-size mx-auto mt-5">
      <div className="card-header">
        <h5 className="text-center">Create User</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              'Create User'
            )}
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="mt-3 text-center">
          <button className="btn btn-link" onClick={onBackToLogin}>
            Ai deja un cont? Conecteaza-te!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
