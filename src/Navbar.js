import './Navbar.css';
import { useGlobalContext } from './Context';
export const Navbar =()=>{
     const {user} = useGlobalContext();
return(
    <>
    <nav>
        <h2 className='logo-name'>edvora</h2>
        <div className='left-content'>
            <h2 className='customer-name'>{user?.name}</h2>
            <div className='image_container'>
            <img className='image' src={user?.url} alt="customer's image"/>
            </div>
        </div>
    </nav>
    </>
)
}