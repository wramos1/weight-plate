import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const AddToCart = ({ variantId, product, price, options = false, changePhoto }) => {
    const [selectedOption, setSelectedOption] = useState({ id: variantId, imgSrc: '' })
    const [variant, setVariant] = useState(product.variants[0].node.title);
    const [quantity, setQuantity] = useState(1);

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const handleChange = (e) => {
        let option = JSON.parse(e.target.value)
        setSelectedOption({ id: option.id, imgSrc: option.image.url })
        setVariant(option.title);
        changePhoto(option.image.url)
    }

    const addToCart = async () => {
        const localCartData = JSON.parse(window.localStorage.getItem('Weight-Plate:cart'));

        if (!localCartData.cartId) {
            console.error('Error loading your cart');
            return;
        }

        const result = await fetch('/api/add-to-cart', {
            method: 'POST',
            body: JSON.stringify({ cartId: localCartData.cartId, variantId: selectedOption.id, quantity })
        })
            .then(() => {
                toast.success(`${quantity} ${product.title} ${variant === 'Default Title' ? '' : `- ${variant}`} added to your cart`);
            })
            .catch(() => {
                toast.error(`Failed to add ${quantity} ${product.title} ${variant === 'Default Title' ? '' : `- ${variant}`} to your cart`)
            })

        window.localStorage.setItem('Weight-Plate:cart:status', 'dirty');
    }

    return (
        <>

            {options.length > 1 && (
                <div className='flex flex-col gap-2'>
                    <label htmlFor="variant" className='text-black'>Flavors</label>
                    <select name='variant' className='bg-slate-800/30 w-4/5 p-1' onChange={handleChange}>
                        {options.map((option) => (
                            <option value={JSON.stringify(option.node)} key={option.node.id}>
                                {option.node.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className='flex flex-col gap-2'>
                <label htmlFor="quantity">Quantity</label>
                <input type="number" value={quantity} name="quantity" id="quantity" min={1} onChange={(e) => setQuantity(e.target.value)} className="w-16 bg-slate-400/30 text-black border border-black px-1" />
            </div>


            <button className="button w-4/5" onClick={addToCart}>
                {`Purchase for ${formattedPrice.format(price * quantity)}`}
            </button>
            <ToastContainer />
        </>
    )
}

export default AddToCart