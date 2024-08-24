import axios from 'axios';
import { Label, TextInput, Modal, Button } from 'flowbite-react';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AbsensiTamu() {
  const [fullname, setFullname] = useState('');
  const [institute, setInstitute] = useState('');
  const [email_address, setEmailAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveAbsentTamu = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/absen_tamu`, {
        fullname,
        institute,
        email_address,
      });

      toast.success('Guest registered successfully!');
      console.log('Guest registered successfully:', response.data);
    } catch (error) {
      toast.error('Error registering guest.');
      console.error('Error registering guest:', error);
    }
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !institute || !email_address) {
      toast.error('Please fill in all fields.');
      return;
    }
    setIsModalOpen(true); // Show the modal
  };

  return (
    <div>
      <ToastContainer />

      <h2 className='text-2xl font-semibold underline'>Guest Registered</h2>

      <form className='mt-4' onSubmit={handleModalSubmit}>
        <div className='mb-4'>
          <Label htmlFor="fullname" value='Full Name' />
          <TextInput
            id="fullname"
            type='text'
            placeholder='example: Albert Doe'
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        <div className='mb-4'>
          <Label htmlFor="institute" value='Institute' />
          <TextInput
            id="institute"
            type='text'
            placeholder='example: University of Nusa Cendana'
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            required
          />
        </div>

        <div className='mb-4'>
          <Label htmlFor="email_address" value='Email' />
          <TextInput
            id="email_address"
            type='email'
            placeholder='example: user@gmail.com'
            value={email_address}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>

        <hr />

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
          >
            Submit Present
          </button>
        </div>
      </form>

      <Modal show={isModalOpen} size="md" popup={true} onClose={() => setIsModalOpen(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure the information is correct? Please confirm your details.
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={saveAbsentTamu}
              >
                Yes, Submit
              </Button>
              <Button
                color="gray"
                onClick={() => setIsModalOpen(false)}
              >
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AbsensiTamu;
