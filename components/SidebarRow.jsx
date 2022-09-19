import React from 'react'
import Image from 'next/image'

function SidebarRow({Icon, src, title}) {
  return (
    <div className='flex space-x-2 items-center p-2 hover:bg-gray-200 rounded-xl cursor-pointer'>
        {src && (
            <Image className='rounded-full' src={src} width={35} height={35} layout="fixed" />
        )}
        {Icon &&(
            <Icon className="w-8 h-8 text-blue-500" />
        )}
        <p className=' hidden md:inline-flex font-medium'>{title}</p>
    </div>
  )
}

export default SidebarRow