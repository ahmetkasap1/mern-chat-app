import React from 'react'
import Profile from './Profile'
import Search from './Search'
import Persons from './Persons'
import Logout from './Logout'

const LeftBarAll = () => {
    return (
        <>
            <div className='bg-gradient-to-r from-gray-900 to-gray-600  w-full h-[90vh]  rounded-lg p-5'>
                <div className='flex flex-row items-center justify-between mb-2'>
                    <Profile></Profile>
                    <Logout></Logout>
                </div>
                <hr></hr>
                <Search></Search>
                <Persons></Persons>

            </div>
            

        </>
    )
}

export default LeftBarAll