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
		<Form>
			<FormGroup>
				<Label for="exampleEmail">Email</Label>
				<Input type="email" name="email" id="exampleEmail" placeholder="Wpisz swój e-mail" value={this.state.email} />
			</FormGroup>
		</Form>
	);
  }
}

export default Example;