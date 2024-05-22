import '../CSS/orders.css'
import React, { useEffect, useState } from 'react';


interface User{
    id:number;
    email:string;
    phoneNumber:string;
    isAdmin:boolean;
    status:string;
    password:string;
  }

  interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }

  interface Order{
    id:number;
    customer:User;
    orderDate:Date;
    orderStatus:string;
    totalPrice:number;
    paymentMethod:string;
    deliveryAddress:string;
    deliveryPhoneNumber:string;
    products: Product[]
  }
const Orders:React.FC =()=>{

    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState('');
    let userId: number | null = null;
    let user: User | null = null;
    const loggedUser = sessionStorage.getItem('loggedUser');
    if(loggedUser){
        user = JSON.parse(loggedUser);
        if(user){
          userId = user.id;
        }
    }

    useEffect(() => {

        const fetchOrders = async () => {
            
            try {
                const response = await fetch(`http://localhost:8080/api/orders/getOrdersByOwner/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    console.log('Fetching orders......')
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message || 'Error fetching orders');
                }

                const data = await response.json();
                setOrders(data);
            } catch (error:any) {
                if (error.message) {
                    setError(error.message);
                } else {
                    setError('Error fetching orders');
                }
            }
        };
        fetchOrders();
    }, [userId]);


    return <div id='customer-orders'>
        <h1>My Orders</h1>
        {error && <p className="error">{error}</p>}
            <div id='my-orders'>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div id='order' key={order.id}>
                            <p>Order ID: {order.id}</p>
                            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p>Total Amount: ${order.totalPrice}</p>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
    </div>
}
export default Orders;