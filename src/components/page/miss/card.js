
import {Col} from 'reactstrap';

function Card(props) {
    return (
      <>
        <Col>
          <img src={`/${props.i}.jpg`} />
          <h4>{props.profiles.title}</h4>
          <p>{props.profiles.content}</p>
          <p>{props.profiles.price}</p>
        </Col>
      </>
    )
  }

export default Card;