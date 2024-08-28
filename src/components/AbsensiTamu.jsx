import axios from 'axios';
import { Label, TextInput, Modal, Button, Radio } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AbsensiTamu() {
  const [fullname, setFullname] = useState('');
  const [institute, setInstitute] = useState('');
  const [email_address, setEmailAddress] = useState('');
  const [registeringAs, setRegisteringAs] = useState('participant'); // Default to 'participant'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fullname) {
      toast.info('Make sure your name and any titles needed for the certificate are correct.', { autoClose: 5000 });
    }
  }, [fullname]);

  const saveAbsentTamu = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/absen_tamu`, {
        fullname,
        institute,
        email_address,
        registering_as: registeringAs, // Include the registering_as field
      });

      toast.success('Guest registered successfully!');
      console.log('Guest registered successfully:', response.data);
    } catch (error) {
      toast.error('Error registering guest.');
      console.error('Error registering guest:', error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !institute || !email_address) {
      toast.error('Please fill in all fields.');
      return;
    }
    setIsModalOpen(true);
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
          {fullname && (
            <p className="text-red-500 mt-2">
              <span className="text-red-500">*</span> Please ensure that you 
              <strong className="font-bold text-blue-600"> enter your name correctly</strong> for certificate purposes. 
              <strong className="font-bold text-blue-600"> If any titles need to be included</strong> in your certificate, 
              please include them with your name. <strong className="font-bold text-blue-600">If no title is needed</strong>, 
              simply enter your{' '}full name.
            </p>
          )}
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

        <div className='mb-4'>
          <Label value='Registering As' />
          <div className="flex items-center mt-2">
            <Radio
              id="presenter"
              name="registering_as"
              value="presenter"
              checked={registeringAs === 'presenter'}
              onChange={(e) => setRegisteringAs(e.target.value)}
            />
            <Label htmlFor="presenter" className="ml-2">
              Presenter
            </Label>
          </div>
          <div className="flex items-center mt-2">
            <Radio
              id="participant"
              name="registering_as"
              value="participant"
              checked={registeringAs === 'participant'}
              onChange={(e) => setRegisteringAs(e.target.value)}
            />
            <Label htmlFor="participant" className="ml-2">
              Participant
            </Label>
          </div>
        </div>

        <hr />

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
          >
            Submit Presence
          </button>
        </div>
      </form>

      <Modal show={isModalOpen} size="md" popup={true} onClose={() => setIsModalOpen(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure your name and any titles you have entered are correct? You can make corrections if something is wrong
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={saveAbsentTamu}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Yes, Submit'}
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
