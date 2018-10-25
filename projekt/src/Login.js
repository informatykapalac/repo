import React from 'react';
import axios from 'axios';
import {Container, Col, Row, Jumbotron, Form, FormGroup, Button, Input,Label, Alert} from 'reactstrap';
import { get } from 'https';

class Login extends React.Component {
	constructor(){
		super();
		this.remUser = this.getCookie("userToRem");
		this.state = {
			username: this.remUser,
			password:""
		};
		this.sendData = this.sendData.bind(this);
	}
	setCookie(name, value, expireDays){
		const d = new Date();
        d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toGMTString();
		document.cookie = name + "=" + value + ";" + expires + ";path=/; sameSite=Strict";
	}
	getCookie(name) {
		const cName = name + "=";
		const decodedCookie = decodeURIComponent(document.cookie);
		const cookies = decodedCookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const c = cookies[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(cName) == 0) {
				return c.substring(cName.length, c.length);
			}
		}
		return "";
	}
	
	
	sendData(event){
		if(this.state.username != ""){
			const remCheck = document.getElementById("rememberInput");
			if(remCheck.checked){
				this.setCookie("userToRem", this.state.username, 365);
			}
			const loginData = {
				data: this.state
			};
			axios.post('/login',{loginData}).then(result =>{
				console.log(result.data);
			})
		}
	}
    render() {
        return (
            <div className="Login">
				<Container className="LoginContainer" fluid>
					<Row>
						<Col xs="12" md={{size:6, offset:3}} xl={{size:4, offset:4}} className="LoginCol">
							<Jumbotron className="LoginJumbotron" color="primary">
							    <h1 className="Title">Zaloguj się</h1>
								<Form className="LoginForm" onSubmit={this.sendData} >
									<FormGroup className="LoginUsernameGroup">
										<Input className="LoginUsernameInput" placeholder="Nazwa lub email" name="username" id="usernameInput" type="text" value={this.state.username} onChange={(event)=>{this.setState({username: event.target.value})}}>
										</Input>
									</FormGroup>
									<FormGroup className="LoginPasswordGroup">
										<Input className="LoginPasswordInput" placeholder="Hasło" name="password" id="passwordInput" type="password" value={this.state.password} onChange={(event)=>{this.setState({password: event.target.value})}}>
										</Input>
									</FormGroup>
									<FormGroup className="LoginRememberGroup">
									<Label>
										<Input className="LoginRememberInput" name="remember" id="rememberInput" type="checkbox"/>
										- Zapamiętaj mnie
									</Label>
									</FormGroup>
									<Alert color="danger" className="ErrorAlert">
									</Alert>
									<Button type="submit" className="LoginButton" color="warning" block>
										Zaloguj się!
									</Button>
								</Form>
							</Jumbotron>
						</Col>
					</Row>
				</Container>
            </div>
        );
    }
}
export default Login;