import styled from "styled-components"

type Props = {
  name: string
  id: string
  value: string
  type: string
  marginRight: number
  children: React.ReactNode
  onChange: (e) => any
}

type CircleProps = {
  marginRight: string
}

const Circle = styled.span<CircleProps>`
  height: 14px;
  width: 14px;
  border: 1px solid #acacac;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  margin-right: ${props => props.marginRight};
`

const Radio = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  & ~ span::before {
    background-color: white;
  }

  &:checked ~ span::before {
    content: "";
    display: block;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.blue};
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -4px 0px 0px -4px;
  }
`

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
`

function CustomToggle(props: Props) {
  return (
    <Label htmlFor={props.id}>
      <Radio
        type={props.type}
        onChange={props.onChange}
        name={props.name}
        id={props.id}
        value={props.value}
      />
      <Circle marginRight={`${props.marginRight}px`} />
      {props.children}
    </Label>
  )
}

CustomToggle.defaultProps = {
  type: "radio"
}

export default CustomToggle
