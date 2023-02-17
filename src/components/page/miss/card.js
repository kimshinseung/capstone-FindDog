
import {Col} from 'reactstrap';

function Card(props) {
    return (
      <>
        <Col>
          <img src={`images/missfind${props.i}.jpg`} width={300} height={300} />
          <h4>{props.profiles.title}</h4>
          <p>{props.profiles.content}</p>
          <p>{props.profiles.price}</p>
        </Col>
      </>
    )
  }

export default Card;