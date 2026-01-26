import { useContext } from 'react';
import CartContext from '../../../context/CartContext';

const CartItemCounter = () => {
  const { navCartAddCount } = useContext(CartContext);

  return (
    <div className='flex items-center justify-center absolute top-[30px] left-7 bg-red-600 text-white text-xs font-bold w-[23px] h-[23px] rounded-full pointer-events-none'>
      {navCartAddCount}
    </div>
  );
};

export default CartItemCounter;