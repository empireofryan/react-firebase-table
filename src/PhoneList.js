import React, { Component } from 'react';
import List from 'react-virtualized/dist/commonjs/List';
import database from './database';

class PhoneListRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      inquiry: props.inquiry
    }
    this.updateData = this.updateData.bind(this);
    this.toggleFollowUp = this.toggleFollowUp.bind(this);
  }

  toggleFollowUp(){
    const { inquiry } = this.state

    inquiry.followed_up = !inquiry.followed_up
    this.setState({ inquiry })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevState);
    this.updateData();
  }

  updateData() {
    console.log('update data')
    const {inquiry} = this.state
    // console.log("UPDATE", inquiry)

    fetch(`https://dh-phone-survey.firebaseio.com/${inquiry.id}/.json`, {
      method: "PATCH", 
      mode: "cors", 
      cache: "no-cache",
      credentials: "same-origin", 
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow", 
      referrer: "no-referrer", 
      body: JSON.stringify( inquiry ), 
    })
      .then(response => response) 
      .catch(error => console.error(`Fetch Error =\n`, error));
  }
  
  render() {
    const {inquiry} = this.props

    console.log("Inquiry Row Render");

    return (
      <div className="product-listing__tile">
        <div className="product-listing__tile__desciption">
         
            {inquiry.seller_email ? ( 
              <dl>
            <dt className="id">Id: {inquiry.id}</dt>
            <dt>Seller: {inquiry.seller_email}</dt>
            <dt>Recipient: {inquiry.number_dialed}</dt>
            <dt>Caller: {inquiry.inquiry_phone}</dt>
            <dt>{inquiry.additional_comments ? `Comments: ${inquiry.additional_comments}` : null}</dt>
            <dt>Followed Up     
              <input className="phone-list-input"
                onChange={this.toggleFollowUp}
                name="followedup"
                type="checkbox"
                checked={inquiry.followed_up}
                 />
            </dt>
            </dl>
            ) : (null) }
         
        </div>
        <div className="product-listing__button-container">
        </div>
      </div>
    )
  }
}

class PhoneList extends Component {
    constructor(props) {
    super(props);
    this.state = {
      inquiries: []
    };
  //this is connect to the firebase
   this.rowRenderer = this.rowRenderer.bind(this);
   this.inquiryRef = database.ref();
   this.checkboxInput = React.createRef();
  }
  //After the connect, what the state will do--gotdata
  componentDidMount() {
    this.inquiryRef.on('value', this.gotData, this.errData);
    console.log('component did mount');
  }
  //get the data from the firebase and push them out

  gotData = (data) => {
  //  console.log(data)
    let newInquiry = []
    const inquirydata = data.val();
  //  console.log(inquirydata)
    const keys = Object.keys(inquirydata);

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      newInquiry.push({
        id: k,
        received_call: inquirydata[k].received_call,
        seller_email: inquirydata[k].seller_email,
        number_dialed: inquirydata[k].number_dialed,
        inquiry_phone: inquirydata[k].inquiry_phone,
        additional_comments: inquirydata[k].additional_comments,
        followed_up: inquirydata[k].followed_up,
      });
    }
    this.setState({inquiries: newInquiry.reverse()});
  //  console.log(newInquiry);
  }
  errData = (err) => {
    console.log('err', err);
  }

  rowRenderer ({index}) {
    const {inquiries} = this.state
    const inquiry = inquiries[index]
    return(
      <PhoneListRow inquiry={inquiry} />
    )
  }

 render(){
   return (
    <div>
      <div>
        <h1>Phone Call Inquiries</h1>
      </div>
      <List
        width={1100}
        marginLeft={'30px'}
        height={80000}
        rowCount={this.state.inquiries.length}
        rowHeight={80}
        rowRenderer={this.rowRenderer}
        />
    </div>
   );
  }
 }

export default PhoneList;