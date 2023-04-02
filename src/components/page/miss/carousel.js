import React, {useEffect, useState} from "react";
//import {Row, Container} from 'reactstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getDocs, collection, query, doc, where } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import Card from './card';
import data from './data';

const Carousel = ()=>{
  var sample1 = new Array(10);
  let [profiles] = useState(data);

  // const [profiles, setProfiles] = useState(new Map());

  // const a = useState(async ()=> {
  //   const QuerySnapshot = await getDocs(query(collection(db, "Missing")));
  //   const data = QuerySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data()
  //   }));
  //   console.log(data);
  //   sample1 = data;
  //   //setProfiles(data);
  //   return data;
  // });

  // const [profiles, setProfiles] = useState(async ()=> {
  //   const QuerySnapshot = await getDocs(query(collection(db, "Missing")));
  //   const data = QuerySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data()
  //   }));
  //   console.log(data);
  //   sample1 = data;
  //   //setProfiles(data);
  //   return data;
  // });

  // var a = "abc";


  // const [profiles, setProfiles] = useState(async ()=> {
  //     const QuerySnapshot = await getDocs(query(collection(db, "Missing")));
  //     const data = QuerySnapshot.docs.map((doc) => ({
  //       //id: doc.id,
  //       ...doc.data()
  //     }));
  //     console.log(data);
  //     sample1 = data;
  //     //setProfiles(data);
  //     return data;
  //   });

    //console.log(sample1);

  // const [profiles, setProfiles] = useState(async ()=> {
  //   const QuerySnapshot = await getDocs(query(collection(db, "Missing")));
  //     QuerySnapshot.docs.map((doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   });



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

    return(
        <div className="carousel">
            <Slider {...settings}>
              {profiles.map((item, i) => <Card profile={item} i={i+1} key={item.id} />)}
            </Slider>
        </div>
    )
};

export default Carousel;