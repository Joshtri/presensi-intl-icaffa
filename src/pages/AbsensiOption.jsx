// import React from 'react'
import { Card, TextInput } from 'flowbite-react'
import Layout from './Layout'
import Welcome from '../components/Welcome'
import { Label, Select } from 'flowbite-react'

function AbsensiOption() {
  return (
    <Layout>
        <div className='flex justify-center px-4'>
            <Card className='max-w-4xl w-full p-1 mt-8 mb-7'>
                <Welcome/>

                {/* bagian ini merupakan button opsi untuk absensi peserta */}
                <h6>Please fill in the following form.</h6>

              {/* Form input fields */}
              <form className='mt-4'>
              <div className='mb-4'>
                <Label htmlFor="search" value="Search Name" className="" />
                <TextInput
                  id="search"
                  type="search"
                  placeholder="Search for a name..."
                  className="w-4/4 mt-3"
                />
              </div>

                <div className='mb-4'>
                <Label htmlFor='fullname' value='FullName' className='block text-sm font-medium text-gray-700 mb-3'/>
                  <Select className='bg-green-500 border border-gray-300 text-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 block w-4/4 '>
                    <option>-</option>
                    <option>Alex Higgins</option>

                  </Select>

                </div>

                <hr></hr>
                <div className="flex justify-center">
                  <button type="button" className="text-white bg-gradient-to-br from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5   
                text-center me-2 mb-2 mt-2">Submit Present</button>
                </div>

              </form>
            </Card>
        </div>
    </Layout>
  )
}

export default AbsensiOption