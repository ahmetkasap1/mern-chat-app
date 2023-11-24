import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
    return (
        <>
            <nav className='flex flex-row items-center justify-evenly w-full mx-auto mt-16  '>
                <div className='basis-1/12 ml-32'>
                    <Image src="/logo.png" alt='logo' width={70} height={70} className='rounded-full' />
                </div>

                <div className='basis-auto '>
                    <ul className='flex  flex-row gap-6 mr-16'>
                        <Link href='/' className='text-white text-lg font-roboto hover:underline underline-offset-8'><li>Özellikler</li></Link>
                        <Link href='/' className='text-white text-lg font-roboto hover:underline underline-offset-8'><li>Gizlilik</li></Link>
                        <Link href='/' className='text-white text-lg font-roboto hover:underline underline-offset-8	'><li>Mobil Uygulaması İçin</li></Link>


                        <Link href='/' className='text-white text-lg font-roboto hover:underline underline-offset-8	'><li>Geliştiriciler İçin</li></Link>
                    </ul>
                </div>
             
            </nav>

        </>
    )
}

export default Navbar