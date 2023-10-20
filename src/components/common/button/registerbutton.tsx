import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { SignUpInfo, LoginInfo, UserInfo } from "../../../state";

const RegisterButton = (props: { string: string; method: string }) => {
  const [signUpInfo, setSignUpInfo] = useRecoilState(SignUpInfo);
  const [loginInfo, setLoginInfo] = useRecoilState(LoginInfo);
  const router = useNavigate();

  return (
    <Container
      onClick={
        props.method === "signup"
          ? async () => {
              const response = await axios.post(
                "https://port-0-piction-backend-euegqv2blnrdvf3e.sel5.cloudtype.app/api/auth/signup",
                {
                  name: signUpInfo.name,
                  userId: signUpInfo.id,
                  password: signUpInfo.pw,
                }
              );

              console.log(response);
            }
          : async () => {
              const response = await axios.post(
                "https://port-0-piction-backend-euegqv2blnrdvf3e.sel5.cloudtype.app/api/auth/signin",
                {
                  userId: loginInfo.id,
                  password: loginInfo.pw,
                }
              );
              console.log(response);

              localStorage.setItem("userName", response.data[0]);
              localStorage.setItem("userId", response.data[1]);
              router(0);
            }
      }
      to="/"
    >
      {props.string}
    </Container>
  );
};

export default RegisterButton;

const Container = styled(Link)`
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
