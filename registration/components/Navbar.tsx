import styled from "styled-components"
import Link from "next/link"

const Header = styled.header`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 16px 20px;
  max-width: 1000px;
`

const A = styled.a`
  color: ${props => props.theme.colors.black};
  text-decoration: none;
  cursor: pointer;

  &.with-margin {
    margin-right: 20px;
  }
`

const Logo = styled.div`
  width: 30px;
  height: 30px;
  background-color: #c4c4c4;
  margin-right: auto;
`

const Button = styled(A)`
  background-color: ${props => props.theme.colors.blue};
  border-radius: 50px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  padding: 5px 37px;
  color: white;
`

export default () => {
  return (
    <Header>
      <Navbar>
        <Logo />
        <Link href="/help-us-improve">
          <A className="with-margin">Help Us Improve</A>
        </Link>
        <Link href="/contact-us">
          <A className="with-margin">Contact Us</A>
        </Link>
        <Link href="">
          <Button>View Parking</Button>
        </Link>
      </Navbar>
    </Header>
  )
}
