import "./css/CardType3.css";
const CardType3 = ({ title, productBrand, price, image, rating }) => {
  let ratingArray = [];
  if (rating) {
        for (let i = 0; i <= rating - 1; i++) {
            ratingArray.push(rating);
          }
  }
  return (
    <div className="cardType3 ">
      <div className="cardBody ">
        <div className="image">
          <img src={image} alt="product_image" />
        </div>
        <div className="cardContent">
          <h6 className=" text-muted">{productBrand}</h6>
          <h5>{title}</h5>
          <div className="rating">
            {ratingArray.map((rate,index) => {
                if(rate <=5 || rate >=0){
              return (  
                  <i
                  key={index}
                    className="fa-solid fa-star"
                    style={{ color: "orange" }}
                  ></i>
              );}else if(!rating){
                return(
                  <i
                  key={index}
                    className="fa-solid fa-star"
                    style={{ color: "grey" }}
                  ></i>
                )
              }
            })}
            <p>{rating ? rating : 0}/5</p>
          </div>
          <p>Rs. {price}</p>
        </div>
      </div>
    </div>
  );
};

export default CardType3;
