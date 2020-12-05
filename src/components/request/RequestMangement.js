import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import db, { firestore } from '../../base'

import RequestService from '../../service/RequestService'
import UserService from '../../service/UserService'

import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Rating from '@material-ui/lab/Rating'
import { Grid, Row, Col } from 'react-flexbox-grid'
import TextField from '@material-ui/core/TextField'
import { ThemeProvider } from '@material-ui/styles'
import RequestGoogleMap from './RequestGoogleMap'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import CardMedia from '@material-ui/core/CardMedia'
import PhoneIcon from '@material-ui/icons/Phone'
import imges from '../../assets/takeR.png'
import moment from 'moment'

const RequestMangement = () => {

	const userOrin = useSelector(state => (state.userProfile));
	const reqM = useSelector(state => state.requestMange);


	const [originReq, setOriginReq] = useState(reqM === null ? JSON.parse(window.localStorage.getItem('originReq')) : reqM.ongoingRequestId);
	const [wrapId, setWrapId] = useState("");
	const [user, setUser] = useState(userOrin !== null ? userOrin : JSON.parse(window.localStorage.getItem('user')));
	const [wrapOpen, setWrapOpen] = useState(false);
	const [requestMange, setRequestMange] = useState(null);
	const [textField, setTextField] = useState("");
	const [rating, setRating] = useState(0);
	const [commentCollection, setCommentCollection] = useState([]);
	const [volunteerState, setVolunteerState] = useState(user);
	const [seniorState, setSeniorState] = useState(user);
	const [onGoing, setOnGoing] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const history = useHistory()
	const classes = useStyles()
	const requestRef = firestore.collection('requestPlaza')
	const thisRequest = originReq === null ? null : requestRef.doc(originReq.id)

	useEffect(async () => {
		if (requestMange && user) {
			if (requestMange.status === 1) {
				setOnGoing(false);
			}
			if (requestMange.volunteerId) {
				const volunteer = (await UserService.retrieve(requestMange.volunteerId)).data.data;
				console.log(volunteer)
				if (requestMange.status === 2 && !onGoing) {
					user.userType === 1 ? toast.success("Request has been take") : toast.success("Successfully take the request");
					setOnGoing(true);
				}
				setVolunteerState(volunteer);
			}
			if (requestMange.seniorId && requestMange.seniorId !== seniorState.id) {
				const senior = (await UserService.retrieve(requestMange.seniorId)).data.data;
				setSeniorState(senior);
			}

		}
	}, [requestMange]);

	if(!refresh){
		setRefresh(true)
	}

	if (!requestMange) {
		if (!user || !originReq || wrapId === 'rating') {
			console.log('failed')
		} else {
			thisRequest.onSnapshot(async function (doc) {
				console.log("Current data: ", doc.data());

				window.localStorage.setItem('user', JSON.stringify(user))

				if (doc.data()) {
					if (doc.data().type && doc.data().type % 5 === user.userType+1){
						handleAutoEnd()
					}else{
						window.localStorage.setItem('originReq', JSON.stringify(doc.data()))
						setRequestMange(doc.data())
						if (doc.data().comments) {
							setCommentCollection(doc.data().comments)
						}
					}
				} else {
					// setRequestMange(originReq)
				}
			})
		}
	}

	const backHome = () => {
		history.push('/')
	}

	const handleOpen = (type) => {
		setWrapId(type)
		setWrapOpen(true)
	}

	const handleAutoEnd = async () => {
		setWrapId('rating')
		setOriginReq(requestMange)
		setWrapOpen(true)
		await thisRequest.update({ status: 3, type: 4 }).then(setOnGoing(false));
	}

	const handleEnd = async () => {
		if (wrapId === 'end') {
			setWrapId('rating')
			setOriginReq(requestMange)
			await thisRequest.update({ status: 3, type: user.userType===0 ? 2 : 1}).then(setOnGoing(false));
		} else if (wrapId === 'cancel') {
			if (user.userType === 1) {
				await thisRequest.update({ status: 1, volunteer: null, volunteerId: null, type: null}).then(setOnGoing(false));
				window.localStorage.removeItem('user')
				window.localStorage.removeItem('originReq')
				window.location.assign("/post");
			} else {
				await RequestService.deleteRequest(requestMange.id)
				window.localStorage.removeItem('user')
				window.localStorage.removeItem('originReq')
				window.location.assign('/post')
			}
		}
	}

	const handleTextFieldChange = (e) => {
		setTextField(e.target.value)
	}

	const handleComment = (e) => {
		e.preventDefault();
		if (textField !== '') {
			let temp = commentCollection
			temp.push({
				content: textField,
				userId: user.id,
				user: user.fullName,
				avatar: user.avatar,
				time: moment().format('HH:mm')
			})
			console.log(temp)
			setCommentCollection(temp)
			thisRequest.update({ comments: commentCollection })
			setTextField('')
		}
	}

	const handleRating = () => {
		if (!user.numOfRating) {
			UserService.update(user.id, { rating: rating, numOfRating: 1 })
		} else {
			UserService.update(user.id, { rating: (user.numOfRating * user.rating + rating) / (user.numOfRating + 1), numOfRating: user.numOfRating + 1 })
		}
		window.localStorage.removeItem('user')
		window.localStorage.removeItem('originReq')
		window.location.assign('/post')
	}
	const handleTake = () => {
		thisRequest.update({ status: 2, volunteerId: user.id, volunteer: user.fullName, type: 3 })
		setWrapOpen(false)
    }
    
    const formatPhoneNumber = (phoneNumberString)=>{
        let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            let intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
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
		typography: {
			fontFamily: 'Rasa',
		},
	})

	return (
		<>
			{requestMange == null || user == null ? (
				<div>
					<p>
						waiting for redirection, back to{' '}
						<a onClick={backHome} style={{ color: 'blue' }}>HOME</a>
					</p>
				</div>
			) : (
					<Grid fluid className="row">
						<ThemeProvider theme={theme}>
							<Col className="content-column" xs>
								<div className="request-card">
									<div className={classes.paddings1}>
										<CardHeader
											className=""
											avatar={<Avatar aria-label="recipe" className={classes.avHuge} src={seniorState.avatar}></Avatar>}
											title={
												<div className={classes.ftSmall}>
													<a>{seniorState.fullName}</a>
													<div>
														<PhoneIcon style={{ color: '#41892c' }} />
														{formatPhoneNumber(requestMange.phoneNumber)}
													</div>
												</div>
											}
											subheader="Rating:" {...requestMange.rating}
										/>
									</div>
									<div className={classes.paddings1}>
										<h1 >{requestMange.title}</h1>
										<p className={classes.paddings2}>{requestMange.requestContent}</p>
										<Grid spacing={3} className={classes.paddings2}>
											{requestMange.tags === null ? '' : requestMange.tags.map((tag, index) => {
												return (<Chip key={index} className={classes.chip} label={tag} />)
											})}
										</Grid>
									</div>
									<div className={classes.paddings3}>
										{requestMange.status === 3 || (user.userType === 1 && requestMange.status === 1) ? (
											<></>
										) : (
												<ThemeProvider theme={theme}>
													<Button color="primary" variant="contained" className={classes.bHeight} onClick={() => handleOpen('end')}>
														End My Appointment</Button>
													<Button color="primary" variant="contained" className={classes.bHeight} onClick={() => handleOpen('cancel')}>
														Cancel My Appointment</Button>
												</ThemeProvider>
											)}
									</div>
									<div className={classes.paddings1}>
										<h2 style={{ borderColor: '#f44336', borderBottom: '1px solid #ccc', }}>
											Comments
                                    </h2>
										<div>
											<Timeline className={classes.commentsList}>
												{commentCollection.map((comment, index) => {
													return (
														<TimelineItem key={index}>
															<TimelineSeparator>
																<Avatar aria-label="recipe" className={classes.avLarge} src={comment.avatar ? comment.avatar : ""}></Avatar>
																{index != commentCollection.length - 1 ? (
																	<TimelineConnector />
																) : (
																		''
																	)}
															</TimelineSeparator>
															<TimelineContent>
																<CardHeader title={
																	<div className={classes.ftSmall}>{comment.user || 'Null'}</div>} subheader={
																		<div className={classes.ftSmall2}>{comment.time}</div>
																	} />
																<CardContent>
																	<Typography variant="h5" color="textSecondary" component="p">
																		{comment.content}
																	</Typography>
																</CardContent>
															</TimelineContent>
														</TimelineItem>
													)
												})}
											</Timeline>
											<form onSubmit={handleComment}>
												<TextField
												InputProps={{
													classes: {
													  input: classes.ftSmall2,
													},
												  }}
												color="secondary"
												id="outlined-full-width"
												style={{ margin: "5px"}}
												placeholder="Type your message here..."
												fullWidth
												margin="normal"
												variant="outlined"
												value={textField}
												onChange={handleTextFieldChange}/>
												<Button
													className={classes.post}
													variant="contained"
													color="secondary"
													onClick={handleComment}>Post</Button>
											</form>
										</div>
									</div>
								</div>
							</Col>
						</ThemeProvider>
						<Col className="nav-column" xs={12} sm={6}>{user.userType === 1 && requestMange.status === 1 ?
							<>
								<ThemeProvider theme={theme}>
									<CardMedia
										className={classes.media}
										image={imges}
										title="Paella dish"
									/>
									<CardContent>
										<Typography variant="h4" color="textSecondary" component="p">
											Waiting for a volunteer to take the request.
										</Typography>
									</CardContent>
									<Button color="primary" variant="contained" className={classes.bHeight1} onClick={() => handleOpen('covid')}>I Want to Help</Button>
								</ThemeProvider></> :
							<> <RequestGoogleMap requestId={requestMange.id} userType={user.userType} ></RequestGoogleMap> {requestMange.status === 1 ?
								<Card className={classes.volunteer}>
									<CardHeader
										avatar={<Avatar aria-label="recipe" className={classes.avLarge}></Avatar>}
										title={<div className={classes.ftSmall}>Waiting for volunteer</div>}
										subheader='Rating: N/A' />
								</Card> :
								<Card className={classes.volunteer}>
									<CardHeader
										avatar={<Avatar aria-label="recipe" className={classes.avLarge} src={requestMange.volunteerId ? volunteerState.avatar : ""}></Avatar>}
										title={<div className={classes.ftSmall}><a>{requestMange.volunteerId !== null ? volunteerState.fullName : "N/A"}</a>
											<div><PhoneIcon style={{ color: "#41892c" }} />{requestMange.volunteerId !== null ? formatPhoneNumber(volunteerState.phone) : "N/A"}</div></div>}
										subheader='Rating:'{...requestMange.rating} />
								</Card>
							} </>
						}
						</Col>
						<ThemeProvider theme={theme}>
							<Modal
								style={modalStyle}
								isOpen={wrapOpen}
								appElement={document.getElementById('root')}
							>
								{(() => {
									if (wrapId === 'end' || wrapId === 'cancel') {
										return (
											<>
												<h2 className="text-left">
													{wrapId.substring(0, 1).toUpperCase()}
													{wrapId.substring(1, wrapId.length)} My Appointment?</h2>
												<p>Are you sure to {wrapId} this appointment? you will not be able to undo this action once it is completed.</p>
												<div className="text-right">
													<Button
														color="secondary"
														variant="contained"
														style={{ borderRadius: '15px', border: 'none' }}
														onClick={handleEnd}
													>Confirm </Button>
													<Button
														color="secondary"
														onClick={() => setWrapOpen(false)}
													>Cancel</Button>
												</div>
											</>
										)
									} else if (wrapId === "rating") {
										return (
											<>
												<h2 className="text-center">Thank you for using InstaCare</h2>
												<Rating
													className={classes.centerItem}
													name="simple-controlled"
													value={rating}
													onChange={(event, newValue) => {
														setRating(newValue)
													}}
												/>
												<div>
													<Button
														className={classes.centerButton}
														color="secondary"
														variant="contained"
														style={{ borderRadius: '15px', border: 'none' }}
														onClick={handleRating}
													>Submit</Button>
												</div>
											</>
										)
									} else {
										return (
											<div className={classes.paper}>
												<h2 id="transition-modal-title">COVID-19 Self Health Check</h2>
												<h6>Are you currently experiencing any of the following symptoms that started within the last 14 days?</h6>
												<ul>
													<li>Fever or chills</li>
													<li>Cough</li>
													<li>Shortness of breath or difficulty breathing</li>
													<li>Fatigue</li>
													<li>Muscle or body aches</li>
													<li>Headache</li>
													<li>Loss of taste or smell</li>
													<li>Sore throat</li>
													<li>Congestion or runny nose</li>
													<li>Nausea or vomiting</li>
													<li>Diarrhea</li>
												</ul>
												<h6>Over the past 14 days, have you been informed by a public health agency or a healthcare system that you have been exposed to COVID-19?</h6>
												<br></br>
												<h6>Over the past 14 days, has a person in your household been diagnosed with COVID-19 infection?</h6>
												<br></br>
												<h4>If your answer is YES for any of the questions above, we advice you to stay home and avoid physical contacts.</h4>
												{/* <TextField
												className={classes.textfield}
												label={`Enter new ${modalTitle}`}
												onChange={handleModalChange}
												defaultValue={modalContent}
												multiline
												rows={modalTitle === "Description" ? 6 : 1}
											/> */}
												<div>
													{/* <Button onClick={submitChange} style={{float:"right", color:"white",backgroundColor:"#00897B"}}>Save</Button> */}
													<Button onClick={handleTake} style={{ float: "right", color: "white", backgroundColor: "#00897B" }}>I acknowledge</Button>
												</div>
											</div>
										)
									}
								})()}
							</Modal>
						</ThemeProvider>
					</Grid>
				)}
		</>
	)
}

const useStyles = makeStyles((theme) => ({
	avHuge: {
		width: theme.spacing(12),
		height: theme.spacing(12),
	},
	avLarge: {
		width: theme.spacing(9),
		height: theme.spacing(9),
	},
	ftSmall: {
		fontSize: '30px',
	},
	ftSmall2: {
		fontSize: '24px',
	},
	bLarge: {
		width: theme.spacing(40),
	},
	bHeight: {
		height: theme.spacing(9),
		margin: theme.spacing(0.5),
		fontSize: "24px",
		width: '90%',
		'&:focus': {
			outline: 'none',
		},
	},
	bHeight1: {
		height: theme.spacing(9),
		margin: theme.spacing(0.5),
		fontSize: "24px",
		width: '75%',
		'&:focus': {
			outline: 'none',
		},
	},
	paddings1: {
		paddingTop: '3rem',
	},
	paddings2: {
		marginTop: '3rem'
	},
	paddings3: {
		marginTop: '10rem'
	},
	media:{
		marginTop:'2vh',
		height: '400px',
		width: '50%',
		marginLeft: '50%',
		transform: 'translateX(-50%)',
	},
	chip: {
		margin: theme.spacing(0.5),
		width: theme.spacing(16),
		height: theme.spacing(6),
		fontSize: "24px"
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	centerItem: {
		marginLeft: '50%',
		marginTop: '40px',
		marginBottom: '20px',
		transform: 'translateX(-50%) scale(2)',
	},
	centerButton: {
		marginLeft: '50%',
		marginTop: '20px',
		marginBottom: '20px',
		transform: 'translateX(-50%)',
	},
	volunteer: {
		marginLeft: '50%',
		position: 'absolute',
		bottom: '3rem',
		transform: 'translateX(-50%)',
		borderRadius: '15px',
		padding: '0px 20px',
		width: "45%",
	},
	commentsList: {
		transform: 'translateX(-50%)',
		width: '200%',
	},
	post: {
		width: '10rem',
		marginBottom: '20px',
		fontSize: '24px',
		borderRadius: '25px',
		boxShadow: 'none',
		outline: 'none',
		'&:focus': {
			outline: 'none',
		},
	},
	
}))

const modalStyle = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
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

export default RequestMangement
