// import React from 'react'
import { ButtonGroup, Button } from 'flowbite-react'

function OptionAbsen({ onOptionClick }) {
  return (
    <ButtonGroup>
      <Button color="success" onClick={() => onOptionClick('registered')}>
        Registered
      </Button>
      <Button color="failure" onClick={() => onOptionClick('unregistered')}>
        Others
      </Button>
    </ButtonGroup>
  )
}

export default OptionAbsen
