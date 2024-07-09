import React, { useState } from 'react'
import { Box, Button, Center, Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react'
// import { Stack } from 'react-bootstrap';
import "../CSS/style.css"



interface Props{
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    list:string[]
    title:string
}

function MUltiCheckBox({onChange,list,title}:Props) {
    
    const [visibleItems, setVisibleItems] = useState(10);

    const showMoreItems = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    };
 



    return (
        <div className='brandsContainer'>
            <Text fontSize={'25px'} margin={'0px 0px 7px 9px'}>
          {title}:
          </Text>
            <Box maxH="300px" overflowY="auto" >
           <Stack pl={6} mt={1} spacing={1}>
                {list.slice(0, visibleItems).map((brand) => (
                    <Checkbox colorScheme='green' size='sm' value={brand} onChange={onChange} key={brand}>
                        {brand}
                    </Checkbox>
                ))}
            </Stack>
           
          <Center>{visibleItems < list.length && (
                <Button onClick={showMoreItems} mt={4} marginRight={2}  variant='outline' colorScheme='teal' size='sm'>
                    Show More
                </Button>
            )}</Center>  

             {/* {visibleItems > 10 && (
                <Button onClick={showLessItems} mt={4} variant='outline' colorScheme='red' size='sm'>
                    Show Less
                </Button>
            )} */}
             </Box>
            

        </div>
    );
}

export default MUltiCheckBox


