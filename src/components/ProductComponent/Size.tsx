import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

interface Props {
  size: string;
  disabled: boolean;
}

function Size({ size, disabled }: Props) {
  const [border, setBorder] = useState('2px solid gray');

  const handleClick = () => {
    setBorder('3px solid #2adb94');
    console.log('clicked');
  };

  return (
    <div>
      <Button
        colorScheme="gray"
        border={border}
        width="90px"
        isDisabled={disabled}
        onClick={handleClick}
        className="button"
      >
        {size}
      </Button>
    </div>
  );
}

export default Size;
