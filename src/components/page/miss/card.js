import { Link } from 'react-router-dom';
import {Col} from 'reactstrap';
import styled from 'styled-components';

// function Card(props) {
//   return (
//     <>
//     <ItemStyle>
//     <Col>
//     <Link to={`/detail/${props.i}`}>
//       <div>
//         <img src={`images/missfind${props.i}.jpg`} width={250} height={300} />
//         <h4>이름: {props.profiles.name}</h4>
//         <p>실종위치: {props.profiles.missedplace}</p>
//       </div>
//     </Link>
//       </Col>
//     </ItemStyle>
//     </>
//   )
// }

function Card(props) {
  return (
    <>
      <ItemStyle>
        <Col>
        <Link to={`/detail/${props.i}`}>
          <div>
            <img src={props.profiles.imgs[0]} width={300} height={300} />
            <h4>이름: {props.profiles.name}</h4>
            <p>실종위치: {props.profiles.missedplace}</p>
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
  background-color: aliceblue;
`;

export default Card;