import React, { useState, useEffect } from 'react';
import '../CSS/cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import {faShoppingCart,faTrash,faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Orders from './Orders';
import { ChangeEvent } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  id: number;
  products: Product[];
}

interface User{
  id:number;
  email:string;
  phoneNumber:string;
  isAdmin:boolean;
  status:string;
  password:string;
}

interface Orders {
  customer: User;
  orderdate:Date;
  status:string;
  totalPrice:number;
  paymentMethod:string;
  deliveryAddress:string;
  deliveryPhoneNumber:string;
  products: Product[];
}

// interface CartProps {
//   userId: number;
// }
//let userId:number;

const CartComponent: React.FC = () => {

  const cart_url = 'http://localhost:8080/api/cart';
  const orders_url = 'http://localhost:8080/api/orders';
    let userId: number | null = null;
    const loggedUser = sessionStorage.getItem('loggedUser');
    if(loggedUser){
        const user = JSON.parse(loggedUser);
        userId = user.id;
    }
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [order,setOrder] = useState({
    customer: loggedUser,
    orderdate:Date.now(),
    status:'PENDING',
    totalPrice:grandTotal,
    paymentMethod:'',
    deliveryAddress:'',
    deliveryPhoneNumber:'',
    products: cart?.products
});

  const calculateSubtotal =(price:number,quantity:number)=>{
    return price * quantity;
  }
  
  // const decrementQuantity=(event:React.MouseEvent<HTMLButtonElement>)=>{
  //   event.preventDefault();
  //   if(quantity>1){
  //     setQuantity(quantity-1);
  //   }
  //   //setSubtotal()
  // }
  // const incrementQuantity=(max_quantity:number,event:React.MouseEvent<HTMLButtonElement>)=>{
  //   event.preventDefault();
  //   if(quantity<max_quantity){
  //     setQuantity(quantity+1);
  //   }
  // }

  const updateQuantity = (index: number, newQuantity: number) => {
    const newQuantities = [...quantity];
    newQuantities[index] = newQuantity;
    setQuantity(newQuantities);
  };

  const handleOrderDetailsChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrder({
        ...order,
        [name]: value
    });
};
  const placeOrder = async(order:Orders, event:React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    try{
      const response = await fetch(orders_url+'/placeOrder',{
        method: 'POST',
                  headers: {
                      'Content-Type': 'application/json' 
                  },
                  body: JSON.stringify(order)
      })
      const data = await response.json();
      if (response.ok) {
        alert('Order Placed Successfully');
        console.log(data);
     }
     else {
         alert(data.message);
     }
    }catch(erorr){
      console.log(erorr);
    }
  }

  const deleteCartItem = async(productId: number,event:React.MouseEvent<HTMLSpanElement> ) => {
    event.preventDefault();
    const loggedUser= sessionStorage.getItem('loggedUser');
    if(loggedUser){
        try {
            //const user = JSON.parse(loggedUser);
            const response = await fetch(cart_url + `/deleteCartItem/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(cart)
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
               alert('Cart Item deleted Successfully');
               const updatedCart = {
                ...cart!,
                products: cart!.products.filter(product => product.id !== productId)
              };
              setCart(updatedCart as Cart);
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
        alert('Login First to add items to cart !')   
   }
  };

  const showConfirmationForm=(event:React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    const confirmationForm = document.getElementById('confirmation-form');
    if(confirmationForm){
      confirmationForm.style.display='block';
    }
  }

  useEffect(() => {
    if (cart) {
      // Initialize quantity state with the correct length
      setQuantity(new Array(cart.products.length).fill(1));
    }
  }, [cart]);

  useEffect(() => {
    if (!cart) {
      setLoading(false);
      return;
    }

    // Calculate subtotal for each product
    const subtotals = cart.products.map((product, index) =>
      calculateSubtotal(product.price, quantity[index])
    );

    // Calculate grand total
    const newGrandTotal = subtotals.reduce((acc, curr) => acc + curr, 0);
    setGrandTotal(newGrandTotal);
  }, [cart, quantity]);
  useEffect(() => {
    // if (!cart) return;

    const fetchCart = async () => {
      try {
        if (!userId) return;
      //  const response = await fetch('/api/cart/getCartByOwner/'+userId);
        const response = await fetch('http://localhost:8080/api/cart/getCartByOwner/'+userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        //console.log(response.ok);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch cart');
        // }
        if(response.status === 404){
          setLoading(false);
          setError('Not Cart found for you ');
        }
        if(response.ok){
          const cartData = await response.json();
          setCart(cartData);
          console.log(cartData);
          setLoading(false);
        }
      } catch (error) {
        setError('An expected error');
        console.log(error)
        setLoading(false);
      }
    };

    fetchCart();
  },[userId]);

  if (loading) {
    return <div className='cart-res-message'>Please wait while We're Loading your Cart....</div>;
  }

  if (error) {
    return <div className='cart-res-message'><h1>{error}</h1></div>;
  }

  if (!cart) {
    return <div className='cart-res-message'><h1>No cart found for You</h1></div>;
  }
  if(cart.products.length<=0){
    return <div className='cart-res-message'><h1>Nothing In Your Cart !</h1></div>
  }

  return (
    <div id='cart-items'>
      <h2>My Cart</h2>
      <div id='cart-products'>
        {cart.products.map((product,index) => (
          <div key={product.id} className='product'>
            <p>Product name :   {product.name}</p>
            <p>Unit price - ${product.price}</p>
            <span className='deleteCartItem' onClick={(e) => deleteCartItem(product.id,e)}><FontAwesomeIcon className='icons' icon={faTrash}/></span>
            <div className='items-count'>
              <button className='inc-dec' onClick={() => {
                  updateQuantity(
                    index,
                    Math.max(quantity[index] - 1, 1)
                  );
                }}>-</button><span className='count'>{quantity[index]} item(s)</span><button className='inc-dec' onClick={() => {
                  updateQuantity(
                    index,
                    Math.min(quantity[index] + 1, product.quantity)
                  );
                }}>+</button>
            </div>
            <div className='subtotal'>
              <h3>Sub-total: $<span>{calculateSubtotal(product.price, quantity[index])}</span></h3>
            </div>
          </div>
        ))}
        <div id='grand-total-check'>
          <h2>Grand Total: $<span>{grandTotal}</span></h2>
          <button onClick={(e)=>{showConfirmationForm(e)}}>PLACE ORDER <FontAwesomeIcon className='icons' icon={faShoppingCart}/></button>
        </div>
        <div id='confirmation-form'>
          <h3>Fill Out Required Information To Confirm Order</h3>
         <div className="inputs">
         <div className='row'>
            <label htmlFor="payment-methods">Please Choose Payment Method :</label>
            <select id='payment-methods' name='paymentMethod' value={order.paymentMethod} onChange={handleOrderDetailsChange}>
              <option value="Cash">Cash On Delivery</option>
              <option value="Credit/Debit Card ">Credit/Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="row">
            <label htmlFor="delivery-contact">Delivery Contact number :</label>
            <input type="text" name="deliveryPhoneNumber" id="delivery-contact" value={order.deliveryPhoneNumber} />
          </div>
          <div className="row">
            <label htmlFor="delivery-address">Delivery Address :</label>
            <input type="text" name="deliveryAddress" id="delivery-address" value={order.deliveryAddress} onChange={handleOrderDetailsChange} />
          </div>
         </div>
         <button onClick={(e)=>{placeOrder(order,e)}}><FontAwesomeIcon className='confirm-order-icon' icon={faCheckCircle} />CONFIRM ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
