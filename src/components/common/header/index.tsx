import { styled } from "styled-components";
import HeaderLogo from "../logo/headerlogo";
import { Link, useNavigate } from "react-router-dom";
import { UserInfo } from "../../../state";
import { useRecoilState } from "recoil";

const Header = () => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const router = useNavigate();

  return (
    <Container>
      <MenuSection>
        <Link to="/">
          <HeaderLogo />
        </Link>
        <MenuText>
          <Link to="/chat">채팅하기</Link>
        </MenuText>
        <MenuText>
          <Link to="/calender">나의기록</Link>
        </MenuText>
        <MenuText>
          <Link to="/record/step1">기록하기</Link>
        </MenuText>
      </MenuSection>
      <RegisterSection>
        {!window?.localStorage.getItem("userName") &&
        !window.localStorage.getItem("userId") ? (
          <>
            <RegisterButton to="/login">로그인</RegisterButton>
            <RegisterButton to="/signup">회원가입</RegisterButton>
          </>
        ) : (
          <StyledButton
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("userName");
              alert("로그아웃 성공");
              router(0);
            }}
          >
            로그아웃
          </StyledButton>
        )}
      </RegisterSection>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100vw;
  height: 5rem;

  position: fixed;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0rem 5.25rem 0rem 5.25rem;
  box-sizing: border-box;

  background-color: white;

  z-index: 1;

  ::before {
    content: "";

    width: 90%;
    height: 0.031rem;

    position: absolute;
    bottom: 0;
    left: 5%;

    background-color: #b8b8b8;
  }
`;

const MenuSection = styled.div`
  width: max-content;
  height: min-content;

  display: flex;
  align-items: center;

  gap: 3.5rem;
`;

const MenuText = styled.div`
  font-family: "NanumSquareRound";
  font-size: 1.175rem;

  color: #b8b8b8;

  padding: 0rem 0.25rem;
  box-sizing: border-box;

  transition-timing-function: cubic-bezier(0, 0.44, 0.47, 1.32);
  transition-duration: 0.5s;

  &:hover {
    cursor: pointer;
    color: #000000;
  }
`;

const RegisterSection = styled.div`
  width: min-content;
  height: min-content;

  display: flex;

  gap: 1.5rem;
`;

const RegisterButton = styled(Link)`
  width: max-content;
  height: min-content;
  display: flex;

  padding: 0.525rem 1.25rem 0.525rem 1.25rem;

  background-color: #000000;
  color: rgb(255, 255, 255);

  font-family: "NanumSquareRound";
  font-size: 1rem;

  border-radius: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.div`
  width: max-content;
  height: min-content;
  display: flex;

  padding: 0.525rem 1.25rem 0.525rem 1.25rem;

  background-color: #000000;
  color: rgb(255, 255, 255);

  font-family: "NanumSquareRound";
  font-size: 1rem;

  border-radius: 2rem;

  &:hover {
    cursor: pointer;
  }
`;
