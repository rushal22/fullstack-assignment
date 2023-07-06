import { useState } from 'react';

function Register() {
  const [firstName , setFirstname] = useState('');
  const [lastName , setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/user/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName,lastName, email, password , contact }),
      });

      if (response.ok) {
        console.log('Registration successful!');
      } else {
        console.error('Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Firstname</label>
          <input
            type="firstname"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label>Lastname</label>
          <input
            type="lastname"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Contact</label>
          <input
            type="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;