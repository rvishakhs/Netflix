import { Product } from '@stripe/firestore-stripe-payments'
import React from 'react'

interface Props{
    products: Product[]
    selectedPlan: Product
}


function Table({products, selectedPlan}: Props) {
  return (
    <table>
        <tbody >
            <tr>
                <td>Monthly prices</td>
                {products.map((product) => (
                    <td key={product.id} className={`TableStyling ${selectedPlan!.id === product!.id ? "text-[#e50914]" : "text-[gray]"}`}>{product.prices[0].unit_amount! / 100} GBP </td>
                ))}
            </tr>
            <tr>
                <td>Video Quality</td>
                {products.map((product) => (
                    <td key={product.id} className={`TableStyling ${selectedPlan!.id === product!.id ? "text-[#e50914]" : "text-[gray]"}`}>{product.metadata.Videoquality}</td>
                ))}
            </tr>
            <tr>
                <td>Devices Allowed</td>
                {products.map((product) => (
                    <td key={product.id} className={`TableStyling ${selectedPlan!.id === product!.id ? "text-[#e50914]" : "text-[gray]"}`}>{product.metadata.Device}</td>
                ))}
            </tr>
        </tbody>
    </table>
  )
}

export default Table