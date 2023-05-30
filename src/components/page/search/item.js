import React, { useState } from 'react';
import { db, storage } from "../../../firebase"
import { Col } from 'reactstrap';
import "./SearchPage.scss";

function Item({ item }) {

    //목격- 일단 보통 목격은 이름을 모르니 null값으로 처리
    if(item.name==null){
        return (
            <div>
                <Col>
                    <img className="Item-img" src={item.imgs[0]} width={300} height={300} />
                    <p> &nbsp; 위치: {item.address}</p>
                    <br/>
                </Col>
                {/* <li>{item.name} {item.address}</li> */}
            </div>
        );

    }
    //실종
    else{
    return (
        <div>
            <Col>
               
                <img className="Item-img" src={item.imgs[0]} width={300} height={300} />
            
                <p> &nbsp; 이름: {item.name}</p>
                <p> &nbsp; 위치: {item.address}</p>
                <br/>
            </Col>
            {/* <li>{item.name} {item.address}</li> */}
        </div>
    );
    }
}

export default Item;