import React, { Component } from 'react';
import { Container, Col, Row, Jumbotron, Button } from 'reactstrap';

class RegRedirect extends Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div className="Rejestracja">
		 <Container className="RejestrContainer" fluid>
			<Row>
				<Col>
					<Jumbotron>
						<div className="text-center">
							<h1 className="display-3"> Strona nie istneje </h1>
							<Button color="primary">Strona główna</Button>
						</div>
					</Jumbotron>
				</Col>
			</Row>
		 </Container>
	  </div>
    );
  }
}

export default RegRedirect;
