import React, { useState } from 'react'

const Item = ({ item, deleteItem }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const addToQuantity = () => {
        setQuantity(quantity + 1);
    };

    const removeFromQuantity = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(quantity - 1);
    };

    return (
        <li className='w-full flex flex-col my-3 gap-1'>
            <div className='w-full flex justify-between items-center'>
                <div>
                    <p className='font-bold'>
                        {item.merchandise?.product?.title}
                    </p>
                    <p className='text-xs'>
                        {item.merchandise?.title === 'Default Title' ? 'Original' : `${item.merchandise?.title}`}
                    </p>
                </div>

                <p>
                    {formattedPrice.format(item.estimatedCost?.totalAmount?.amount)}
                </p>
            </div>

            <div className='flex gap-5'>
                <div className='flex bg-slate-800 text-white w-fit rounded-lg items-center text-sm'>
                    <button onClick={removeFromQuantity} className='px-3 hover:bg-slate-400/50 rounded-l-lg py-1'>
                        -
                    </button>

                    <p className='px-2'>
                        {quantity}
                    </p>

                    <button onClick={addToQuantity} className='px-3 hover:bg-slate-400/50 rounded-r-lg py-1'>
                        +
                    </button>
                </div>

                <button className="formal-button p-1 flex self-start rounded-lg text-sm" onClick={() => deleteItem(item)}>
                    Delete
                </button>
            </div>
        </li>
    )
}

export default Item