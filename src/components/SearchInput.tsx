import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import "../CSS/style.css"
import { Props } from '../interfaces/searchInterface'

function SearchInput({ onSearch,value,placeholder }: Props) {
    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (ref.current) onSearch(e);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (ref.current) onSearch(e);
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <InputLeftElement
                    children={<FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#808080", }} />}
                />
                <Input
                    className='mb-4 search-input'
                    borderRadius={20}
                    placeholder={placeholder}
                    variant='filled'
                    // color='#969393'
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                />
            </InputGroup>
        </form>
    )
}

export default SearchInput;
