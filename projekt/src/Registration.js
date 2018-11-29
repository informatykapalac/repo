import React from 'react';
import axios from 'axios';
import { Container, Jumbotron, Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import ErrBox from "./ErrBox";

class Example extends React.Component {
  constructor() {
	super();
	this.state = {
		nick: "",
		email: "",
		pass: "",
		error: ""
	};

	this.handleReg = this.handleReg.bind(this);
	this.handleChange = this.handleChange.bind(this);
  }
  checkData(user, pass, pass2){
		const userRegex = new RegExp(/^[\w]{1,20}$/);
		const passRegex = new RegExp(/^[\w]{8,30}$/);
		const bigRegex = new RegExp(/[A-Z]/)
        if(userRegex.test(user)){
            if(passRegex.test(pass) && bigRegex.test(pass)){

                return true;
						}
						else{
							this.setState({error: "Hasło musi mieć od 8 do 30 znaków i dużą literę."});
							return false;
						}
				}else{
					this.setState({error: "Nazwa użytkownika musi mieć od 1 do 20 znaków."});
					return false;
				}
	}

  handleReg(event) {

    event.preventDefault();
	if(this.checkData(this.state.nick, this.state.pass)){
    const data = {
      name: this.state.nick,
      email: this.state.email,
      pass: this.state.pass
    }

    axios.post('/register', { data }).then(res => {
      console.log("DONE");
    }).catch((error) => {
      if(error.response) {
        this.setState({
          error: error.response.status + " " + error.response.data
        });
      }
    });
	}
	else {
		console.log(this.state.error);
	}
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
	return (
		<div className="Rejestracja">
			<Container className="RejestrContainer" fluid>
				<Row>
					<Col xs="12" md={{size:8, offset:2}} xl={{size:4, offset:4}} className="LoginCol">
						<Jumbotron color="primary">
							<h1 className="display-8">
								<div className="text-center">
									Zarejestruj się
								</div>
							</h1>
								<Form onSubmit={this.handleReg}>
								    <FormGroup>
										<Input type="email" name="email" id="exampleEmail" placeholder="Wpisz e-mail" value={this.state.email} onChange={this.handleChange} />
									</FormGroup>
									<FormGroup onSubmit={this.sendData}>
										<FormGroup>
											<Input type="text" name="nick" id="exampleNick" placeholder="Wpisz nick" value={this.state.nick} onChange={this.handleChange} />
										</FormGroup>
										<FormGroup>
											<Input type="password" name="pass" id="examplePass" placeholder="Wpisz hasło" value={this.state.pass} onChange={this.handleChange} />
										</FormGroup>
										<FormGroup>
											<Input type="password" name="2pass" id="example2Pass" placeholder="Powtórz hasło" />
										</FormGroup>
									</FormGroup>
									<ErrBox error={this.state.error}/>
									<FormGroup>
										<Button id="zarejestruj" type="submit" color="warning" block>Zarejestruj się!</Button>{' '}
									</FormGroup>
									<Link to="/login"><Button id="mamjuzkonto" color="secondary" block>Mam już konto</Button></Link>{' '}
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
