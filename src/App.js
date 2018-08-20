import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import database from './database';

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      inquiries: []
    };
  //this is connect to the firebase
   this.inquiryRef = database.ref();
  }
  //After the connect, what the state will do--gotdata
  componentDidMount() {
    this.inquiryRef.on('value', this.gotData, this.errData);
  }
  //get the data from the firebase and push them out
  gotData = (data) => {
      let newInquiry = []
      const inquirydata = data.val();
      const keys = Object.keys(inquirydata);

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        newInquiry.push({
          received_call: inquirydata[k].received_call,
          seller_email: inquirydata[k].seller_email,
          number_dialed: inquirydata[k].number_dialed,
          inquiry_phone: inquirydata[k].inquiry_phone,
          additional_info: inquirydata[k].additional_info
        });
      }
      this.setState({inquiries: newInquiry});
    }
    errData = (err) => {
  console.log(err);
}

 handleClick = (rowKey) => {
   alert(this.refs.table.getPageByRowKey(rowKey));
 }
 render(){

   return (
    <div>
       <div>
      <h1>Phone Call Inquiries</h1>
      </div>
     <BootstrapTable
         ref='table'
         data={ this.state.inquiries }
         pagination={ false }
         search={ true }
         >
       <TableHeaderColumn dataField='ISBN' isKey={true} dataSort={true}></TableHeaderColumn>
         <TableHeaderColumn dataField='received_call' dataSort={true}>Received Call</TableHeaderColumn>
         <TableHeaderColumn dataField='seller_email'>Seller Email</TableHeaderColumn>
         <TableHeaderColumn dataField='number_dialed'>Number Dialed</TableHeaderColumn>
         <TableHeaderColumn dataField='inquiry_phone'>Inquiry Phone</TableHeaderColumn>
         <TableHeaderColumn dataField='additional_info'>Additional Info</TableHeaderColumn>
     </BootstrapTable>

    </div>
   );
  }
 }


export default App;