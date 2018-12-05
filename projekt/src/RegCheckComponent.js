import React from 'react';
import axios from 'axios';

class RegCheck extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

    const info = this.props.match.params;

    const data = {
      'name': info.name,
      'token': info.token
    };

    axios.post('/activate', { data }).then(res => {
      console.log("DONE");
      // redirect to RegConfirm
      this.props.history.push('/confirm');
    }).catch((error) => {
      if(error.response.status == 400) {
        // redirect to RegFail
        this.props.history.push('/fail');
      }
    });
  }

  render() {
    return(
      <div></div>
    );
  }
}

export default RegCheck;
