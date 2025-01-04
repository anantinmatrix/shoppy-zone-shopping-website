import "./css/CardType1.css";

function CardType1({ image, categoryName, description }) {
  return (
    <div className="cardType1">
      <img src={image} alt="category" />
      <div className="cardContent">
        <p>{categoryName}</p>
        <hr />
        <h4 className="mt-4">{description}</h4>
      </div>
    </div>
  );
}

export default CardType1;
