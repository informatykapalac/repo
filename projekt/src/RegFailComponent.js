import React from 'react';
import { Container, Jumbotron, Col, Row, Button } from 'reactstrap';

class RegFail extends React.Component {
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
									<h1 className="display-8">Rejestracja nie powiodła się</h1>
									<p className="lead">Proces rejestracji zakończył się niepowodzeniem</p>
									<hr className="my-2" />
									<p>Wcisnij przycisk poniżej, aby ponownie wysłać e-mail</p>
									<p className="lead">
										<Button color="danger" block>Wyślij e-mail</Button>
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

export default RegFail;
