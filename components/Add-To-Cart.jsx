import React, { useState } from 'react'

const AddToCart = ({ variantId, buttonText, options = false }) => {
    const [id, setId] = useState(variantId);

    const handleChange = (e) => {
        setId(e.target.value);
    }

    const addToCart = async () => {
        const localCartData = JSON.parse(window.localStorage.getItem('Weight-Plate:cart'));

        if (!localCartData.cartId) {
            console.error('Error loading your cart');
            return;
        }

        const result = await fetch('/api/add-to-cart', {
            method: 'POST',
            body: JSON.stringify({ cartId: localCartData.cartId, variantId: id })
        });

        if (!result.ok) {
            console.error('There was a problem adding the item to the cart');
        }

        window.localStorage.setItem('Weight-Plate:cart:status', 'dirty');

    }

    return (
        <>
            {options.length > 1 && (
                <select name='variant' className='options' onChange={handleChange}>
                    {options.map((option) => (
                        <option value={option.node.id} key={option.node.id}>
                            {option.node.title}
                        </option>
                    ))}
                </select>
            )}
            <button className="button" onClick={addToCart}>
                {buttonText}
            </button>
        </>
    )
}

export default AddToCart