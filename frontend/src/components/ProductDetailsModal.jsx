import { useEffect, useRef } from 'react'

const ProductDetailsModal = ({
  product,
  closeModal,
  isModalOpen,
}) => {
  const modalRef = useRef(null);

  // Handle clicking outside modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen, closeModal]);

  // Handle ESC key
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }
    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen, closeModal]);

  if (!product) return null;

  return (
    <>
      <div 
        className={`product-details-modal-overlay${isModalOpen ? ' active' : ''}`}
      >
        <div 
          className='product-details-modal-content'
          ref={modalRef}
        >
          {/* Close button */}
          <div className='product-details-modal-close-button-container'>
            <button
              className='product-details-modal-close-button' 
              onClick={closeModal} 
              aria-label="Close"
              style={{cursor: 'pointer', background: 'none', border: 'none'}}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Close">
                <line x1="4" y1="4" x2="16" y2="16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="4" x2="4" y2="16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Product image */}
          {product.image && (
            <div className='product-details-modal-image-container'>
              <img 
                src={product.image} 
                alt={product.name} 
                className='product-details-modal-image'
              />
            </div>
          )}

          {/* Product name */}
          <h2 className='product-details-modal-product-name'>
            {product.name}
          </h2>

          {/* Product brand */}
          {product.brand && (
            <div className='product-details-modal-product-brand'>
              <strong>Brand:</strong> {product.brand}
            </div>
          )}

          {/* Product category */}
          <div className='product-details-modal-product-category'>
            <strong>Category:</strong> {product.category || 'N/A'}
          </div>

          {/* Product price */}
          <div className='product-details-modal-product-price'>
            <strong>Price:</strong> ${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          {/* Product discount percentage */}
          {product.discountPercentage > 0 && (
            <div className='product-details-modal-product-discount'>
              <strong>Discount:</strong> {product.discountPercentage}% off
            </div>
          )}

          {/* Product rating */}
          {product.rating && (
            <div className='product-details-modal-product-rating'>
              <strong>Rating:</strong> {product.rating} / 5.0 ⭐
            </div>
          )}

          {/* Product availability status */}
          <div className='product-details-modal-product-availability'>
            <strong>Availability:</strong> {product.availabilityStatus || 'In Stock'}
          </div>

          {/* Product description */}
          {product.description && (
            <div className='product-details-modal-product-description'>
              <strong>Description:</strong>
              <p>{product.description}</p>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default ProductDetailsModal