import React from 'react';
import axios from 'axios';
import {Container, Col, Row, Jumbotron, Form, FormGroup, Button, Input,Label, ButtonGroup} from 'reactstrap';
import ErrBox from "./ErrBox";
import { Link } from 'react-router-dom';
import { get } from 'https';

class Login extends React.Component {
	constructor(){
		super();
		if (window.sessionStorage.getItem ('error') != ""){
			const error1=window.sessionStorage.getItem ('error');
			this.setState({error: error1});
		}
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
		const userRegex = new RegExp(/^[\w]{2,20}$/);
		const emailRegex = new RegExp(/^[-\w\.]+@([-\w]+\.)+[a-z]+$ /);
		const passRegex = new RegExp(/^[\w]{8,30}$/);
		const bigRegex = new RegExp(/[A-Z]/)
        if(userRegex.test(user) || emailRegex.test(user)){
            if(passRegex.test(pass) && bigRegex.test(pass)){
                return true;
			}
			else{
				this.setState({error: "Wszystko ok? Hasła mają od 8 do 30 znaków i dużą literę!"});
				return false;
			}
		}else{
				this.setState({error: "Ej! Nazwy użytkowników mają od 2 do 20 znaków, a adres email chyba wiesz jak wygląda."});
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
				name: this.state.username,
				pass: this.state.password
			};
			axios.post('/login',{ loginData }).then(result =>{
				console.log("DONE");
			});
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
									<FormGroup className="CheckGroup">
									<Row>
										<Col>
											<Label id="remLabel">
												<Input className="LoginRememberInput" name="remember" id="rememberInput" type="checkbox"/>
												- Zapamiętaj mnie
											</Label>
										</Col>
										<Col>
											<Link to="/register"><Button id="NieMamKonta" color="link">Nie mam konta</Button></Link>
									    </Col>
									</Row>
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
