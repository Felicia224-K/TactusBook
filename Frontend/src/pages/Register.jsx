import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

const [isHovered, setIsHovered ] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // register() only returns a success message (no token) — the
      // assignment requires the user to log in separately afterward.
      await register(name, email, password);
      navigate('/login');
    } catch (err) {
      // express-validator errors come back as { errors: [{ msg }, ...] }
      // duplicate email comes back as { error: '...' }
      const apiErrors = err.response?.data?.errors;
      const apiError = err.response?.data?.error;

      if (apiErrors && apiErrors.length > 0) {
        setError(apiErrors.map((e) => e.msg).join(', '));
      } else {
        setError(apiError || 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ 
            width: '30rem',
            height: '22rem',
            textAlign: 'center', 
            backgroundColor: 'red',
            borderRadius: '20px',
            padding: '100px',
            backgroundColor:  '#BDB2FF',
            margin: '4rem auto',
            boxShadow: '1px 1px 5px'
        }}>
      <h1 >Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
                boxShadow: '1px 1px 5px',
              
            }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="Set a password"
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
                marginTop: '1rem',
                backgroundColor:  isHovered? 'rgb(191, 182, 239)' : 'rgb(25, 112, 251)',
                width: '100px',
                height: '30px',
                fontSize: '20px',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                boxShadow: isHovered ? '2px 2px 10px rgba(0,0,0,0.3)' : '2px 2px 10px rgba(186, 114, 114, 0.2)',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}