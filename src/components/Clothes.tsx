
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
    category: string
}

const Clothes: React.FC = () => {

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
    const jewelleriesProducts = products.filter(product => product.category === 'Clothes');


    return (
        <>
            {/* <Header /> */}
            <div id="category-products">
                <h1>Clothes Store</h1>
                {products.length === 0 && <p className='no-products'>No Products in Clothes Store</p>}
                <div className="products-list">
                    {jewelleriesProducts.map(product => (
                        <div key={product.id} className="product">
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <p>Price: {product.price} $</p>
                            <p>Quantity: {product.quantity} items</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Clothes;