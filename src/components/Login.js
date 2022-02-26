import axios from "axios";
import { useEffect, useState } from "react"

export default function Login(){
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const handelInputId = (e) => {
    setInputId(e.target.value);
  }
  const handelInputPw = (e) => {
    setInputPw(e.target.value);
  }
  const onClickLogin = () =>{
    alert("Login Change");
  }
  // 페이지 렌더링 후 바로 호출
  useEffect(()=>{
    axios.get('/user_inform/login')
    .then(res=>alert(res)).catch()
  },[])
  return(
    <>
      <h2>로그인</h2>
      <div>
        <label htmlFor="input_id">ID: </label>
        <input type="text" name="input_id" value={inputId} onChange={handelInputId}/>
      </div>
      <div>
        <label htmlFor="input_pw">PW: </label>
        <input type="password" name="input_pw" value={inputPw} onChange={handelInputPw}/>
      </div>
      <div>
        <button type="button" onClick={onClickLogin}>Login</button>
      </div>
    </>
  )
}