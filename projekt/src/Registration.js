import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Example extends React.Component {
  constructor() {
	super();
	this.state = {
		nick: "",
		email: "",
		pass: "",
	};
	
  }
  render() {
	return (
		<div className="RejWeb">
			<div className="RegiContent">
				<div className="RegiTytul">
					Zarejestruj się teraz!
				</div>
				<div className="RegiInputs">
					<Form>
						<FormGroup className="wpis" >
							<Input type="email" name="email" id="exampleEmail" placeholder="Wpisz e-mail" value={this.state.email} onChange={(event) => this.setState({email : event.target.email})} />
						</FormGroup>
						<FormGroup className="wpis" >
							<Input type="text" name="nick" id="exampleNick" placeholder="Wpisz nick" value={this.state.nick} onChange={(event) => this.setState({nick : event.target.nick})} />
						</FormGroup>
						<FormGroup className="wpis" >
							<Input type="password" name="pass" id="examplePass" placeholder="Wpisz hasło" value={this.state.pass} onChange={(event) => this.setState({pass : event.target.pass})} />
						</FormGroup>
						<FormGroup className="wpis" >
							<Input type="password" name="2pass" id="example2Pass" placeholder="Powtórz hasło" />
						</FormGroup>
					</Form>
					<div className="przyciski">
					<Button id="zarejestruj">Zarejestruj się!</Button>{' '}
					<Button id="mamjuzkonto">Mam już konto</Button>{' '}
					</div>
				</div>
			</div>
		</div>
	);
  }
}

export default Example;