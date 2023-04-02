import {Col} from 'reactstrap';

// function Card(profile, i, id) {
//     return (
//       <>
//         <Col>
//           <img src={profile.img} width={300} height={300} />
//           <h4>이름: {profile.name}</h4>
//           <p>실종위치: {profile.address}</p>
//         </Col>
//       </>
//     )
//   }

function Card(props) {
  return (
    <>
      <Col>
        <img src={`images/missfind${props.i}.jpg`} width={300} height={300} />
        <h4>이름: {props.profile.name}</h4>
        <p>실종위치: {props.profile.missedplace}</p>
      </Col>
    </>
  )
}

export default Card;