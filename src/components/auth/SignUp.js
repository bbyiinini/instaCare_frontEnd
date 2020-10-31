import React, {useState} from "react";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {auth} from "../../firebase";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        const actionSetting = {
            url: 'http://localhost:3000/signup/complete',
            handleCodeInApp: true,
        }
        console.log(actionSetting.url)
        console.log(email)
        await auth.sendSignInLinkToEmail(email, actionSetting);
        toast.success(`Email is sent to ${email}, please confirm your email and continue to complete sign up`);
        setEmail("")
    };



    const signUpForm = () => (
        // <form onSubmit={handleSubmit}>
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
        //     <input type="email"
        //         value={email}
        //            onChange={e => setEmail(e.target.value)}
        //            autoFocus
        //     />
        //     <button type="submit" className="btn btn-primary" onChange={handleSubmit}>Sign Up</button>
        // </form>

    )


    return(
        <div style={{textAlign:"center"}} className="p-5">
            <div>
                <div>
                    <h4>Sign Up</h4>
                    <ToastContainer/>
                    {signUpForm()}
                </div>
            </div>
        </div>
    );
};

export default SignUp;