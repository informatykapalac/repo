import React from 'react';
import {Container, Col, Row, Jumbotron, Alert} from 'reactstrap';
import { get } from 'https';

class ErrBox extends React.Component {
	constructor(){
        super();
        this.isError = this.isError.bind(this);
    }
    isError(){
        if(this.props.error !== ""){
            return <Alert color="danger">
            {this.props.error}
            </Alert>;
        }
    }
    render() {
        return (
            <div className="ErrBox">
				{this.isError()}
            </div>
        );
    }
}
export default ErrBox;
