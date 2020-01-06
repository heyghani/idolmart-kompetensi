import React from 'react';
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";
import Body from "views/IndexSections/BodyPatient.jsx";

import Sidebar from "components/Sidebar/Sidebar.jsx";
import "./App.css";

class Index extends React.Component {

   render() {
       return(
           <>
           <div id="App">
           <DemoNavbar/>
           {/* <Sidebar/> */}
             <div id="page-wrap">
               
                 <Body
                 {...this.props}
                 />
                 <CardsFooter/>
                </div>
            </div>
            </>
       )
   }
    }
  
  
  export default Index;
  

 
