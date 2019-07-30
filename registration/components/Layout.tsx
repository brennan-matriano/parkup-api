import React from "react"
import styled from "styled-components"
import Navigation from "./Navigation"
import HeaderTitle from "./HeaderTitle"

const Main = styled.div`
  background-color: #fbfbfb;
  min-height: 90vh;
`

type Props = {
  children: React.ReactNode
}

export default (props: Props) => (
  <>
    <Navigation />
    <Main>
      <HeaderTitle />
      {props.children}
    </Main>
  </>
)
