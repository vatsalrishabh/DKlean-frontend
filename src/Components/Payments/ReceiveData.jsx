import React, { useEffect, useState } from 'react'

const ReceiveData = () => {
    const [paymentData, setPaymentData] = useState({})
    useEffect(()=>{
        const data = localStorage.getItem('paymentData');
        if(data){
            setPaymentData(JSON.parse(data));
        }
    },[]);

  return (
    <div>
      
    </div>
  )
}

export default ReceiveData
