import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class Example extends React.Component {
  constructor() {
	super();
	this.state = {
		nick: "",
		email: "",
		pass: ""
	};

	this.handleReg = this.handleReg.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }

  handleReg(event) {

    event.preventDefault();

    const data = {
      name: this.state.nick,
      email: this.state.email,
      pass: this.state.pass
    }

    axios.post('/register', { data }).then(res => {
      console.log("DONE");
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
	return (
		<div className="RejWeb">
			<div className="RegiContent">
				<div className="RegiTytul">
					Zarejestruj się teraz!
				</div>
				<div className="RegiInputs">
					<Form onSubmit={this.handleReg}>
						<FormGroup className="wpis" >
							<Input type="email" name="email" id="exampleEmail" placeholder="Wpisz e-mail" value={this.state.email} onChange={this.handleChange} />
						</FormGroup>
						<FormGroup className="wpis" >
							<Input type="text" name="nick" id="exampleNick" placeholder="Wpisz nick" value={this.state.nick} onChange={this.handleChange} />
						</FormGroup>
						<FormGroup className="wpis" >
							<Input type="password" name="pass" id="examplePass" placeholder="Wpisz hasło" value={this.state.pass} onChange={this.handleChange} />
						</FormGroup>
						<FormGroup className="wpis" >
							<Input type="password" name="2pass" id="example2Pass" placeholder="Powtórz hasło" />
						</FormGroup>
            <div className="przyciski">
  					  <Button id="zarejestruj" type="submit">Zarejestruj się!</Button>{' '}
  					  <Button id="mamjuzkonto">Mam już konto</Button>{' '}
  					</div>
					</Form>
				</div>
			</div>
		</div>
	);
  }
}

export default Example;
