// import React from 'react'
import { Card, TextInput } from 'flowbite-react'
import Layout from './Layout'
import Welcome from '../components/Welcome'
import { Label, Select } from 'flowbite-react'
import AbsensiPeserta from '../components/AbsensiPeserta'
import OptionAbsen from '../components/OptionAbsen'
import { useState } from 'react'
import AbsensiTamu from '../components/AbsensiTamu'

function AbsensiOption() {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }
  return (
    <Layout>
        <div className='flex justify-center px-0'>
            <Card className='max-w-4xl w-full p-1 mt-8 mb-7'>
                <Welcome/>

                <div className="p-6 bg-white shadow-md rounded-md">
                  <p className="mb-4 text-lg font-semibold">As you begin the registration process, please choose from the following options:</p>
                  
                  <ul className="mb-4 list-decimal list-inside space-y-2">
                    <li>
                      <span className="font-medium">Registered:</span> Select this option if you have already registered for the conference.
                    </li>
                    <li>
                      <span className="font-medium">Others:</span> Select this option if you have been invited as a guest or if you have not registered before.
                    </li>
                  </ul>
  
                  <p className="mb-4">Please select the appropriate option and complete the form accordingly. Should you have any questions during the registration process, do not hesitate to reach out to the committee.</p>
                  
                  <p className="font-semibold">Thank you for being part of this conference, and we hope you enjoy the experience.</p>

                </div>


                <h6>Please fill in the following form.</h6>
                {/* Button group for attendance options */}
                {/* <OptionAbsen/> */}

                <OptionAbsen onOptionClick={handleOptionClick} />

                {/* Conditionally render the component based on selected option */}
                {selectedOption === 'registered' && <AbsensiPeserta />}
                {selectedOption === 'unregistered' && <AbsensiTamu />} 

            </Card>
        </div>
    </Layout>
  )
}

export default AbsensiOption