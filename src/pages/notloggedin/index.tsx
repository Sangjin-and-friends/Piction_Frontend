import { styled } from "styled-components";
import * as C from "../../components/index";

const NotLoggedIn = () => {
  return (
    <>
      <C.Header />
      <Container>좀만기다려 로딩중이야</Container>
    </>
  );
};

export default NotLoggedIn;

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  font-family: "NanumSquareRound";
  font-size: 4rem;
  font-weight: 600;
`;
