import {Col} from 'reactstrap';

function Card(props) {
    return (
      <>
        <Col>
          <img src={`images/missfind${props.i}.jpg`} width={300} height={300} />
          <h4>이름: {props.profiles.name}</h4>
          <p>실종위치: {props.profiles.missedplace}</p>
        </Col>
      </>
    )
  }

export default Card;