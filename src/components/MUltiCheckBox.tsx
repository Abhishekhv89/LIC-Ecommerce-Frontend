import React, { useState } from 'react'
import { Box, Button, Center, Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react'
// import { Stack } from 'react-bootstrap';
import "../CSS/style.css"
import{Props} from '../interfaces/multiCheckInterface'


function MUltiCheckBox({onChange,list,title , selectedItems,onClear}:Props) {
    
    const [visibleItems, setVisibleItems] = useState(10);

    const showMoreItems = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    };
 



    return (
        // <div className='brandsContainer'>
        //     <Text fontSize={'25px'} margin={'0px 0px 7px 9px'}>
        //   {title}:
        //   </Text>
        //     <Box maxH="300px" overflowY="auto" >
        //    <Stack pl={6} mt={1} spacing={1}>
        //         {list.slice(0, visibleItems).map((brand) => (
        //             <Checkbox colorScheme='green' size='sm' value={brand} onChange={onChange} checked={selectedItems.includes(brand)} key={brand}>
        //                 {brand}
        //             </Checkbox>
        //         ))}
        //     </Stack>
           
        //   <Center>{visibleItems < list.length && (
        //         <Button onClick={showMoreItems} mt={4} marginRight={2}  variant='outline' colorScheme='teal' size='sm'>
        //             Show More
        //         </Button>
        //     )}</Center>  

        //      {/* {visibleItems > 10 && (
        //         <Button onClick={showLessItems} mt={4} variant='outline' colorScheme='red' size='sm'>
        //             Show Less
        //         </Button>
        //     )} */}
        //      </Box>
            

        // </div>



 <div className='brandsContainer'>
           <div className="checkboxHeader">
            <Text fontSize={'25px'} margin={'0px 0px 7px 9px'}>
          {title}:
          </Text>
          <Button onClick={onClear} mt={2} marginRight={2}   colorScheme='teal' size='sm'>clear ALL</Button></div> 
            <Box maxH="330px" overflowY="auto" >
           <Stack pl={6} mt={1} spacing={1}>
       
       {list.slice(0, visibleItems).map((item) => (
        <div key={item}>
          <label>
            <input 
              type="checkbox"
              value={item}
              checked={selectedItems.includes(item)}
              onChange={onChange}
            />
            {item}
          </label>
        </div>
      ))}
             </Stack>
           
          <Center>{visibleItems < list.length && (
                <Button onClick={showMoreItems} mt={4} marginRight={2}  variant='outline' colorScheme='teal' size='sm'>
                    Show More
                </Button>
            )}</Center>  

            
             </Box> 
            

     </div> 




    //     <div>
    //   <h3>{title}</h3>
    //    <Box maxH="300px" overflowY="auto" >
    //   {list.map((brand) => (
    //     <div key={brand}>
    //       <label>
    //         <input
    //           type="checkbox"
    //           value={brand}
    //           checked={selectedItems.includes(brand)}
    //           onChange={onChange}
    //         />
    //         {brand}
    //       </label>
    //     </div>
        
    //   ))}
    // </div>
    );
}

export default MUltiCheckBox


