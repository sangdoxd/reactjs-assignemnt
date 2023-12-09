import React, { useState, useEffect } from 'react'
import { FormType } from '../../constants/common'

const CartList = ({ className, cart, setCart, currentCartItem, setCartItem, currentForm, setForm }) => {
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    // Cart state change => calculate quantity and total => re-render
    useEffect(() => {
        setTotalQuantity(cart.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0))
        setTotalPrice(cart.reduce((accumulator, currentItem) => accumulator + currentItem.total, 0))
    }, [cart])

    const deleteCartItem = (itemId) => {
        const newCart = cart.filter(item => item.id !== itemId)
        setCart(newCart)
    }

    const handleItemClick = (item) => {
        setCartItem({ ...item })
        setForm(FormType.UPDATE)
    }

    return (
        <div className={`card ${className}`} >
            <h2 className="card-header">Cart-list</h2>
            <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Qty.</th>
                            <th>Prices</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id}
                                className={`book align-middle ${item.id === currentCartItem.id && currentForm === FormType.UPDATE ? 'active' : ''}`}
                                onClick={() => handleItemClick(item)}
                            >
                                <td className='d-flex align-items-center'>
                                    <div style={{ width: '60px', height: '40px' }}
                                        className='me-2 border'>
                                        <img src="https://s26162.pcdn.co/wp-content/uploads/sites/2/2022/05/Book.jpg" alt="book"
                                            className='w-100 h-100' />
                                    </div>
                                    <div>
                                        <h4>{item.title}</h4>
                                        <span>{item.subtitle}</span>
                                    </div>
                                </td>
                                <td>{item.quantity}</td>
                                <td>${item.total.toFixed(2)}</td>
                                <td><button className="btn btn-danger"
                                    onClick={() => deleteCartItem(item.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td>{totalQuantity}</td>
                            <td className='text-danger'>${totalPrice.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default CartList