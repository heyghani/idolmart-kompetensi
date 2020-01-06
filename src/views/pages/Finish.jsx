import React, { Component } from 'react';
import queryString from "query-string";
import Navbar from "components/Navbars/DemoNavbar";
import CardsFooter from "components/Footers/CardsFooter.jsx";
import Body from "views/IndexSections/BodyFinis.jsx";
class App extends Component {

  constructor(props){
    console.log(props)
    super(props);

    const parsed = queryString.parse(props.location.search);
    console.log(parsed);

    this.state = {
      order_id:  parsed ? parsed.order_id : "",
      status_code:  parsed ? parsed.status_code : "",
      transaction_status:  parsed ? parsed.transaction_status : "" 
    };
  }

  render() {
    const { order_id, status_code, transaction_status } = this.state;
    console.log(this.state)
    return (
      <>
      <div id="App">
      <Navbar/>
      {/* <Sidebar/> */}
        <div id="page-wrap">
          
        <Body
         {...this.props}
         />
        {/* <CardsFooter/> */}
           </div>
       </div>
       </>
    );
  }
}

export default App;