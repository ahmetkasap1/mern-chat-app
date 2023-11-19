import React from 'react'
import Profile from './Profile'
import Settings from './Settings'
import Search from './Search'
import Persons from './Persons'

const LeftBarAll = () => {
    return (
        <>
            <div className='bg-white w-full h-auto rounded-lg p-5'>
                <div className='flex flex-row items-center justify-between mb-2'>
                    <Profile></Profile>
                    <Settings></Settings>
                </div>
                <hr></hr>
                <Search></Search>
                <Persons></Persons>

            </div>
            

        </>
    )
}

export default LeftBarAll