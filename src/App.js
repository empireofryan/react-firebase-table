import React, { Component } from 'react';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import List from 'react-virtualized/dist/commonjs/List';
import database from './database';

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      inquiries: [{test: 'test'}]
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
          additional_info: inquirydata[k].additional_info,
        });
      }
      this.setState({inquiries: newInquiry});
      console.log(newInquiry);
    }
    errData = (err) => {
      console.log(err);
    }

//  handleClick = (rowKey) => {
//    alert(this.refs.table.getPageByRowKey(rowKey));
//  }

 rowRenderer ({
  key,         // Unique key within array of rows
  index,       // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible,   // This row is visible within the List (eg it is not an overscanned row)
  style        // Style object to be applied to row (to position it)
}) {
  return (
    <div
      key={key}
      style={style}
    >
      {this.state.inquiries[index]}
    </div>
  )
}

 render(){

   return (
    <div>
       <div>
      <h1>Phone Call Inquiries</h1>
      </div>
     {/* <BootstrapTable
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
     </BootstrapTable> */}
       <List
    width={300}
    height={300}
    rowCount={this.state.inquiries.length}
    rowHeight={20}
    rowRenderer={this.rowRenderer}
  />
    </div>
   );
  }
 }

export default App;