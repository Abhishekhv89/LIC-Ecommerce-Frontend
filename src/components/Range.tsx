import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import React from 'react'

interface Props{
    range:number[]
    onChangeRange:(val:number[])=>void;
}

function Range({range,onChangeRange}:Props) {
  return (
    <RangeSlider
        aria-label={['min', 'max']}
        min={0}
        max={5000}
        defaultValue={range}
        onChangeEnd={(val) => onChangeRange(val)}
        // marginBottom={6}
        width={'152px'}
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
