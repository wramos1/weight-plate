import React from 'react'
import ProductList from '../components/ProductList'

const Menu = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className="title">
                Menu
            </h1>
            <ProductList />
        </div>
    )
}

export default Menu