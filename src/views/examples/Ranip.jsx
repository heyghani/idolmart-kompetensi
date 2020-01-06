import React from 'react';
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";
import Body from "views/IndexSections/BodyPatientRanip.jsx";

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
               
                 <Body/>
                 <CardsFooter/>
                </div>
            </div>
            </>
       )
   }
    }
  
  
  export default Index;
  

 
