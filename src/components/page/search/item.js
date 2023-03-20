import React, { useState } from 'react';
import { db, storage } from "../../../firebase"
import { Col } from 'reactstrap';

function Item({ item }) {

    console.log(item.img)
    return (
        <div>
            <Col>
                <img src={item.img} width={300} height={300} />
                <h4>이름: {item.name}</h4>
                <p>실종위치: {item.address}</p>
            </Col>
            {/* <li>{item.name} {item.address}</li> */}
        </div>
    );
}

export default Item;