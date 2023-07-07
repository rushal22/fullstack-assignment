"use client";
import BookStore from "./component/bookStore";
import Navbar from "./layout/navbar";
function Home() {
  return (
    <div>
      <Navbar />
      <BookStore />
    </div>
  );
}

export default Home;
