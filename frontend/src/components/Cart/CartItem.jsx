import {useContext} from 'react'
import CartContext from '../../context/CartContext';

const CartItem = ({ 
  cartItems = useContext(CartContext), 
  cartItemCounts = useContext(CartContext), 
  handleAddToCart = useContext(CartContext), 
  handleRemoveFromCart = useContext(CartContext) 
}) => {
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  return (
    <>
      {cartItems
        .filter((item, index, self) => 
          index === self.findIndex(t => t.name === item.name)
        )
        .map((item, _) => (
          <div className='flex border-2 mb-2' key={item.name}>
            <img
              className='w-[60%]'
              src={item.image || '/no-image-placeholder-image.svg'}
              alt={item.name || 'No product image found'}
            />
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-col justify-center items-center text-center'>
                <div className='font-medium'>{item.name}</div>
                <div className='font-light'>${Number(item.price).toFixed(2)}</div>
                <div className='flex justify-evenly m-1.25 p-1.25 w-[80%] border-2'>
                  {/* The '-' button: */}
                  <button
                    className="bg-gray-400 w-[25%] rounded-lg hover:bg-[#f5f5f5] hover:border-[#999]"
                    onClick={() => {
                      handleRemoveFromCart(item);
                    }}>-</button>
                  <div><strong>{cartItemCounts[item.name]}</strong></div>
                  {/* The '+' button */}
                  <button onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default CartItem
