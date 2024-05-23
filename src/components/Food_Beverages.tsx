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
    const [products, setProducts] = useState<Product[]>([]);

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
    const Food_BeveragesProducts = products.filter(product => product.category === 'Food & Beverages');


    return (
            <div id="category-products">
                <h1>Foods and Beverages Store</h1>
                {Food_BeveragesProducts.length === 0 && <p className='no-products'>No Products in Foods and Beverages Store</p>}
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
                            <button id='addCart'>Add Cart</button>
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default Food_BeveragesProducts;