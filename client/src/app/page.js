'use client'
import BookStore from './component/bookStore';
import Navbar from './layout/navbar';
import {UserProvider} from '../userContext'
function Home() {
  
  return (
    <UserProvider>
      <Navbar />
      <BookStore />
      
     </UserProvider>
  
  );
}

export default Home;