"use client"
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.dir(e.target);
    const credentials = btoa(`${formData.username}:${formData.password}`);
    alert(credentials);
    try {
      const response = await fetch('http://localhost:9001/get-students-list-by-email', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType) {
          const data = await response.json();
          console.log('Login successful:', data);
          alert('Login successful!'+ JSON.stringify(data));
          setFormData({
            username: '',
            password: '',
          });
          router.push('/dashboard');
        } else {
          const text = await response.text();
          console.log(text);
          window.sessionStorage.setItem('Authorization', response.headers.get('Authorization')!);
          console.log("Authorization", response.headers.get('Authorization')!);
          console.dir(response);
          if(text === 'AUTH'){
            router.push('/dashboard');
          }
        }
      } else {
        console.error('Login failed:', response.statusText);
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
          <button type="button" onClick={() => router.push('/register')} style={{ padding: '10px 20px' }}>Register</button>
        </form>
      </div>
    </>
  )
};

export default Login;