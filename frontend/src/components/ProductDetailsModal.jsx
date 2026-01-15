import { useEffect, useRef } from 'react'

const ProductDetailsModal = ({
  product,
  closeModal,
  isModalOpen,
}) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Focus management and scroll lock
  useEffect(() => {
    if (isModalOpen) {
      // Store the element that triggered the modal
      previousActiveElement.current = document.activeElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus to trigger element
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Focus trap - keep Tab navigation within modal
  useEffect(() => {
    function handleTabKey(event) {
      if (!isModalOpen || event.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // If shift+tab on first element, go to last
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      // If tab on last element, go to first
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleTabKey);
    }

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isModalOpen]);

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
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-name"
        aria-describedby="modal-product-description"
      >
        <div 
          className='product-details-modal-content'
          ref={modalRef}
        >
          {/* Close button */}
          <div className='product-details-modal-close-button-container'>
            <button
              ref={closeButtonRef}
              className='product-details-modal-close-button' 
              onClick={closeModal} 
              aria-label="Close product details"
              style={{cursor: 'pointer', background: 'none', border: 'none'}}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
                alt={`${product.name} product image`}
                className='product-details-modal-image'
              />
            </div>
          )}

          {/* Product name */}
          <h2 
            id="modal-product-name"
            className='product-details-modal-product-name'
          >
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
            <div 
              id="modal-product-description"
              className='product-details-modal-product-description'
            >
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