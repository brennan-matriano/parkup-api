import App, { Container, AppInitialProps } from "next/app"
import React from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import Head from "next/head"
import Layout from "../components/Layout"

import withRematch from "../shared/withRematch"
import { Provider } from "react-redux"

const theme = {
  colors: {
    blue: "#61A8F7",
    black: "#292929",
    grey: "#4F4F4F"
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
      <>
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
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </>
          </ThemeProvider>
        </Provider>
      </>
    )
  }
}

export default withRematch(MyApp)
