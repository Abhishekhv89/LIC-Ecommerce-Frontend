import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { FaSearch } from "react-icons/fa";
import "../CSS/style.css"
import {Props} from '../interfaces/searchInterface'



function SearchInput({onSearch}:Props) {
    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(ref.current) onSearch(ref.current.value);
    }
  return (
    <form action="" onSubmit={handleSubmit} className='mt-5'>
        <InputGroup>
    <InputLeftElement
        children={<FaSearch color='grey' />}
    />
    <Input
        className='mb-4 search-input'
        borderRadius={20}
        placeholder='Search Brands...'
        variant='filled'
        color='#969393'
        ref={ref}
    />
</InputGroup>

    </form>
   

      
    
  )
}

export default SearchInput
