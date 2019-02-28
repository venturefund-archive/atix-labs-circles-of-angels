import React from 'react';
import {getTransferStatus} from '../api/transferApi';

class TransferStatus extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: null
    }
    this.transferIdRef = React.createRef();
  }


  handleSubmit = async (evnt) => {
    evnt.preventDefault();
    const status = await getTransferStatus(this.transferIdRef.current.value);
    console.log(status);
    this.setState({status: status});
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit}> 
        <h1>Transfer status</h1>
        <input ref={this.transferIdRef} placeholder="Transference Id"></input>
        <h2>The actual status is:  {this.state.status ? this.state.status.name : ''}</h2>
      </form>
    );
  }
}

export default TransferStatus;