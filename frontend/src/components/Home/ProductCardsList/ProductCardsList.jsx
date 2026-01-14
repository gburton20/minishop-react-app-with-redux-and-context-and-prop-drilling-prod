import ProductCard from './ProductCard';

const ProductCardsList = ({
  products,
  handleAddToCart,
  openProductModal,
}) => {

  return (
    <div className="product-cards-list">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          handleAddToCart={handleAddToCart}
          openProductModal={openProductModal}
        />
      ))}
    </div>
  );
}

export default ProductCardsList