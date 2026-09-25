import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect (() => {
    if (hasRedirected) return;

    const timer = setTimeout(() => {
      setHasRedirected(true);

      if (navigate) {
        navigate('/Login', {replace: true });
      } else {
        Window.location.replace('/login');
      }
      
    }, 2000);
    
 
  return () => clearTimeout(timer);
  }, [navigate, hasRedirected]);


  return (
    
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            userSelecter: 'none',
            backgroundColor: 'rgb(58, 134, 255)', 
            overflow: 'hidden'
            
          }}
        >
          
          <h1 style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold',

              }}>TactusBook</h1> 
         
        </div>
    
  );
} 