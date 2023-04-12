import { useSignIn } from "react-auth-kit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";


function Login() {
    const [credentials, setCredentials] = useState({username: "", password: "", repeat_password: ""})
    const [isLogin, setIsLogin] = useState(false)
  
    const signIn = useSignIn();
    const navigate = useNavigate();

    const handleChange = (target) => {
      const newCredentials = JSON.parse(JSON.stringify(credentials))
  
      if(target.name==="username"){
        newCredentials.username=target.value;
      }
      if(target.name==="password"){
        newCredentials.password=target.value
      }
      if(target.name==="repeat_password"){
        newCredentials.repeat_password=target.value
      }
      setCredentials(newCredentials)
    }
  
    const handleSignin = async()=>{
      if(credentials.password===credentials.repeat_password){
        const {username, password} = credentials;
        try{
          const res = await fetch("http://localhost:3000/signin",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({username, password})
            })
           if(res.status===300){

            console.log("user already exisits");
           }else{
             if(signIn({
              token: res.data,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: {username: credentials.username}
              })){
                  navigate("/")
              }
           }
        }catch(err){
         console.log(err)
        }
      }else{
        console.log("both passwords must be the same")
      }  
    }
  
    const handleLogin = async () => {
      const {username, password} = credentials;
    
      try{
        console.log("login")
        const res = await fetch("http://localhost:3000/login",{
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username, password})
        })
        console.log("hi")
        if(res.status===300){
          console.log("username or password incorrect");
        }
        console.log(res)
        if(res.status===200){
          if(signIn({
              token: res.data,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: {username: credentials.username}
          })){
             navigate("/")
          }
        }
      }catch(err){
        console.log(err)
      }
    }
  
    const getLogin = ()=>{
      return (
        
        <div>
        <h1 className="w-[300px] ">Welcome Back!</h1>
        <div className="color-[#eb5d5d] text-xl m-2">{""}</div>
        <div className="flex items-center w-full ">
          <input
          className="w-full mb-2 h-10 rounded bg-slate-800"
            name="username"
            value={credentials.username}
            onChange={(e) => handleChange(e.target)}
            placeholder="username"
            type="username"
          />
        </div>
        <div className="flex items-center w-full mt-2 ">
          <input
          className="w-full mb-2 h-10 rounded bg-slate-800"
            name="password"
            value={credentials.password}
            onChange={(e) => handleChange(e.target)}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="flex flex-row items-center w-full m-2 gap-8 text-[#1e5a95]">
              <button onClick={handleLogin} >
                  Login
              </button>  
              <button onClick={()=>setIsLogin(false)}>
                Sign in?
              </button>
        </div>
      </div>
      );
    }
  
    const getSignin = ()=>{
        return (
            <div>
            <h1 className="w-[300px]">Join us!</h1>
            <div className="color-[#eb5d5d] text-xl m-2">{""}</div>
            <div className="flex items-center w-full ">
              <input
              className="w-full mb-2 h-10 rounded bg-slate-800"
                name="username"
                value={credentials.username}
                onChange={(e) => handleChange(e.target)}
                placeholder="username"
                type="username"
              />
            </div>
            <div className="flex items-center w-full mt-2 ">
              <input
              className="w-full mb-2 h-10 rounded bg-slate-800"
                name="password"
                value={credentials.password}
                onChange={(e) => handleChange(e.target)}
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="flex items-center w-full mt-2 ">
              <input
              className="w-full mb-2 h-10 rounded bg-slate-800"
                name="repeat_password"
                value={credentials.repeat_password}
                onChange={(e) => handleChange(e.target)}
                placeholder="Repeat Password"
                type="password"
              />
            </div>
            <div className="flex flex-row items-center w-full m-2 gap-8 text-[#1e5a95]">
                  <button onClick={handleSignin}>
                      Sign in
                  </button>  
                  <button onClick={()=>setIsLogin(true)}>
                        Log in? 
                  </button>
            </div>
          </div>
          );
    }

  return (
    <div className="w-full h-full flex items-center flex-col">
      <div className="flex flex-col items-center pt-3 pb-3 pr-2 pl-2 border rounded-lg bg-[#1c1c1c]">
        {isLogin && getLogin()}
        {!isLogin && getSignin()}
      </div>
    </div>
  );
}

export default Login