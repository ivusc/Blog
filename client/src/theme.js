import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
   config:{
      initialColorMode: 'dark',
      useSystemColorMode: false,
   },
   fonts:{
      heading: 'Poppins',
      body: 'Poppins',
   },
   styles: {
      global: (props) => ({
        body: {
         bg: mode('gray.50', 'gray.800')(props)
        }
      })
   }
})
