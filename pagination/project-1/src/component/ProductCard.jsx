const ProductCard = ({ product }) => {
  return (
    <div className="product-wrapper">
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
    </div>
  );
};
export default ProductCard;
