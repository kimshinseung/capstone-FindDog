import {Col} from 'reactstrap';

function Card({item}) {
  return (
    <div>
        <Col>
            <img src={item.img} width={300} height={300} />
            <h4>이름: {item.name}</h4>
            <p>위치: {item.address}</p>
        </Col>
        {/* <li>{item.name} {item.address}</li> */}
    </div>
);
  }

export default Card;