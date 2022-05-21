import Image from 'next/image'
import React from 'react'
import logo from '../../public/android-chrome-512x512.png'
import Center from './Center'

const SplashScreen = () => {
  return (
    <Center>
      <Image
        width={200}
        height={200}
        style={{ animation: `spin 7s linear infinite` }}
        src={logo}
        alt="img"
      />
    </Center>
  )
}

export default SplashScreen
