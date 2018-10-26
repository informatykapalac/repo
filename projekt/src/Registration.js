import React from 'react';
import axios from 'axios';
import { Container, Jumbotron, Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

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
		<div className="Rejestracja">
			<Container className="RejestrContainer" fluid>
				<Row>
					<Col xs="12" md={{size:6, offset:3}} xl={{size:4, offset:4}} className="LoginCol">
						<Jumbotron color="primary">
							<Row>
							<Col xs="12" md={{ size: 'auto' }}><h1 className="display-8">Zarejestruj się</h1></Col>
							</Row>
								<Form onSubmit={this.handleReg}>
								    <FormGroup>
										<Input type="email" name="email" id="exampleEmail" placeholder="Wpisz e-mail" value={this.state.email} onChange={this.handleChange} />
									</FormGroup>
									<FormGroup>
										<Input type="text" name="nick" id="exampleNick" placeholder="Wpisz nick" value={this.state.nick} onChange={this.handleChange} />
									</FormGroup>
									<FormGroup>
										<Input type="password" name="pass" id="examplePass" placeholder="Wpisz hasło" value={this.state.pass} onChange={this.handleChange} />
									</FormGroup>
									<FormGroup>
										<Input type="password" name="2pass" id="example2Pass" placeholder="Powtórz hasło" />
									</FormGroup>
									<Row>
										<Col xs="12" sm={{ size: 4, offset: 2 }} ><Button id="zarejestruj" type="submit">Zarejestruj się!</Button>{' '}</Col>
										<Col xs="12" sm={{ size: 4, offset: 0 }} ><Link to="/login"><Button id="mamjuzkonto">Mam już konto</Button></Link>{' '}</Col>
									</Row>
								</Form>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		</div>
	);
  }
}

export default Example;
