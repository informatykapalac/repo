import React from 'react';
import axios from 'axios';
import {Container, Col, Row, Jumbotron, Form, FormGroup, Button, Input,Label, Alert} from 'reactstrap';
import ErrBox from "./ErrBox";
import { get } from 'https';

class Login extends React.Component {
	constructor(){
		super();
		this.state = {
			remUser: this.getCookie("userToRem"),
			error: "",
			username: "",
			password: "",
		};
		this.sendData = this.sendData.bind(this);
		this.setCookie = this.setCookie.bind(this);
		this.getCookie = this.getCookie.bind(this);
		this.checkData = this.checkData.bind(this);
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
	checkData(user, pass){
		const userRegex = new RegExp('[A-Za-z_]{8,20}');
		const passRegex = new RegExp('[A-Za-z]');
        if(userRegex.test(user)){
            if(passRegex.test(pass)){
                return true;
			}
			else{
				this.setState({error: "Hasło musi mieć od 8 do 20 znaków, dużą literę i cyfrę"});
				return false;
			}
		}else{
			this.setState({error: "Nazwa użytkownika musi mieć od 8 do 20 znaków"});
			return false;
		}
	}

	sendData(event){
		event.preventDefault();
		if(this.checkData(this.state.username, this.state.password)){
			if(event.target.remember.checked){
				this.setCookie("userToRem", this.state.username, 365);
			}
			const loginData = {
				name: this.state.name,
				pass: this.state.password
			};
			axios.post('/login',{loginData}).then(result =>{
				console.log(result.data);
			})
		}
		else{
			console.log(this.state.error);
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
									<ErrBox error={this.state.error}/>
									<FormGroup className="LoginRememberGroup">
									<Label>
										<Input className="LoginRememberInput" name="remember" id="rememberInput" type="checkbox"/>
										- Zapamiętaj mnie
									</Label>
									</FormGroup>
									
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
