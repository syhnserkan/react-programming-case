import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { CSSReset } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'

const GlobalStyles = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }
        `}
      />
      {children}
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <GlobalStyles>
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </GlobalStyles>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
