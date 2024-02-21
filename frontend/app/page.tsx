'use client'
import Image from 'next/image'
import './globals.css'
import Logo from '../images/logo.png'
import Burger1 from '../images/burger-1.png'
import React, { useEffect } from 'react'

function sleep(ms: number) {
  return new Promise(resolve=> setTimeout(resolve, ms))
}

export default function Home() {
  const [position, setPosition] = React.useState({one: '', two: '', opacitye: '100'})
  const handlePosition = async () => {
    setPosition({one: '[-100%]', two: 'full', opacitye: '0'});
    await sleep(2000);
    (document.getElementById('shop_modal') as HTMLDialogElement)?.showModal()
  }
  const closeModal = () => { 
    setPosition({one: '', two: '', opacitye: '100'});
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen font-roboto">
      <div className={`flex justify-center items-center min-h-screen m-0 w-screen flex-row`}>
        <div className={`w-1/2 opacity-${position.opacitye} transition duration-[2000ms] flex justify-center items-start min-h-screen p-24 flex flex-col bg-primary text-white translate-x-${position.one} w-screen`}>
          <h1 className="text-5xl font-roboto-black">Bringing deliciousity to your doorstep.</h1>
          <p className='mt-2 text-lg'>Order a burger now for an exclusive <span className='roboto-bold'>25% OFF</span>. Offer ends this Friday! Experience the delight of having a Big Belly Burger!</p>
          <button onClick={()=>handlePosition()} className='mt-8 p-3 bg-white text-primary font-roboto-black transition duration-500 hover:scale-110 hover:bg-secondary'>Order a Big Belly Burger!</button>
        </div>
        <div className={`w-1/2 hidden lg:flex opacity-${position.opacitye} transition duration-[2000ms] justify-center items-center h-full bg-secondary min-h-screen translate-x-${position.two} w-screen`}>
          <Image width={400} height={400} src={Logo} alt={'Logo'} className='transition duration-300 hover:rotate-[-25deg] hover:scale-110'></Image>
        </div>
      </div>
      <dialog onClose={()=>closeModal()} id="shop_modal" className="modal modal-bottom sm:modal-middle bg-primaryLight lg:bg-gradient-to-r from-primaryLight from-35% to-secondaryLight to-75% rounded-none">
        <div className={`p-8 rounded bg-primary text-white rounded-t-3xl lg:rounded-none lg:w-[calc(100vw-12rem)] h-[calc(100vh-6rem)] overflow-y-auto`}>
          <h3 className="font-roboto-bold text-3xl text-center">Order a Big Belly Burger!</h3>
          <p className="py-4 font-roboto text-center">Check our amazing menu and order the delicious burger you deserve.</p>
          <div className='flex justify-center items-center p-4 px-0 flex-row flex-wrap'>
            
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-white text-primary border-none text-black transition duration-500 hover:bg-secondary hover:text-black hover:scale-110 rounded-none" onClick={()=>closeModal()}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
