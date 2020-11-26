import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import db, { firestore } from "../../base";

import RequestService from "../../service/RequestService";

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Modal from "react-modal";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Backdrop from '@material-ui/core/Backdrop';
import Rating from '@material-ui/lab/Rating';
import { Grid, Row, Col } from "react-flexbox-grid";
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import RequestGoogleMap from "./RequestGoogleMap";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';



const RequestMangement = () => {

    const user = useSelector(state => (state.userProfile));
    const reqM = useSelector(state => state.requestMange);


    const [originReq, setOriginReq] = useState(reqM === null ? null : reqM.ongoingRequestId);
    const [wrapId, setWrapId] = useState("");
    const [wrapOpen, setWrapOpen] = useState(false);
    const [requestMange, setRequestMange] = useState(null);
    const [textField, setTextField] = useState("");
    const [rating, setRating] = useState(0);
    const [commentCollection, setCommentCollection] = useState([]);


    const history = useHistory();
    const classes = useStyles();

    if (!requestMange) {
        if (!user || !originReq || wrapId === 'rating') {
            console.log("failed")
        } else {
            const requestRef = firestore.collection("requests")
            const userRef = requestRef.doc(originReq.seniorId)
            userRef.collection('onGoing').doc(originReq.id).onSnapshot(function (doc) {
                console.log("Current data: ", doc.data());
                doc.data() ? setRequestMange(doc.data()) : setRequestMange(originReq);
            });
        }
    };

    const backHome = () => {
        history.push('/');
    };

    const handleOpen = (type) => {
        setWrapId(type);
        setWrapOpen(true);
    }

    const handleEnd = async () => {
        if (wrapId === 'end') {
            setWrapId("rating");
            setOriginReq(requestMange)
            await RequestService.addToPast(requestMange.senior_id, requestMange).then();
        } else if (wrapId === 'cancel') {
            //TODO
            return;
        } else {
            return;
        }
    }

    const handleTextFieldChange = (e) => {
        setTextField(e.target.value);
    }

    const handleComment = () => {
        if (textField !== "") {
            let temp = commentCollection;
            temp.push({
                content: textField,
                userId: user.id
            });
            console.log(temp);
            setCommentCollection(temp);
            setTextField("");
        }
    }

    const handleRating = () => {
        window.location.assign("/post");
    }

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#E0F2F1',
                contrastText: '#004D40',
            },
            secondary: {
                main: '#00897B',
                contrastText: '#ffffff',
            },
        },
    });

    return (
        <>
            {requestMange == null || user == null ?
                <div>
                    <p>waiting for redirection, back to <a onClick={backHome} style={{ color: "blue" }}>HOME</a></p>
                </div>
                : <Grid fluid className="row">
                    <ThemeProvider theme={theme}>
                        <Col className="content-column" xs>
                            <div className="request-card">
                                <div className={classes.paddings1}>
                                    <CardHeader className=""
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avLarge}>
                                                G
                                </Avatar>
                                        }
                                        title={<div className={classes.ftSmall}><a>{user.fullName}</a><div>{user.email}</div></div>}
                                        subheader='Rating:'{...requestMange.rating}
                                    />
                                </div>
                                <div className={classes.paddings1}>
                                    <h2>{requestMange.title}</h2>
                                    <p>{requestMange.request_content}</p>
                                    <Grid spacing={3}>
                                        {requestMange.tags === null ? "" : requestMange.tags.map((tag, index) => {
                                            return (<Chip key={index} className={classes.chip} label={tag} />);
                                        })}
                                    </Grid>
                                </div>
                                <div className={classes.paddings1}>
                                    <ThemeProvider theme={theme}>
                                        <Button color="primary" variant="contained" className={classes.bHeight} onClick={() => handleOpen('end')}>End My Appointment</Button>
                                        <Button color="primary" variant="contained" className={classes.bHeight} onClick={() => handleOpen('cancel')}>Cancel My Appointment</Button>
                                        <Button color="primary" variant="contained" className={classes.bHeight} onClick={() => handleOpen('rating')}>Rating Test</Button>
                                    </ThemeProvider>
                                </div>
                                <div className={classes.paddings1}>
                                    <h2 style={{ borderColor: "#f44336", borderBottom: "1px solid #ccc" }}>Comments</h2>
                                    <div>
                                        <Card style={{ margin: "15px 0" }}>
                                            <CardHeader avatar={
                                                <Avatar aria-label="recipe" className={classes.avSmall}>
                                                    R
                                        </Avatar>
                                            }
                                                action={""}
                                                title="Name"
                                                subheader="September 14, 2016" />
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
                                                subheader="September 14, 2016" />
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
                                                subheader="September 14, 2016" />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    hahahaahaaaha.
                                            </Typography>
                                            </CardContent>
                                        </Card>
                                        <Timeline className={classes.commentsList}>
                                            {commentCollection.map((comment, index) => {
                                                return (<TimelineItem key={index}>
                                                    <TimelineSeparator>
                                                        <Avatar aria-label="recipe" className={classes.avLarge}>T</Avatar>
                                                        {index!=commentCollection.length-1 ? <TimelineConnector /> : ""}
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <CardHeader 
                                                            action={""}
                                                            title="Name"
                                                            subheader="time" />
                                                        <CardContent>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                {comment.content}
                                                            </Typography>
                                                        </CardContent>
                                                    </TimelineContent>
                                                </TimelineItem>);
                                            })}
                                        </Timeline>
                                        
                                        <TextField color="secondary" id="filled-full-width" label="Label" style={{ margin: 0 }} placeholder="Commentss" fullWidth margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }} variant="filled"
                                            value={textField}
                                            onChange={handleTextFieldChange}
                                        />
                                        <Button variant="contained" color="secondary" style={{ marginBottom: "20px" }} onClick={handleComment}>Post</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </ThemeProvider>
                    <Col className="nav-column" xs={12} sm={6}>{user.userType === 0 ?
                        <> <RequestGoogleMap id={requestMange.id} ></RequestGoogleMap> {requestMange.status === 0 ? <h1>Waiting for taken</h1> :
                            <Card className={classes.volunteer}>
                                <CardHeader 
                                    avatar={ <Avatar aria-label="recipe" className={classes.avLarge}>F</Avatar>}
                                    title={<div className={classes.ftSmall}><a>{user.fullName}</a><div>{user.email}</div></div>}
                                    subheader='Rating:'{...requestMange.rating}/>
                            </Card>
                        } </> :
                        <h1>Take</h1>}
                    </Col>
                    <ThemeProvider theme={theme}>
                        <Modal style={modalStyle} isOpen={wrapOpen} appElement={document.getElementById('root')}>
                            {(wrapId === "end" || wrapId === "cancel") ? <>
                                <h2 className="text-left">{wrapId.substring(0, 1).toUpperCase()}{wrapId.substring(1, wrapId.length)} My Appointment?</h2>
                                <p>Are you sure to {wrapId} this appointment? you will not be able to undo this action once it is completed.</p>
                                <div className="text-right">
                                    <Button color="secondary" variant="contained" style={{ borderRadius: "15px", border: "none" }} onClick={handleEnd}>Confirm</Button>
                                    <Button color="secondary" onClick={() => setWrapOpen(false)}>Cancel</Button>
                                </div>
                            </> : <>
                                    <h2 className="text-center">Thank you for using InstaCare</h2>
                                    <Rating className={classes.centerItem} name="simple-controlled" value={rating} onChange={(event, newValue) => { setRating(newValue) }} />
                                    <div>
                                        <Button className={classes.centerButton} color="secondary" variant="contained" style={{ borderRadius: "15px", border: "none" }} onClick={handleRating}>Submit</Button>
                                    </div>
                                </>}
                        </Modal>
                    </ThemeProvider>
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    centerItem: {
        marginLeft: "50%",
        marginTop: "40px",
        marginBottom: "20px",
        transform: "translateX(-50%) scale(2)"
    },
    centerButton: {
        marginLeft: "50%",
        marginTop: "20px",
        marginBottom: "20px",
        transform: "translateX(-50%)"
    },
    volunteer: {
        marginLeft: "50%",
        position: "absolute",
        bottom: "50px",
        transform: "translateX(-50%)",
        borderRadius: "15px",
        padding:"0px 20px"
    },
    commentsList: {
        transform: "translateX(-50%)",
        width: "200%"
    }
}));

const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '30%',
        borderRadius: '30px',
        transform: 'translate(-40%, -10%)',
    },
}

export default RequestMangement;