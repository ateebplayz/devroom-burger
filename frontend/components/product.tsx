import Image from 'next/image'
import React from 'react'
interface ProductProps {
    id: string,
    text: string,
    price: string,
    desc: string,
    imageUri: string
}

function Product(props: ProductProps) {
  return (
    <div className='flex justify-center items-center lg:items-start p-4 bg-white w-full lg:w-72 mt-4 rounded flex-col lg:mx-2'>
        <Image src={props.imageUri} height={256} width={256} alt='Burger drop-shadow-2xl ml-2'></Image>
        <h1 className='text-xl font-roboto-bold text-primary text-center w-full'>{props.text}</h1>
        <span className='badge rounded py-4 lg:p-3 border-none mt-2 text-white text-center text-start w-full bg-transparent'><span className='bg-primary p-2 rounded-lg'>{props.price}</span></span>
        <p className='text-primary mt-4 text-md text-center'>{props.desc}</p>
        <button className='mt-3  p-3 bg-primary text-white w-full font-roboto-black transition duration-500 hover:scale-105 hover:bg-secondary hover:text-black'>Add to Cart</button>
        <button className='mt-2 p-3 bg-transparent text-primary w-full font-roboto-black transition duration-500 hover:scale-110 hover:bg-transparent hover:text-primary'>Add to Wishlist </button>
    </div>
  )
}

export default Product