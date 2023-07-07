"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function bookdetail() {
  const [book, setBook] = useState(null);
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const [img, setImg] = useState(true);

  useEffect(() => {
    const store = async () => {
      if (bookId) {
        const res = await fetch(`http://localhost:8000/api/book/${bookId}`);
        const data = await res.json();
        setBook(data);
      }
    };
    store();
  }, [bookId]);

  return (
    <>
      {book ? (
        <>
          <div className="text-center">WELCOME TO BOOKS DETAILS</div>

          <Image
            className={img ? "cursor-pointer" : "cursor-progress"}
            src={book?.image}
            alt="Picture of the Book"
            width={200}
            height={400}
          />
          <div className="px-6 py-4">
            <p className="text-white-700 text-base">{book.title}</p>
          </div>
          <div className="px-6 pt-1 pb-1">
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Rs.{book.price}
            </div>
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {book.quantity > 0 ? "Available" : "Out of Stock"}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
export default bookdetail;
