import { SearchInput } from './SearchInput'
import AuthButton from './Auth/AuthButton'
import CartNavIcon from './CartNavIcon/CartNavIcon'
import { Link } from 'react-router-dom'

const Navbar = ({navCartAddCount}) => {

  return (
    <>
      {/* TODO: Complete Tailwind migration - remove .navbar class */}
      <div className='navbar flex flex-row flex-wrap justify-between items-center max-w-full p-4 gap-4'>
        <Link to="/">
          <img src='/minishop-nav-logo.svg'/>
        </Link>
        <SearchInput/>
        <AuthButton navCartAddCount={navCartAddCount} />
        {/* CartNavIcon: hidden on mobile, visible on sm+ */}
        <Link to="/cart" className="hidden sm:block">
          <CartNavIcon navCartAddCount={navCartAddCount} />
        </Link>
      </div>
    </>
  )
}

export default Navbar