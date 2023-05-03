import React, {useEffect, useState} from "react";
//import {Row, Container} from 'reactstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getDocs, collection, query, doc, where } from "firebase/firestore";
import { db, storage } from "../../../firebase";
// import Cardcom from './Cardcom';
import Card from './card';
import data from './data';

const Carousel = ()=>{
  //let [profiles] = useState(data);
  
  const [profiles, setProfiles] = useState(async ()=> {
    const QuerySnapshot = await getDocs(query(collection(db, "Missing")));
    const data = QuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("data:" + data);
    //return Array.from(data);
    setProfiles(Array.from(data));
  });


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        }
    
    console.log(profiles);
    let profileArray = Array.from(profiles);
    console.log(profileArray);

    return(
        <div className="carousel">
            <Slider {...settings}>
              {Array.from(profiles).map((item, i) => <Card profiles={item} i={i+1} key={item.id} />)}
              {/*profileArray.from(profiles).map((item, i) => <Card profiles={item} i={i+1} key={item.id} />)*/}
              {/* <Cardcom profiles={profiles}/> */}
            </Slider>
        </div>
    )
};

export default Carousel;