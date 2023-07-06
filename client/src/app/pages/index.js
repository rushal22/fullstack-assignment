import { useRouter } from 'next/router';
import Link from 'next/link';

function Home() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <div>
      <h1>Welcome to the Book Selling E-commerce Platform!</h1>
      <button onClick={handleRegisterClick}>Register</button>
      <Link href="/login">Login</Link>
    </div>
  );
}

export default Home;