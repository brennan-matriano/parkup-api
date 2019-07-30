import styled from "styled-components"
import StepBars from "./StepBars"

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 56px;
  margin-bottom: 56px;
`

const School = styled.span`
  color: ${props => props.theme.colors.blue};
  font-family: Open Sans;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
`

const Gate = styled.h1`
  color: ${props => props.theme.colors.black};
  letter-spacing: 0.1em;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`

export default () => (
  <Header>
    <School>Ateneo de Manila University</School>
    <Gate>Gate Pass Sticker Online Application Registration Form</Gate>
    <StepBars />
  </Header>
)
