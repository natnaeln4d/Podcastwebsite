/* eslint-disable no-unused-vars */
import React from 'react';
import Home from './componets/Landing/Home';
import Audio from './componets/Audio/Audio';
import Video from './componets/Video/Video';
import ContactUs from './componets/Contact/ContactUs';
import Footer from './componets/footer/Footer';
import { Link, Element } from 'react-scroll';
import Navbar from './componets/navbar/Navbar';

function App() {
  return (
   
    <div>
        <div className='w-full h-auto app-container'>
        <Navbar />
<Element name="section1"><Home /> </Element>
<Element name="section2"> <Audio /> </Element>
<Element name="section3"> <Video /></Element>
<Element name="section4"> <ContactUs /></Element>
<Element name="section5"> <Footer /></Element>
        </div>
 
    </div>
  );
}

export default App;
