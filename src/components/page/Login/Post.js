/**
 * ./src/components/page/Login/Post.js
 * 다음 우편번호 api
 */

import { useState, useEffect } from "react";
import DaumPostcode from 'react-daum-postcode';

const Post = (props) => {    
    const onCompletePost = (data) => {
        console.log(data.address);
        
        let addr = data.address;
        let extraAddr = '';

        if(data.addressType === 'R') {
            if(data.bname !== '') {
                extraAddr += data.bname;
            }
            if(data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }

            addr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }

        props.setcompany({
            ...props.company,
            address:addr,
        })
    };

    // style 정의
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "20%",
        width: "400px",
        height: "400px",
        padding: "7px",
        zIndex: 100, 
    };

    return (
        <>
          {
            (
                <DaumPostcode
                    style = {postCodeStyle}
                    autoClose
                    onComplete={onCompletePost}
                />
            )
          }   
        </>
    );
}

export default Post;