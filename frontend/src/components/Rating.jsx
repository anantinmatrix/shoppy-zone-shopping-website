
function Rating({rating}) {
    let ratingArray = [];
    if (rating) {
          for (let i = 0; i <= rating - 1; i++) {
              ratingArray.push(1);
            }
    }
  return (
    <div>
        {ratingArray.map((rate,index)=>{
          if(rating){

            return (
              <i key={index} className="fa-solid fa-star" style={{color: 'orange'}}></i>
            )
          }else{
            return (
              <i key={index} className="fa-solid fa-star"></i>
            )
          }
          })}
    </div>
  )
}

export default Rating