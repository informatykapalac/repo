import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Register extends React.Component {
  constructor() {
	super();
	this.state = {
		nick: "",
		email: "",
		pass: ""
	};

	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
  	event.preventDefault();

	const info = {
		data: this.state
	};


	axios.post('/', { info }).then(res => {
		console.log(res);
		console.log(res.data);
	})
  }

  render() {
	return (
		<div className="rejestrTlo">
			<div className="rejestrMain">
				<Form onSubmit={this.handleSubmit}>
					<div className="rejestrContent">
						<FormGroup>
							<Label for="exampleNick">Nick</Label>
							<Input type="text" name="nick" id="exampleNick" placeholder="Wpisz swój nick"  />
						</FormGroup>
						<FormGroup>
							<Label for="exampleEmail">Email</Label>
							<Input type="email" name="email" id="exampleEmail" placeholder="Wpisz swój e-mail"  />
						</FormGroup>
						<FormGroup>
							<Label for="examplePass">Hasło</Label>
							<Input type="password" name="pass" id="examplePass" placeholder="Wpisz swoje hasło"  />
						</FormGroup>
						<FormGroup>
							<Button type="submit">Zarejestruj się</Button>
						</FormGroup>
					</div>
				</Form>
			</div>
		</div>
	);
  }
}

export default Register;
