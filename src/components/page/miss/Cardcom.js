import Card from './card';

function Cardcom({profiles}) {
  return (
    <>
        <div>{
            profiles.map((item) => <Card profiles={item} key={item.id} />)
        }</div>
        {/* <Card props = {profiles}></Card> */}
    </>
  )
}

export default Cardcom;