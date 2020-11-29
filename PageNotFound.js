import React from 'react';
import { Link } from 'react-router-dom';
import howNotToWear from "../assets/howNot.jpg"
import howTo from "../assets/howTo.jpg"
// import PageNotFound from '../assets/images/PageNotFound'; 

class PageNotFound extends React.Component{
    render(){
        return <div>
            {/* <img src={PageNotFound}  /> */}
            <p style={{textAlign:"center"}}>
                <div className="">
                <h1 style={{fontSize:"5em"}}>404</h1>
                <p>Sorry, the page you requested is not found... <br></br>Clikc <Link to="/">here </Link>to go to home page.</p>
                <p>To protect you and your loved ones, wear a mask when you're in public.</p>
                <img src={howTo}></img>

                </div>
                <img src={howNotToWear}></img>
                <br></br>
                <p>For more COVID-19 tips, visit CDC.gov</p>
                
            </p>
            
            {/* <iframe src="https://www.cdc.gov/coronavirus/2019-ncov/index.html" title="Visit the CDC website for information about COVID-19 and how to protect you and your loved ones." width="90%" height="600"></iframe> */}
          </div>;
    }
}
export default PageNotFound;