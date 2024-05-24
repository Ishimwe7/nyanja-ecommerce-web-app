import '../CSS/categoryStyles.css'
import React, { useEffect, useState } from 'react';
// import Header from './header';
// import Footer from './footer';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    imagePath:string
}

const Food_BeveragesProducts: React.FC = () => {

    const api_url = 'http://localhost:8080/api/products';
    const cart_url = 'http://localhost:8080/api/cart';
    const [products, setProducts] = useState<Product[]>([]);
    const [loginFirst, setLoginFirst] = useState('');

    const oncloseError=(event:React.MouseEvent)=>{
        event.preventDefault();
        setLoginFirst('');

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


    const addCart= async(product:Product,event:React.MouseEvent )=>{
        event.preventDefault();
        const loggedUser= sessionStorage.getItem('loggedUser');
        if(loggedUser){
            try {
                const user = JSON.parse(loggedUser);
                // const cart: Cart = {
                //     user: user, 
                //     products: [product] 
                // };
                const response = await fetch(cart_url + `/editcart/${user.id}`, {
                    // method: 'POST',
                    // body: cart
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(product)
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                   alert('Cart Item Added Successfully');
                }
                else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An unexpected error occurred');
            }
        }
        else{
            setLoginFirst('Login First to add items to cart !')
           // navigate('/login')
       }
}


    // Group products by category
    const Food_BeveragesProducts = products.filter(product => product.category === 'Food & Beverages');


    return (
            <div id="category-products">
                <h1>Foods and Beverages Store</h1>
                {Food_BeveragesProducts.length === 0 && <p className='no-products'>No Products in Foods and Beverages Store</p>}
                {loginFirst && <p id='login-first'>{loginFirst} <button onClick={(event)=>{oncloseError(event)}} id='okBtn'>OK</button></p>}
                <div className="products-list">
                    {Food_BeveragesProducts.map(product => (
                        <div key={product.id} className="product">
                                {product.imagePath && (
                        <img className='product-img' src={product.imagePath} alt='Product Image' />
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
}

export default Food_BeveragesProducts;