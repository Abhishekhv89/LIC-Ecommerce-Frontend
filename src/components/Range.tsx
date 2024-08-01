import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import React from 'react'
import {Props}from '../interfaces/RangeInterface'

function Range({range,onChangeRange}:Props) {
  // console.log(range);
  return (
    <RangeSlider
        aria-label={['min', 'max']}
        min={0}
        max={5000}
        
        defaultValue={range}
        onChange={(val) => onChangeRange(val)}
        // marginBottom={6}
        width={'152px'}
        margin={'0px 5px'}
    >
      <RangeSliderTrack >
        <RangeSliderFilledTrack bg='tomato' />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={5} index={0} />
      <RangeSliderThumb boxSize={5} index={1} />
    </RangeSlider>
    

  )
}

export default Range
