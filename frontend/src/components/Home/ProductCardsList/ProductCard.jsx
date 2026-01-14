import { useContext, useState, useEffect, useRef } from 'react'
import CartContext from '../../../context/CartContext'

const ProductCard = ({
    product,
    openProductModal,
}) => {
    const { handleAddToCart } = useContext(CartContext);
    const [hoverTimer, setHoverTimer] = useState(null);
    const cardRef = useRef(null);
    
    // Safety check
    if (!product) {
        console.error('ProductCard received undefined product');
        return null;
    }
    
    // Hover trigger logic (5 seconds) - disabled on touch devices
    const handleMouseEnter = () => {
        // Disable hover trigger on touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            return; // Exit early on touch devices
        }
        
        const timer = setTimeout(() => {
            openProductModal(product);
        }, 5000); // 5 seconds
        setHoverTimer(timer);
    };
    
    const handleMouseLeave = () => {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            setHoverTimer(null);
        }
    };
    
    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (hoverTimer) {
                clearTimeout(hoverTimer);
            }
        };
    }, [hoverTimer]);
    
    return (
        <>
            <div 
                className='product-card-container'
                ref={cardRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Info button in top-right corner */}
                <button
                    className='product-card-info-button'
                    onClick={() => openProductModal(product)}
                    aria-label="View product details"
                    title="View product details"
                >
                    ℹ️
                </button>
                
                {product.image ? (
                    <img 
                        className='product-card-image' 
                        src={product.image} 
                        alt={product.name} 
                        loading="lazy"
                    />
                ) : null}                
                <div className="product-card-name">{product.name}</div>
                <div className="product-card-price">${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <button
                    className='product-card-add-to-cart-button'
                    onClick={() => {
                        const productDataPerClick = {
                            category: product.category,
                            image: product.image,
                            name: product.name,
                            price: product.price
                        }
                        handleAddToCart(productDataPerClick);
                    }}
                >
                    Add to cart
                </button>
            </div>
        </>
    )
}

export default ProductCard