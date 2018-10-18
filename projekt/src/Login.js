import React from 'react';
import axios from 'axios';
import {Container, Col, Row, Jumbotron, Form, FormGroup, Button, Input,Label,Yolo} from 'reactstrap';

class Login extends React.Component {
	constructor(){
		super();
		this.state = {
			username:"",
			password:""
		};
		this.sendData = this.sendData.bind(this);
	}
	sendData(event){
		const loginData = {
			data: this.state
		};
		axios.post('/',{loginData}).then(result =>{
			console.log(result.data);
		})
	}
    render() {
        return (
            <div className="Login">
				<Container>
					<Row>
						<Col xs="12" md={{size:8, offset:2}} lg={{size:6, offset:3}}>
							<Jumbotron>
								<Form className="LoginForm" onSubmit={this.sendData}>
									<FormGroup className="LoginUsernameGroup">
										<Label for="usernameInput">Nazwa lub email:</Label>
										<Input className="LoginUsernameInput" name="username" id="usernameInput" type="text" value={this.state.username} onChange={(event)=>{this.setState({username: event.target.value})}}>
										</Input>
									</FormGroup>
									<FormGroup className="LoginPasswordGroup">
									<Label for="passwordInput">Hasło:</Label>
										<Input className="LoginPasswordInput" name="password" id="passwordInput" type="password" value={this.state.password} onChange={(event)=>{this.setState({password: event.target.value})}}>
										</Input>
									</FormGroup>
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