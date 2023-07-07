



function placeOrder () {


    return (
        <>
        <div>
            Place Your order
        </div>
        <div className="bg-white p-9 rounded shadow-md min-h-full w-150">
        <h2 className="text-2xl font-bold mb-4 text-black">Shipping Address</h2>
        
        <form className='text-black' onSubmit>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block mb-2 text-black">Country:</label>
            <input
              id='country'
              type="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-3 text-black">Location:</label>
            <input
              type="location"   
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-black" >Enter City:</label>
            <input
              type="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-black">Payment Charge:</label>
            <input
              type="charge"
              value={paymentCharge}
              onChange={(e) => setPaymentCharge(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-1 text-black">Shipment Status</label>
            <input
              type="shipmentstatus"
              value={shiptmentstatus}
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
        </>
    )
}
export default placeOrder