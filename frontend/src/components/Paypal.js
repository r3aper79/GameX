import React, { useEffect, useRef } from 'react'


const Paypal = (props) => {
    const paypal = useRef()
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {description: props.compra.concepto, amount: {value: props.compra.monto, currency_code: 'USD'}}
                    ]
                })
            },
            onApprove: (data, actions) => {
                props.setNextStep('verifyOrder')
            },
            onError: (err) => {
                alert("Compra NO exitosa, intentá otro dia!")
                console.log(err)
            }
        }).render(paypal.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <div className='divPaypal' ref={paypal}>
       
    </div>
}

export default Paypal
