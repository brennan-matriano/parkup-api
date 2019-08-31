import styled, { css } from "styled-components"
import CustomToggle from "../CustomToggle"
import { Button } from "../Button"
import AlignRight from "../shared/AlignRight"

const PersonalInfoWrapper = styled.div``
const Block = styled.div`
  padding: 56px 68px;
  width: 1040px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`

const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div``

const InputLine = styled.div`
  display: flex;
  margin-bottom: 24px;
`

type InputBlockProps = {
  width?: string
  right?: boolean
}
const InputBlock = styled.div<InputBlockProps>`
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  > label {
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 8px;
  }

  input,
  select {
    border: 0.4px solid #acacac;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px 8px 8px 4px;
    width: ${p => p.width};
  }

  span.subtitle {
    font-size: 10px;
    margin-bottom: 8px;
  }

  > label + span {
    margin-top: -8px;
  }

  ${p =>
    p.right &&
    css`
      display: flex;
    `}
`

export default function PersonalInfo() {
  return (
    <PersonalInfoWrapper>
      <FormStyles>
        <Block>
          <Wrapper>
            <InputLine>
              <InputBlock width="177px">
                <label htmlFor="ateneo-id">Ateneo ID Number</label>
                <input type="text" id="ateneo-id" />
              </InputBlock>
            </InputLine>
            <InputLine>
              <InputBlock width="245px">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" />
              </InputBlock>
              <InputBlock width="245px">
                <label htmlFor="middle-name">Middle Name</label>
                <input type="text" id="middle-name" />
              </InputBlock>
              <InputBlock width="245px">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" />
              </InputBlock>
            </InputLine>
            <InputLine>
              <InputBlock width="245px">
                <label htmlFor="unit">Unit</label>
                <select name="" id="unit">
                  <option value="">rando</option>
                </select>
              </InputBlock>
              <InputBlock width="245px">
                <label htmlFor="category">Category</label>

                <select name="" id="category">
                  <option value="">Category</option>
                </select>
              </InputBlock>
            </InputLine>
            <InputLine>
              <InputBlock>
                <label htmlFor="level">Grade/Year</label>
                <span className="subtitle">
                  Leave blank if faculty, staff, etc.
                </span>
                <input type="text" id="level" />
              </InputBlock>
              <InputBlock width="248px">
                <label htmlFor="course">Section/Course</label>
                <span className="subtitle">
                  Leave blank if faculty, staff, etc.
                </span>
                <input type="text" id="course" />
              </InputBlock>
            </InputLine>
            <InputLine>
              <InputBlock>
                <label htmlFor="">Birth Date</label>
                <div>
                  <input type="text" style={{ width: "52px" }} />
                  <input type="text" style={{ width: "52px" }} />
                  <input type="text" style={{ width: "104px" }} />
                </div>
              </InputBlock>
            </InputLine>
            <InputLine>
              <InputBlock>
                <label>Gender</label>
                <AlignRight>
                  <CustomToggle
                    id="male"
                    onChange={() => {}}
                    name="gender"
                    value="male"
                    marginRight={6}
                  >
                    Male
                  </CustomToggle>
                  <CustomToggle
                    id="female"
                    onChange={() => {}}
                    name="gender"
                    value="female"
                    marginRight={6}
                  >
                    Female
                  </CustomToggle>
                </AlignRight>
              </InputBlock>
            </InputLine>
          </Wrapper>
        </Block>
        <Button type="button">Back</Button>
        <Button type="submit">Next</Button>
      </FormStyles>
    </PersonalInfoWrapper>
  )
}
