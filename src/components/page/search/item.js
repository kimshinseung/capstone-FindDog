import React, {useState} from 'react';

function Item({item}){
    return(
        <div>
            <span>{item.name}</span>
            <span>{item.address}</span>
        </div>
    );
}

export default Item;