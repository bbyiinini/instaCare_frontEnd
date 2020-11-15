import { blue, red } from "@material-ui/core/colors";
import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Row, Col } from "react-flexbox-grid";
import TextField from '@material-ui/core/TextField';



const RequestMangement = () => {

    const classes = useStyles();

    let {user} = useSelector((state)=>({...state}));

    const history = useHistory();

    const backHome = () =>{
        history.push('/');
    }

    return(
        <>
           {user==null?
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
                                subheader="GPA: 4.0"
                            />
                        </div>
                        <div className={classes.paddings1}>
                            <h2>On the Way</h2>
                            <p>I want some milk and ice from market</p>
                            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                                <Button>Easy to go</Button>
                                <Button>Buy</Button>
                            </ButtonGroup>
                        </div>
                        <div className={classes.paddings1}>
                            <ButtonGroup
                                className={classes.bLarge}
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical contained primary button group"
                                variant="contained"
                            >
                                <Button className={classes.bHeight}>End My Appointment</Button>
                                <Button className={classes.bHeight}>Cancel My Appointment</Button>
                            </ButtonGroup>
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
    },
    paddings1: {
        paddingTop: "80px",
    }
  }));

export default RequestMangement;