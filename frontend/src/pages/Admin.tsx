import React from 'react'
import AdminOrders from '../components/ui/AdminOrders'
import AdminItems from '../components/ui/AdminItems'

type Props = {}

const Admin = (props: Props) => {
    return (
        <div className='bg-[#151b25] h-full '>
            <div className='py-6 flex justify-center items-center flex-col border-b-2'>
                <p className='text-white text-6xl font-extrabold'>Admin Dashboard</p>
            </div>


            <div className='py-6 flex justify-center items-center flex-col'>
                <p className='text-white text-5xl font-extrabold'>Orders</p>
            </div>
            <div>
                <AdminOrders />
            </div>

            <div className='py-6 flex justify-center items-center flex-col'>
                <p className='text-white text-5xl font-extrabold'>Inventory</p>
            </div>
            <div>
                <AdminItems />
            </div>
        </div>
    )
}

export default Admin