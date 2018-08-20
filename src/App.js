import React, { Component } from 'react';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import List from 'react-virtualized/dist/commonjs/List';
// import { Column, Table } from 'react-virtualized';
import database from './database';

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      inquiries: []
    };
  //this is connect to the firebase
   this.rowRenderer = this.rowRenderer.bind(this)
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
        additional_comments: inquirydata[k].additional_comments,
      });
    }
    this.setState({inquiries: newInquiry});
    console.log(newInquiry);
  }
  errData = (err) => {
    console.log(err);
  }

  rowRenderer ({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) {

  let spanStyle = {
    marginLeft: '20px'
  }

  // const email = this.state.inquiries[index].seller_email
  const emailCheck = typeof this.state.inquiries[index].seller_email !== "undefined"
   
    return (
      // <div>
      // {console.log(emailCheck)}
      // {emailCheck ? (
    
      //   <div
      //     key={this.state.inquiries[index].id}
      //     style={style}
      //   >
 
      //     <div>
      //       <span>
      //         {this.state.inquiries[index].seller_email}
      //       </span>
      //       <span style={spanStyle}>
      //         {this.state.inquiries[index].number_dialed}
      //       </span>
      //       <span style={spanStyle}>
      //         {this.state.inquiries[index].inquiry_phone}
      //       </span>
      //       <span style={spanStyle}>
      //         {this.state.inquiries[index].received_call}
      //       </span>
      //       <span style={spanStyle}>
      //         {this.state.inquiries[index].additional_comments}
      //       </span>
      //     </div>
     
      //   </div>
      //      ) : ('')}
      // </div>
      <div key={this.state.inquiries[index].id} className="row">
        <div className="content">
          <div>{this.state.inquiries[index].seller_email}</div>
        </div>
        <div className="content">
          <div>{this.state.inquiries[index].number_dialed}</div>
          <div>{this.state.inquiries[index].inquiry_phone}</div>
          <div>{this.state.inquiries[index].received_call}</div>
          <div>{this.state.inquiries[index].additional_comments}</div>
        </div>
        <div className="content"><br/></div>
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
      width={1200}
      marginLeft={'30px'}
      height={100000}
      rowCount={this.state.inquiries.length}
      rowHeight={80}
      rowRenderer={this.rowRenderer}
      />


      {/* <Table
        width={600}
        height={300}
        headerHeight={20}
        rowHeight={30}
        rowCount={this.state.inquiries.length}
        rowGetter={({ index }) => this.state.inquiries[index]}
      >
        <Column
          label='Email'
          dataKey='seller_email'
          width={100}
        />
        <Column
          width={200}
          label='Number Dialed'
          dataKey='number_dialed'
        />
      </Table> */}
    </div>
   );
  }
 }

export default App;