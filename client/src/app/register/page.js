'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


function Register() {
  const [firstName , setFirstname] = useState('');
  const [lastName , setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');

  
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/user/adduser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName ,lastName, email , password , contact }),
      });

      if (res.status === 200) {
        console.log('Registration successful!');
      } else {
        console.error('Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
  
     <div className="flex justify-center items-center h-screen">
        
      <div className="bg-white p-9 rounded shadow-md min-h-full w-150">
      <h2 className="text-2xl font-bold mb-4 text-black">Registration</h2>
      
      <form className='text-black' onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block mb-2 text-black">Firstname:</label>
          <input
            id='firstname'
            type="firstname"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-3 text-black">Lastname:</label>
          <input
            type="lastname"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-black" >Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-black">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block mb-1 text-black">Contact</label>
          <input
            type="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className='mb-4 mt-2'> 
        <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
          </div>
          <div className='text-blue-500 underline hover:underline-offset-4'>
            <Link href='/login'>Already have an account? Sign in</Link>
          </div>
      </div>
      </form>
      </div>
    </div>
  
  );
}

export default Register;