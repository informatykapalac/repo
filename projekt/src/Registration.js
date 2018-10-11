import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Example extends React.Component {
  constructor() {
	super();
	this.state = {
		nick: "",
		email: "",
		pass: ""
	};
	
  }
  render() {
	return (
		<div className="rejestrTlo">
			<div className="rejestrMain">
				<Form>
					<div className="rejestrContent">
						<FormGroup>
							<Label for="exampleNick">Nick</Label>
							<Input type="textarea" name="nick" id="exampleNick" placeholder="Wpisz swój nick"  />
						</FormGroup>
						<FormGroup>
							<Label for="exampleEmail">Email</Label>
							<Input type="email" name="email" id="exampleEmail" placeholder="Wpisz swój e-mail"  />
						</FormGroup>
						<FormGroup>
							<Label for="examplePass">Hasło</Label>
							<Input type="password" name="pass" id="examplePass" placeholder="Wpisz swoje hasło"  />
						</FormGroup>
					</div>
				</Form>
			</div>
		</div>
	);
  }
}

export default Example;