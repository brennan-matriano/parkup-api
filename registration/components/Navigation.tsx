import Navbar from "./Navbar"
import HeaderTitle from "./HeaderTitle"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  z-index: 99999;
  position: relative;
`

export default () => (
  <HeaderWrapper>
    <Navbar />
  </HeaderWrapper>
)
