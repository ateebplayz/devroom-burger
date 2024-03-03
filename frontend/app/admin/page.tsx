'use client'
import '../globals.css'
import Order from '@/schemas/order'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Dashboard() {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) router.push('/admin/login')
  }, [])
  const [orders, setOrders] = React.useState<Array<Order>>([])
  const fetchOrders = async () => {
      setOrders((await axios.get(`http://prices.grabyourservices.com:8080/api/orders/get?token=${localStorage.getItem('token')}`)).data.data)
  }

  React.useEffect(() => {
      const fetchData = async () => {
        try {
          fetchOrders()
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData()
      const interval = setInterval(fetchData, 10000)
      return () => clearInterval(interval)
  }, [])
  const sentProduct = async (productId: string) => {
    const response = (await axios.post(`http://prices.grabyourservices.com:8080/api/orders/delete?token=${localStorage.getItem('token')}&productId=${productId}`)).data
    fetchOrders()
    console.log(response)
  }
  return (
    <div className='bg-primary min-h-screen py-24 w-full flex justify-center items-center flex-col'>
        {orders.map((order, index) => (
            <div key={index} className='w-11/12 text-primary bg-secondary rounded-xl justify-center items-center p-12'>
                <h1 className='font-roboto-bold text-3xl'>Date</h1>
                <h1>{new Date(order.date).toLocaleString()}</h1>
                <h1 className='font-roboto-bold text-3xl mt-4'>Orders</h1>
                <div className='flex justify-start items-center flex-row flex-wrap'>
                  {order.order.map((product,index) => (
                    <div key={index} className='bg-primary rounded-xl flex mt-4 justify-start items-center p-2 mr-4'>
                      <img src={product.imageUri} width={48} height={48} className='rounded-full border-2 border-secondary'/>
                      <div className='flex justify-center items-center'>
                        <h1 className='text-lg font-roboto-bold text-white mx-4'>1x {product.title}</h1>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex justify-end items-center w-full mt-8'>
                  <button className='bg-primary rounded-xl p-3 font-roboto-bold text-white transition duration-500 hover:scale-110 active:scale-90' onClick={()=>{sentProduct(order.id)}}>Mark As Sent</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Dashboard