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
        <div className='flex justify-center px-4'>
            <Card className='max-w-4xl w-full p-1 mt-8 mb-7'>
                <Welcome/>

                {/* bagian ini merupakan button opsi untuk absensi peserta */}
                <p>There are two options for attendance: one for registered participants, and one for guests.</p>

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