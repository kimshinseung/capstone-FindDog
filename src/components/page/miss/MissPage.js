/**
 * ./src/components/page/miss/MissPage.js
 * 실종 게시판
 */
import React from "react";
import data from './data';
import Card from './card';
import { useNavigate, Link } from "react-router-dom";


export const MissPage = () => {
    let [profiles] = useState(data);

    return (
 <>
            <div className="miss-page">
                <h2>실종 게시판</h2>
                <Link to="uplode"> 실종 등록하기</Link>
                <br/>
                <h3>최근 실종 순</h3> 
                <Link to="moreInfo"> 더보기</Link>
                <br/>

                <Container>
                <Row>
                {profiles.map((item, i) => <Card profiles={item} i={i+1} key={item.id} />)}
                </Row>
                </Container>
            </div>
        </>
    );
};