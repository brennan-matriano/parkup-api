import App, { Container, AppInitialProps } from "next/app"
import React from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import Head from "next/head"
import Header from "../components/Header"

import withRematch from "../shared/withRematch"
import { Provider } from "react-redux"

const theme = {
  colors: {
    blue: "#61A8F7",
    black: "#292929"
  }
}

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 100%;
    font-family: 'Open Sans', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
`

interface ExtendedAppInitialProps extends AppInitialProps {
  reduxStore: any
}

class MyApp extends App<ExtendedAppInitialProps> {
  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <Head>
          <title>Hello</title>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Provider store={reduxStore}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              <Header />
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </Provider>
      </Container>
    )
  }
}

export default withRematch(MyApp)
