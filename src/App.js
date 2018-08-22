import React, { Component } from 'react';
import List from 'react-virtualized/dist/commonjs/List';
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
  let divStyle = {
    padding: '10px'
  }

  const emailCheck = typeof this.state.inquiries[index].seller_email !== "undefined"
   
    return (
      <div key={this.state.inquiries[index].id} className="row divStyle">
        <div className="content">
          <div>{this.state.inquiries[index].seller_email}</div>
        </div>
        <div className="content">
          <div className="pb-center">{this.state.inquiries[index].number_dialed}</div>
          <div className="pb-center">{this.state.inquiries[index].inquiry_phone}</div>
          <div className="pb-center">{this.state.inquiries[index].received_call}</div>
          <div className="pb-center">{this.state.inquiries[index].additional_comments}</div>
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
      <List
        width={1200}
        marginLeft={'30px'}
        height={100000}
        rowCount={this.state.inquiries.length}
        rowHeight={80}
        rowRenderer={this.rowRenderer}
        />
    </div>
   );
  }
 }

export default App;