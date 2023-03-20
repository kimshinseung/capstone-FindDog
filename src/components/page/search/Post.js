import React from "react";
import Item from './item';
const Post = ({ postObj }) => {

  //검색하기 전 null일 때 상태 값
  if (postObj[0] == null) {
    return (
      <div>
        <h4>데이터가 없습니다</h4>
      </div>
    )
  }

  //검색 후 실행되는 부분
  else {
    //console.log(postObj);
    return (
      <div>{
        postObj.map((item) =>
          <Item item={item} />
        )
      }
      </div>
    );
  }
  //  console.log(postObj[0])
  //   return(
  //     <div>
  //       <h4>{postObj.id}</h4>
  //     </div>
  //   );
};


export default Post;