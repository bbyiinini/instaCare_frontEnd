import { blue, red } from "@material-ui/core/colors";
import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";

import { makeStyles, createMuiTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { Grid, Row, Col } from "react-flexbox-grid";
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';



const RequestMangement = () => {

    const[requestId, setRequestId] = useState("");
    const history = useHistory();
    const classes = useStyles();

    const {user} = useSelector((state)=>({...state}));
    const requestMange= useSelector(state=>state.requestMange).ongoingRequestId;
    console.log(requestMange);
    

    const backHome = () =>{
        history.push('/');
    }

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#E0F2F1',
                contrastText:'#004D40',
            },
            secondary: {
                main: '#11cb5f',
            },
        },
    });

    return(
        <>
           {requestMange==null || user==null?
           <div>
               <p>waiting for redirection, back to <a onClick={backHome} style={{color:"blue"}}>HOME</a></p>
           </div>
           :<Grid fluid className="row">
                <Col className="content-column" xs>
                    <div className="request-card">
                        <div className={classes.paddings1}>
                            <CardHeader className=""
                                avatar={
                                <Avatar aria-label="recipe" className={classes.avLarge}>
                                    G
                                </Avatar>
                                }
                                title={<div className={classes.ftSmall}><a>{user.displayName}</a><div>{user.email}</div></div>}
                                subheader='Rating:'{... requestMange.rating}
                            />
                        </div>
                        <div className={classes.paddings1}>
                            <h2>{requestMange.title}</h2>
                            <p>{requestMange.requestContent}</p>
                            <Grid container spacing={3}>
                                {requestMange.tags === null ? "" : requestMange.tags.map(tag => {
                                    return(<Chip className={classes.chip} label={tag} />);
                                })}
                            </Grid>
                        </div>
                        <div className={classes.paddings1}>
                            <ThemeProvider theme={theme}>
                                <Button color="primary" variant="contained" className={classes.bHeight}>End My Appointment</Button>
                                <Button color="primary" variant="contained" className={classes.bHeight}>Cancel My Appointment</Button>
                            </ThemeProvider>
                        </div>
                        <div className={classes.paddings1}>
                            <h2 style={{borderColor: "#f44336", borderBottom: "1px solid #ccc"}}>Comments</h2>
                            <div>
                                <Card style={{ margin: "15px 0" }}>
                                    <CardHeader avatar={
                                        <Avatar aria-label="recipe" className={classes.avSmall}>
                                            R
                                        </Avatar>
                                        }
                                        action={""}
                                        title="Name"
                                        subheader="September 14, 2016"/>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Good, very vert good.
                                            </Typography>
                                        </CardContent>
                                </Card>
                                <Card style={{ margin: "15px 0" }}>
                                    <CardHeader avatar={
                                        <Avatar aria-label="recipe" className={classes.avSmall}>
                                            T
                                        </Avatar>
                                        }
                                        action={""}
                                        title="Name"
                                        subheader="September 14, 2016"/>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                I will pay you double next time.
                                            </Typography>
                                        </CardContent>
                                </Card>
                                <Card style={{ margin: "15px 0" }}>
                                    <CardHeader avatar={
                                        <Avatar aria-label="recipe" className={classes.avSmall}>
                                            T
                                        </Avatar>
                                        }
                                        action={""}
                                        title="Name"
                                        subheader="September 14, 2016"/>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                hahahaahaaaha.
                                            </Typography>
                                        </CardContent>
                                </Card>
                                <TextField
                                    id="filled-full-width"
                                    label="Label"
                                    style={{ margin: 0 }}
                                    placeholder="Commentss"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    />
                                <Button variant="contained" color="primary" style={{marginBottom:"20px"}}>Post</Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="nav-column" xs={12} sm={6}>
                    Map
                </Col>
            </Grid>}
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    avSmall: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    avLarge: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    ftSmall: {
        fontSize: "18px",
    },
    bLarge: {
        width: theme.spacing(40),
    },
    bHeight: {
        height: theme.spacing(6),
        margin: theme.spacing(0.5),
        width: "90%",
    },
    paddings1: {
        paddingTop: "80px",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
  }));

export default RequestMangement;