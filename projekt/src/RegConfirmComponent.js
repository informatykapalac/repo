import React from 'react';
import { Container, Jumbotron, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class RegConfirm extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<div className="Rejestracja">
			<Container className="RejestrContainer" fluid>
				<Row>
					<Col xs="12" md={{size:8, offset:2}} xl={{size:6, offset:3}} className="LoginCol">
						<Jumbotron color="primary">
								<div className="text-center">
									<h1 className="display-8">Rejestracja powiodła się</h1>
									<p className="lead">Proces rejestracji zakończył się pomyślnie, na twój adres e-mail został wysłany link potwierdzający</p>
									<hr className="my-2" />
									<p>Wcisnij przycisk poniżej, aby przejść na stronę logowania</p>
									<p className="lead">
										<Link to="/Login"><Button color="success" block>Strona logowania</Button></Link>
									</p>
								</div>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		</div>
		);
	}
}

export default RegConfirm;
