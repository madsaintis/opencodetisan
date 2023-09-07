'use client' // ---> this line does the trick

import { ColorModeScript } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Providers from './providers'
import theme from './theme'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
		<Providers>
      {children}
      </Providers>
	 </body>
    </html>
  )
}

export default RootLayout