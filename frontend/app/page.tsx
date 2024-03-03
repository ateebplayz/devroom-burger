'use client'
import Image from 'next/image'
import './globals.css'
import Logo from '../images/logo.png'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Product as ProductType } from '../schemas/product'

function sleep(ms: number) {
  return new Promise(resolve=> setTimeout(resolve, ms))
}

export default function Home() {
  const [modal1, setModal1] = React.useState('scale-0')
  const [modal2, setModal2] = React.useState('scale-0')
  const [paymentGateway, setPaymentGateway] = React.useState(0)
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [cart, setCart] = React.useState<Array<ProductType>>([])
  const [products, setProducts] = React.useState<Array<ProductType>>([])
  const [position, setPosition] = React.useState({one: '', two: '', opacitye: '100'})
  const handlePosition = async () => {
    setPosition({one: 'translate-x-[-100%]', two: '', opacitye: '0'});
    await sleep(2000);
    setModal1('scale-100')
  }
  const closeModal = async () => { 
    setModal1('scale-0')
    setModal2('scale-0')
    await sleep(1000)
    setPosition({one: '', two: '', opacitye: '100'});
  }

  const getProducts = async () => {
    const resp = await axios.get('http://prices.grabyourservices.com:8080/api/products/get')
    setProducts(resp.data.data)
  }
  getProducts()
  const openCart = () => {
    setPosition({one: position.one, two: 'translate-x-[200%]', opacitye: position.opacitye})
    setModal2('scale-100')
  }

  const addToCart = (id: string) => {
    const product = products.find(product => product.productId === id)
    let oldCart = cart
    if(product !== undefined) {
      oldCart.push(product)
      setTotalPrice(totalPrice + product?.price)
    }
    setCart(oldCart)
  }
  const removeFromCart = (index: number, price: number) => {
    let oldCart = cart
    oldCart.splice(index, 1)
    setCart(oldCart)
    setTotalPrice(totalPrice - price)
  }
  const openCheckout = () => {
    (document.getElementById('checkout_modal') as HTMLDialogElement).showModal()
  }
  const placeOrder = async () => {
    (document.getElementById('order_modal') as HTMLDialogElement).showModal()
    await axios.post('http://prices.grabyourservices.com:8080/api/orders/create', {order: cart}, {
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    await sleep(3000)
    closeModal();
    (document.getElementById('order_modal') as HTMLDialogElement).close();
    (document.getElementById('checkout_modal') as HTMLDialogElement).close()
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen font-roboto bg-secondary">
      <div className={`flex justify-center items-center min-h-screen m-0 w-screen flex-row`}>
        <div className={`w-1/2transition duration-[2000ms] p-24 flex justify-center items-start min-h-screen flex flex-col bg-primary text-white ${position.one} w-screen`}>
          <h1 className="text-5xl font-roboto-black">Bringing deliciousity to your doorstep.</h1>
          <p className='mt-2 text-lg'>Order a burger now for an exclusive <span className='roboto-bold'>25% OFF</span>. Offer ends this Friday! Experience the delight of having a Big Belly Burger!</p>
          <button onClick={()=>handlePosition()} className='mt-8 p-3 bg-white text-primary font-roboto-black transition duration-500 hover:scale-110 hover:bg-secondary'>Order a Big Belly Burger!</button>
        </div>
        <div className={`w-min-[50%] lg:flex transition duration-[2000ms] justify-center items-center h-full bg-secondary min-h-screen ${position.two} w-screen`}>
          <Image width={400} height={400} src={Logo} alt={'Logo'} className='transition duration-300 hover:rotate-[-25deg] hover:scale-110'></Image>
        </div>
      </div>
      <div className={`transition duration-[1000ms] ${modal1} h-screen w-1/2 absolute m-0 rounded-none left-0`}>
        <div className='w-full flex justify-center items-center m-0 h-full rounded-none'>
          <div className={`p-8 bg-primary text-white w-full h-full overflow-y-auto`}>
            <h3 className="font-roboto-bold text-3xl text-center">Order a Big Belly Burger!</h3>
            <p className="py-4 font-roboto text-center">Check our amazing menu and order the delicious burger you deserve.</p>
            <div className='flex justify-center items-center p-4 px-0 flex-row flex-wrap'>
                {products.map((product: ProductType, index) => (
                  <div key={index} className='flex justify-center items-center lg:items-start p-4 bg-white w-full lg:w-72 mt-4 rounded flex-col lg:mx-2'>
                    <Image src={product.imageUri} height={256} width={256} alt='Burger' className='m-0 self-center'></Image>
                    <h1 className='text-xl font-roboto-bold text-primary text-center w-full'>{product.title}</h1>
                    <span className='badge rounded py-4 lg:p-3 border-none mt-2 text-white text-center text-start w-full bg-transparent'><span className='bg-primary p-2 rounded-lg'>${product.price}</span></span>
                    <p className='text-primary mt-4 text-md text-center'>{product.description}</p>
                    <button className='mt-3  p-3 bg-primary text-white w-full font-roboto-black transition duration-500 hover:scale-105 hover:bg-secondary hover:text-black active:scale-90' onClick={() => {addToCart(product.productId)}}>Add to Cart</button>
                    <button className='mt-2 p-3 bg-transparent text-primary w-full font-roboto-black transition duration-500 hover:scale-110 hover:bg-transparent hover:text-primary'>Add to Wishlist </button>
                </div>
                ))}
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-primary text-white border-none text-black transition duration-500 hover:scale-110 rounded-none" onClick={()=>closeModal()}>Close</button>
                <button className="btn bg-white text-primary border-none text-black transition duration-500 hover:bg-secondary hover:text-black hover:scale-110 rounded-none" onClick={()=>openCart()}>Open Cart</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={`transition duration-[1000ms] ${modal2} h-screen w-1/2 absolute m-0 rounded-none right-0`}>
        <div className='w-full flex justify-center items-center m-0 h-full rounded-none'>
          <div className={`bg-secondary p-8 text-primary w-full h-full overflow-y-auto`}>
            <h3 className="font-roboto-bold text-3xl text-center">Cart</h3>
            <p className="py-4 font-roboto text-center">Below are the items in your cart. Once you&lsquo;re done, click checkout to proceed.</p>
            <div className='flex justify-center items-center p-4 px-0 flex-row flex-wrap w-fullx'>
              <div className="overflow-x-auto w-full">
                <table className="table table-md table w-full">
                  {/* head */}
                  <thead>
                    <tr className='text-primary'>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((cartItem, index) => (
                      <tr key={index}>
                        <th><Image width={80} height={80} className='rounded-full border-2 border-primary' src={cartItem.imageUri} alt={cartItem.title}/></th>
                        <td>{cartItem.title}</td>
                        <td>${cartItem.price}</td>
                        <td>{cartItem.description}</td>
                        <td className='underline cursor-pointer transition duration-500 hover:opacity-50 active:scale-90' onClick={()=>{removeFromCart(index, cartItem.price)}}>Remove</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h1 className='w-full text-end text-primary text-xl mr-4 mt-8'><span className='font-bold'>Subtotal : </span>${totalPrice.toFixed(2)}</h1>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {totalPrice > 0 ?
                <button className="btn bg-white text-primary border-none text-black transition duration-500 hover:bg-secondary hover:text-black hover:scale-110 rounded-none" onClick={()=>openCheckout()}>Checkout</button>
                :
                <button className="btn bg-white text-primary border-none text-black transition duration-500 hover:cursor-not-allowed hover:bg-white active:scale-100 rounded-none opacity-90">Checkout</button>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
      <dialog id="checkout_modal" className="modal">
        <div className="modal-box bg-secondary text-primary">
          <h3 className="font-bold text-lg">Checkout!</h3>
          <p className="py-4">Please select an option below.</p><div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-primary">Cash On Delivery (COD)</span> 
              <input type="radio" name="radio-10" className="radio checked:bg-primary border-primary" onClick={()=>{setPaymentGateway(0)}} checked={paymentGateway == 0} />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-primary">Credit/Debit Card (Stripe)</span> 
              <input type="radio" name="radio-10" className="radio checked:bg-primary border-primary" onClick={()=>{setPaymentGateway(1)}} checked={paymentGateway == 1} />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-primary">PayPal</span> 
              <input type="radio" name="radio-10" className="radio checked:bg-primary border-primary" onClick={()=>{setPaymentGateway(2 )}} checked={paymentGateway == 2} />
            </label>
          </div>
          <button className="btn bg-white text-primary mt-4 border-none text-black transition duration-500 hover:bg-secondary hover:text-black hover:scale-110 rounded-none" onClick={placeOrder}>Place Order</button>
        </div>
      </dialog>
      <dialog id="order_modal" className="modal">
        <div className="modal-box bg-secondary text-primary w-96 py-8">
          <h1 className='text-3xl w-full font-bold text-center'>Order Placed Successfully <br/>Thank You</h1>
        </div>
      </dialog>
    </div>
  );
}
