import React from 'react'

import { Button, Card, CardBody, CardFooter, Center, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { relative } from 'path'
import "../CSS/style.css"
import { LiaRupeeSignSolid } from "react-icons/lia";
import {Props} from '../interfaces/itemcardInterface'




function ItemCard({item}:Props) {
  return ( 
    <>
    <Card
      direction={{ lg: 'row', sm: 'column' }}
      overflow='hidden'
      variant='outline'
      height={'400px'}
      maxW={{ lg: '380px', sm: '260px' }}
      maxH={{ lg: '400px', sm: '450px'}}
      borderRadius={'10px'}
      padding={'0px'}
      style={{ opacity: item.quantity > 0 ? 1 : 0.5 , zIndex:2,position:'relative'}} // Adjust opacity based on item quantity
       
    >
      <Image
        objectFit='cover'
        maxW={{ lg: '180px', sm: '100%' }}
        maxH={{ lg: '100%', sm: '100%'}}
        src={item.img}
        alt={item.name}
      />
      <Stack>
        <CardBody p={{ lg: '12px 12px 16px 12px', sm: '0px 0px 0px 12px' }} margin={0}>
          <Heading size='lg'>{item.name}</Heading>
          <Text fontSize={{ lg: '18px', sm: '18px' }} fontWeight={'medium'}>
            Lorem ipsum dolor sit amet consectetur.
          </Text>
          <Text fontSize={{ lg: '18px', sm: '14px' }}>
            <b>Brand:</b> {item.brand}
          </Text>
          <Text fontSize={{ lg: '18px', sm: '14px' }} className='d-flex'>
          <b>Price:</b> <LiaRupeeSignSolid className='mt-1'/> {item.price}
          </Text>
          {item.quantity === 0 && (
            <Text
              fontSize={{ lg: '23px', sm: '14px' }}
              className='outOfStock'
              fontWeight={'medium'}
            >
              Out of Stock
            </Text>
          )}
        </CardBody>
        <CardFooter justifyContent='center' padding={{ lg: '20px', sm: 0 }}>
          <Button variant='solid' colorScheme='blue'>
            View
          </Button>
        </CardFooter>
      </Stack>
    </Card>
    
    </>
   

    

  )
}

export default ItemCard
