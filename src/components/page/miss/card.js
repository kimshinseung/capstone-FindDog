/**
 * ./src/components/page/miss/card.js
 * 캐러셀에 들어가는 각 카드
 */

import { Link } from 'react-router-dom';
import {Col} from 'reactstrap';
import styled from 'styled-components';
import "./carousel.scss";

function Card(props) {
  let visible =  props.profiles.visibled;

  const onClickListener = () =>{
    if(visible==false){
      alert("가족의 품으로 돌아간 반려견입니다.");
    }
  }

  return (
    <>
      <ItemStyle visible={visible}>
        <Col>
        <Link to={visible && `${props.cg}/detail/${props.i}` || !visible && ``} onClick={onClickListener}>
          <div>
            <img className="carouselImg" src={props.profiles.imgs[0]} width={310} height={300} />
            <div className="carousel-dogInfo">
            <p>이름: {props.profiles.name}</p>
            <p>실종위치: {props.profiles.address}</p>
            </div>
          </div>
        </Link>
        </Col>
      </ItemStyle>
    </>
  )
}

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: #eef5ed;
  border-radius:8px;
  ${({ visible }) => {
    return visible ? null: `filter: grayscale(100%); opacity: 80%;`;
  }}
`;

export default Card;