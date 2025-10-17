import BasicButton from "../../components/BasicButton";
import CustomTextField from "../../components/CustomTextField";
import * as React from "react"
import "../../styles/Login.css";
import loginBg from "../../assets/bg.jpg";

const Login = () =>{
      const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
    return (
        <>
        <div className= "Login-container ">
            <div className="content-ctn">
                
            <h2 id="welcome-text">Welcome Back</h2>
            <p>Please enter your details to log in</p>
            <CustomTextField 
            label= "Email"
            type="email"
            value={email}
            onChange = {(e)=> setEmail(e.target.value)
            
            }
            />
            <CustomTextField 
            label= "Password"
            type="password"
            value={password}
            onChange = {(e)=> setPassword(e.target.value)}
            />

            <BasicButton 
            text="Login"/>

            <div className="signUp-text">
            <p>Doesn't have an account?</p>
            <p> <a href="">SignUp</a></p>

            </div>

            </div>
           <div className="image-section">
              <img src={loginBg} alt="background image" />
           </div>
            

        </div>
        

        </>
    )
}

export default Login;