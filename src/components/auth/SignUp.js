import React, {useState} from "react";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {auth} from "../../firebase";
import {toast} from "react-toastify";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password){
            toast.error("email and password are required")
            return;
        }

        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
            toast.error("You have entered an invalid email address!")
            return;
        }

        if (password.length < 6){
            toast.error("password must be more than 6 character long")
            return;
        }
        const actionSetting = {
            url: 'http://localhost:3000/signup/complete',
            handleCodeInApp: true,
        }
        // console.log(email)
        await auth.sendSignInLinkToEmail(email, actionSetting);
        toast.success(`Email is sent to ${email}, please confirm your email and continue to complete sign up`);

        window.localStorage.setItem('email', email)
        window.localStorage.setItem('password', password)
        setEmail("")
        setPassword("")
    };



    const signUpForm = () => (
        <MuiThemeProvider>
            <div >
                <TextField
                    hintText="Enter your Email"
                    floatingLabelText="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <br/>
                <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <br/>
                <button type="Submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </MuiThemeProvider>
    )


    return(
        <div style={{textAlign:"center"}} className="p-5">
            <div>
                <div>
                    <h4>Sign Up</h4>
                    {signUpForm()}
                </div>
            </div>
        </div>
    );
};

export default SignUp;