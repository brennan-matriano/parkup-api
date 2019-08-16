import styled, { css } from "styled-components"
import { useRouter } from "next/router"

const BarContainer = styled.div`
  display: flex;
`
interface BarProps {
  readonly isActive: boolean
}

const Bar = styled.span<BarProps>`
  width: 176px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
  border-radius: 50px;

  ${props =>
    props.isActive
      ? css`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background ${props => props.theme.colors.blue};
  color: #ffffff;
  `
      : css`
          border: 1px solid #4f4f4f;
          color: ${props => props.theme.colors.grey};
          font-weight: normal;
        `}

  position: relative;

  &:not(.no-margin)&::after {
    content: "";
    padding: 0;
    height: 0;
    position: absolute;
    width: 40px;
    right: -40px;
    border: 2px solid #4f4f4f;
  }

  &:not(.no-margin) {
    margin-right: 40px;
  }
`

export default () => {
  const { route } = useRouter()

  return (
    <BarContainer>
      <Bar isActive={route === "/"}>1. CSMO Memo</Bar>
      <Bar isActive={route === "/personal-info"}>2. Personal Info</Bar>
      <Bar isActive={route === "/address-and-contact"}>
        3. Address and Contact
      </Bar>
      <Bar isActive={route === "/additional-info"}>4. Additional Info</Bar>
      <Bar isActive={route === "/pledge-and-confirm"} className="no-margin">
        5. Pledge and confirm
      </Bar>
    </BarContainer>
  )
}
