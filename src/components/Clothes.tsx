
import '../CSS/categoryStyles.css'
import React, { useEffect, useState, MouseEvent } from 'react';
// import Header from './header';
// import Footer from './footer';
//import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    imagePath: string
}
interface User {
    id: number;
    names: string;
    email: string;
    isAdmin: boolean;
    status: string;
    password:string
}
interface Cart {
    user: User;
    products: Product[];
}
// interface CartProduct {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     quantity: number;
//     category: string;
//     imagePath: string
// }
const Clothes: React.FC = () => {

    const [add_response, setResponse] = useState('');
    const [add_error, setError] = useState('');
    const [loginFirst, setLoginFirst] = useState('');

    const api_url = 'http://localhost:8080/api/products';
    const cart_url = 'http://localhost:8080/api/cart';
    const [products, setProducts] = useState<Product[]>([]);


    //const navigate = useNavigate();

    const oncloseError=(event:MouseEvent)=>{
        event.preventDefault();
        setLoginFirst('');

    }

    const addCart= async(product:Product,event:MouseEvent )=>{
        event.preventDefault();
        const loggedUser= sessionStorage.getItem('loggedUser');
        if(loggedUser){
            try {
                const user = JSON.parse(loggedUser);
                const cart: Cart = {
                    user: user, 
                    products: [product] 
                };
                const response = await fetch(cart_url + `/newCart/${user.id}`, {
                    // method: 'POST',
                    // body: cart
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(cart)
                });
                const data = await response.text();
                if (data !== "Cart Added Successfully !") {
                    setResponse('');
                    setError(data);
                    alert(add_error);
                }
                else {
                    setError('');
                    setResponse(data);
                    alert(add_response);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An unexpected error occurred');
            }
        }
        else{
            setLoginFirst('Login First to add items to cart !')
           // navigate('/login')
       }
}


    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch(api_url + '/allProducts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                if (data != null) {
                    setProducts(data);
                }
                else {
                    console.log('No data found')
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        loadProducts();
    }, []);




    // Group products by category
    const clothesProducts = products.filter(product => product.category === 'Clothes');


    return (
            <div id="category-products">
                <h1>Clothes Store</h1>
                {loginFirst && <p id='login-first'>{loginFirst} <button onClick={(event)=>{oncloseError(event)}} id='okBtn'>OK</button></p>}
                {products.length === 0 && <p className='no-products'>No Products in Clothes Store</p>}
                <div className="products-list">
                    {clothesProducts.map(product => (
                        <div key={product.id} className="product">
                             {product.imagePath && (
                        <img className='product-img' src={`http://localhost:8080/products/images/${product.imagePath}`} alt={product.imagePath} />
                    )}
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <p>Price: {product.price} $</p>
                            <p>Quantity: {product.quantity} items</p>
                            <button onClick={(e)=>{addCart(product, e)}} id='addCart'>Add Cart</button>
                        </div>
                    ))}
                </div>
            </div>
);
};
export default Clothes;