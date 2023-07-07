'use client'
import { useState , useContext } from 'react';
import Link from 'next/link';
import UserContext from '../../userContext';
import { useRouter } from 'next/navigation';


function login() {
  const router = useRouter()
  const redirectToHome = () => {
    router.push('/')
  }
  
  // const { isUserLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const user  = useContext(UserContext);
  console.log(user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // if(isUserLoggedIn){
  //   redirectToHome()
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/user/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , password}),
      });

      if (res.status === 200) {
       
        setUserLoggedIn(true);
        redirectToHome()
        console.log('Login Successfull!'); 
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
     <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-9 rounded shadow-md min-h-full w-150">
      <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
      
      <form className='text-black' onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-4">
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
        <div className='mb-4 mt-2'> 
        <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
          </div>
          <div className='text-blue-500 underline hover:underline-offset-4'>
            <Link href='/register'>Dont Have an Account ? Login</Link>
          </div>
         
      </div>
      </form>
      </div>
    </div>
  );
}

export default login;