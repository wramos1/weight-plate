import React, { useState } from 'react'

const AddToCart = ({ variantId, buttonText, options = false, changePhoto }) => {
    const [selectedOption, setSelectedOption] = useState({ id: variantId, imgSrc: '' })

    const handleChange = (e) => {
        let option = JSON.parse(e.target.value)
        setSelectedOption({ id: option.id, imgSrc: option.image.url })
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
            body: JSON.stringify({ cartId: localCartData.cartId, variantId: selectedOption.id })
        });

        if (!result.ok) {
            console.error('There was a problem adding the item to the cart');
        }

        window.localStorage.setItem('Weight-Plate:cart:status', 'dirty');

    }

    return (
        <>
            <div className='flex flex-col gap-2'>
                <label htmlFor="variant" className='text-black font-extrabold'>Flavors</label>
                {options.length > 1 && (
                    <select name='variant' className='bg-slate-800/30 w-4/5 p-1' onChange={handleChange}>
                        {options.map((option) => (
                            <option value={JSON.stringify(option.node)} key={option.node.id}>
                                {option.node.title}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <button className="button w-4/5" onClick={addToCart}>
                {buttonText}
            </button>
        </>
    )
}

export default AddToCart