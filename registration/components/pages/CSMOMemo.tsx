import { useState } from "react"
import styled from "styled-components"
import Link from "next/link"
import CustomToggle from "../CustomToggle"
import { Button } from "../Button"
import { useRouter } from "next/router"

const CSMOMemo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Block = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 54px 126px;

  a {
    font-weight: bold;
    color: ${props => props.theme.colors.blue};
  }

  p {
    font-size: 14px;
    line-height: 2.14;
  }
`

const AcceptanceWrapper = styled.div`
  margin-top: 32px;
  margin-left: 8px;
`

const ButtonWrapper = styled.div`
  margin-right: 16%;
  margin-top: 16px;
`

export default () => {
  const [checked, setChecked] = useState(false)
  const router = useRouter()
  const changeFunc = e => {
    setChecked(e.target.checked)
  }

  const handleClick = e => {
    if (checked) {
      router.push("/personal-info")
    }
  }

  return (
    <CSMOMemo>
      <Block>
        <p>
          This is to acknowledge that I have read the{" "}
          <Link href="">
            <a>CSMO Memo on Gate Pass Sticker for School Year 2018 to 2019</a>
          </Link>{" "}
          and that I am applying for the gate pass stickers of the vehicles
          indicated in this application form in order to allow these vehicles to
          regularly enter the campus on my behalf and to park in properly
          designated areas.
        </p>
        <AcceptanceWrapper>
          <CustomToggle
            name=""
            value=""
            id="acceptance"
            onChange={changeFunc}
            marginRight={10}
            type="checkbox"
          >
            I have read the CSMO Memo on Gate Pass Sticker for School Year 2018
            to 2019.
          </CustomToggle>
        </AcceptanceWrapper>
      </Block>
      <ButtonWrapper>
        <Button onClick={handleClick}>Next</Button>
      </ButtonWrapper>
    </CSMOMemo>
  )
}
