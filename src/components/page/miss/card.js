/**
 * ./src/components/page/miss/card.js
 * 캐러셀에 들어가는 각 카드
 */

import { Link } from 'react-router-dom';
import {Col} from 'reactstrap';
import styled from 'styled-components';

function Card(props) {
  return (
    <>
      <ItemStyle>
        <Col>
        <Link to={`${props.cg}/detail/${props.i}`}>
          <div>
            <img src={props.profiles.imgs[0]} width={300} height={300} />
            <h4>이름: {props.profiles.name}</h4>
            <p>실종위치: {props.profiles.address}</p>
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
`;

export default Card;