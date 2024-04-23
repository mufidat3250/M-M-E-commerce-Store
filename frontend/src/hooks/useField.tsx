import React, { useState } from 'react'

const useField = (type:string) => {
    const [input, setInput] = useState('')

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const onReset = () => {
        setInput('')
    }
   return {
    type,
    input,
    handleChange,
    onReset
   }

   
  
}

export default useField
