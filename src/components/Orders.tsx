import '../CSS/orders.css'
import React, { useEffect, useState } from 'react';
import {faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTimesCircle,faHourglassHalf,faTimes } from '@fortawesome/free-solid-svg-icons';

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
    imagePath:string;
  }

  interface Order{
    id:number;
    customer:User;
    orderDate:Date;
    status:string;
    totalPrice:number;
    paymentMethod:string;
    deliveryAddress:string;
    deliveryPhoneNumber:string;
    products: Product[];
    quantities: number[]; 
  }

  interface FetchError extends Error {
    message: string;
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


    const showProducts =(orderId:number, event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        const products = document.getElementById('order-products-'+orderId);
        if(products){
            console.log('clicked');
            products.style.display='flex';
        }
        else{
            console.log('Products not found');
        }
    }

    const hideProducts =(orderId:number, event:React.MouseEvent)=>{
        event.preventDefault();
        const products = document.getElementById('order-products-'+orderId);
        if(products){
            console.log('clicked');
            products.style.display='none';
        }
        else{
            console.log('Products not found');
        }
    }

    const updateOrderStatus = (orderId: number, newStatus: string) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };
    const cancelOrder= async(oderId:number,e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/private/orders/cancelOrder/${oderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.log('Cancelling Order......')
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Error cancelling order');
            }
            const data = await response.json();
            if(data){
                alert('Order Cancelled Successfully !');
                updateOrderStatus(oderId, 'CANCELED');
            }
        } catch (error) {
            const typedError = error as FetchError;
            setError(typedError.message || 'Error fetching orders');
            // if (error.message) {
            //     setError(error.message);
            // } else {
            //     setError('Error fetching orders');
            // }
        }
      }
    useEffect(() => {

        const fetchOrders = async () => {
            
            try {
                const response = await fetch(`http://localhost:8080/api/private/orders/getOrdersByOwner/${userId}`, {
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
            } catch (error) {
                const typedError = error as FetchError;
                setError(typedError.message || 'Error fetching orders');
                // // if (error.message) {
                //     const typedError = error as FetchError;
                //    setError(typedError.message || 'Error fetching orders');
                //     setError(error.message);
                // } else {
                //     setError('Error fetching orders');
                // }
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
                        <div className='order' key={order.id}>
                            <div className='orderNumber-date'>
                            <p>Order No: {order.id}</p>
                            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                            <div className='price-status'>
                            <p>Total Amount: ${order.totalPrice}</p>
                            <p className='order-status'>Status:
                                 {order.status == 'PENDING'&& <span className='pending-order'><FontAwesomeIcon className='order-status-icon' icon={faHourglassHalf} />PENDING</span>}
                                 {order.status == 'CANCELED'&& <span className='cancelled-order'><FontAwesomeIcon className='order-status-icon' icon={faTimesCircle} />CANCELLED</span>}
                                 {order.status == 'DELIVERED'&& <span className='delivered-order'><FontAwesomeIcon className='order-status-icon' icon={faCheckCircle} />DELIVERED</span>}
                            </p>
                            <p className='pro-count'><span>{order.products.length} Product(s)</span><button onClick={(e)=>{showProducts(order.id,e)}} className='view-products'>View All</button> </p>
                            {order.status == 'PENDING'&&<button className='cancel-order' onClick={(e)=>{cancelOrder(order.id,e)}}><FontAwesomeIcon className='cancel-order-icon' icon={faTimesCircle} />Cancel Order</button>}
                            
                            </div>
                            <div className='order-products' id={`order-products-${order.id}`} >
                            <span className='close-table' id={`close-table${order.id}`} onClick={(e)=>{hideProducts(order.id,e)}}><FontAwesomeIcon className='cancel-order-icon' icon={faTimes} /></span>
                            {order.products.length > 0 ? (
                                <table className='products-table'>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                         {order.products.map((product,index) => (
                                                <tr className='order-product' key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td><img src={product.imagePath} alt="product image" /></td>
                                                    <td>{order.quantities[index]}</td>
                                                    <td>${product.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                            
                           ):(
                            <p>This order doesn't have any product</p>
                           )}
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 id='no-order'>No orders found.</h2>
                )}
          </div>
    </div>
}
export default Orders;