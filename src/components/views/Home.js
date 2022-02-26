import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ColorConsumer } from "./user-context";
// import { useUserContext } from "./user-context";

const Container = styled.div`
  margin-top: 100px;
  padding: 20px;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;

export const fetchLogin = async ({id, password}) => {
  const response = await fetch("http://localhost:8888/users");
  if(response.ok){
    // 서버 통신 이루어지면 users에 json값 대입
    const users = await response.json();
    console.log("로그인 성공!!");
    console.log(users[0]);

    // users안 객체들을 순회하면서 그 객체들의 id값과 form 컴포넌트에서 받음
    // account의 id값과 비교 (서로 일치하는 것만 user에 대입)
    const user = users.find((user)=> user.id === id);
    // 일치하는 user가 없거나 비밀번호 틀릴 시
    if(!user || user.password !== password){
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    // 모든게 일치하면 그 user 정보 return -> 이 return값이 form 컴포넌트 내 fetchLogin 함수 값으로
    // form 컴포넌트에서 setUser값에 넣어야함
    return user;
  }
  // 서버통신 에러시
  throw new Error("서버 통신이 원활하지 않습니다.");
}

//아디 비번 값 받기
//값없으면 disabled
export default function LoginForm() {

  // 글로벌 전역 상태값 setUser를 받아옴
  // 로그인이 성공적으로 이루어지면 user에 상태값을 넣어줘야함
  // 후에 다른 컴포넌트에서도 user 값 사용
  // const { setUser } = useUserContext();

  // url이동을 위한 useNavigate
  const navigate  = useNavigate();

  // useEffect(()=>{
  //   fetchLogin("123","123");
  // },[]);

  // input에서 입력한 아이디 비밀번호 담기위한 state
  const [account, setAccount] = useState({
    id: "",
    password: "",
  });

  //input에 입력하면 자동적으로 account state값 변경
  const onChangeAccount = (e) => {
    //...[비구조화 할당]을 이용하여 account의 복사본을 만들고
    //input에 지정한 네임 속성에 해당 value 값을 넣어 오버라이딩!
    //console.log(account)를 찍어보고 입력한 값들이 account에 출력되면 성공!!
    setAccount({
    ...account,
    [e.target.name]: e.target.value,
    });
  };
  
  const onClick_func = () => {
    fetchLogin({id: 'react_kim', password: '1234'});
  }
  // 동기식으로 로그인정보 통신 후 출력
  const onSubmitAccout = async () => {
    try{
      const user = await fetchLogin(account);
      window.alert(user);
      navigate("/sucess");
    } catch (error) {
      window.alert(error);
    }
  }
  return (
    <Container>
      <Input 
        id="id" 
        name="id" 
        type="text"
        placeholder="아이디를 입력해주세요"
        onChange={onChangeAccount}
      />
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangeAccount}
      />
      <Button onClick={onSubmitAccout}>로그인</Button>
      <div style={{
        width: "64px",
        height: "64px",
        background: "tomato"
      }} onClick={onClick_func}>
        <span>테스트</span>
      </div>
    </Container>
  );
}