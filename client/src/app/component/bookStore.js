"use client"
import { useState , useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";  

function BookStore() {
  const router = useRouter()
  const [img, setImg] = useState(true);
  const [allBook , setallBook] = useState();
  


  useEffect(()=>{
    const store = async ()=>{
    const res = await fetch("http://localhost:8000/api/book")
    const data = await res.json()
    console.log(data);
    setallBook(data)
    
  }
    store()
  }, [])

  const handleImageClick = async () => {
    router.push('/bookdetail')
    setImg(!img);
  };
  console.log(allBook);
  return (
    <>
    <div className="flex bg-black min-w-sm rounded overflow-hidden shadow-lg">
      {allBook && allBook.map((book) => ( 
      <div key={book._id}>  
      <Image
        onClick={handleImageClick}
        className= {img ? 'cursor-pointer' : 'cursor-progress'}
        src="/book1.jpg"
        alt="Picture of the Book"
        width={200}
        height={400} 
      />  
      <div className="px-6 py-4">
        <p className="text-white-700 text-base">
          {book.title}
        </p>
      </div>
      <div className="px-6 pt-1 pb-1">
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
          Rs.{book.price}
        </div>
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {book.quantity > 0 ? "Available" :"Out of Stock"}
        </div>
      </div>
    </div>
    ) )}
    </div>
    </>
  );
}

export default BookStore;
