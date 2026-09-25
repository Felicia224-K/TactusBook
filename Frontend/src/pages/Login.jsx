import { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [isHovered, setIsHovered ] = useState(false);


  // If already logged in, don't show the login form at all.
  if (isAuthenticated) {
    return <Navigate to="/contacts" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/contacts');
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div 
    style={{
        width: '30rem',
        height: '22rem',
        textAlign: 'center', 
        backgroundColor: 'red',
        borderRadius: '20px',
        padding: '100px',
        backgroundColor: '#BDB2FF',
        margin: '4rem auto' 

    }}>





      <h1 style={{ fontSize: '30px'}}>Log into your Account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            placeholder="Enter your email adress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
             style= {{ 
                border: 'none',
                borderRadius: '5px',
                width: '200px',
                height: '30px',
                boxShadow: '1px 1px 5px' 
            }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style= {{ 
                border: 'none',
                borderRadius: '5px',
                width: '200px',
                height: '30px',
                boxShadow: '1px 1px 5px'  

            }}
          />
        </div>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        <button 
            type="submit" 
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} 
            style={{ 
                marginTop: '1rem',
                backgroundColor: isHovered? 'rgb(191, 182, 239)' : 'rgb(25, 112, 251)',
                width: '150px',
                height: '30px',
                fontSize: '20px',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                boxShadow: isHovered ? '2px 2px 10px rgba(0,0,0,0.3)' : '2px 2px 10px rgba(0,0,0,0.2)',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',   


              
                
            }}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center'  }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}