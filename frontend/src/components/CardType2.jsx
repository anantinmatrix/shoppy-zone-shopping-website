import "./css/CardType2.css";

function CardType2({ productName, shortDescription, productImage }) {
  return (
    <div
      className="cardType2 card mb-3 d-flex align-items-center"
      style={{ width: "18rem" }}
    >
      <div className="cardType2Image d-flex justify-content-center">
        <img src={productImage} className=" object-fit-cover" alt="Product" />
      </div>
      <div className="card-body">
        <h5
          className="card-title text-uppercase"
          style={{ fontSize: "0.75rem", fontWeight: "bold" }}
        >
          {productName}
        </h5>
        <p className="description card-text">{shortDescription}</p>
      </div>
    </div>
  );
}

export default CardType2;
