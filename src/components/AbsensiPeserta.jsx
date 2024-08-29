import axios from 'axios';
import { Label, TextInput, Modal, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AbsensiPeserta() {
  const [pesertas, setPeserta] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeserta, setSelectedPeserta] = useState(null);
  const [notification, setNotification] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submission
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching data
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for success modal
  const [notificationShown, setNotificationShown] = useState(false); // State for notification display

  useEffect(() => {
    getPeserta();
  }, []);

  const getPeserta = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/peserta`);
      setPeserta(response.data);
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) return;

    const filtered = pesertas.filter(peserta =>
      peserta.fullname.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (filtered.length === 0 && !notificationShown) {
      toast.warn("No participants found with that name. Please check the spelling.");
      setNotificationShown(true); // Mark notification as shown
    } else if (filtered.length > 0) {
      setNotificationShown(false); // Reset notification state if participants are found
    }
  };

  const handleSelectPeserta = (peserta) => {
    setSelectedPeserta(peserta);
    setSearchTerm('');  // Clear the search term to hide the list
    setNotification(
      <>
        <span className="text-red-950">*</span> Please ensure that you 
        <strong className="font-bold text-blue-900"> enter your name correctly</strong> for certificate purposes. 
        <strong className="font-bold text-blue-900"> If any titles need to be included</strong> in your certificate, 
        please include them with your name. <strong className="font-bold text-blue-900">If no title is needed</strong>, simply enter your{' '}full name.
      </>
    );
    
    toast.info('Make sure your name and any titles needed for the certificate are correct.');
  };

  const handleFullNameChange = (e) => {
    if (selectedPeserta) {
      setSelectedPeserta({ ...selectedPeserta, fullname: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (selectedPeserta) {
      try {
        setIsSubmitting(true); // Start loading
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/absen_peserta`, {
          participantId: selectedPeserta._id,
          fullname: selectedPeserta.fullname,
        });

        if (response.status === 200) {
          setNotification('Presence and name updated successfully!');
          setIsSuccessModalOpen(true); // Open the success modal
          setSelectedPeserta(null); // Clear the selectedPeserta to reset the form
        }
      } catch (error) {
        console.error('Failed to submit presence:', error);
        setNotification('Failed to update presence. Please try again.');
        toast.error('Failed to update presence. Please try again.');
      } finally {
        setIsSubmitting(false); // Stop loading
      }
    } else {
      setNotification('Please select a participant.');
      toast.error('Please select a participant.');
    }
    setIsModalOpen(false); // Close the confirmation modal after submission
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Show the confirmation modal
  };

  const filteredPesertas = pesertas.filter(peserta =>
    peserta.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <form className='mt-4' onSubmit={handleModalSubmit}>
        <div className='mb-4 relative'>
          <Label htmlFor="search" value="Search Name" />
          <div className="flex items-center">
            <TextInput
              id="search"
              type="search"
              placeholder={isLoading ? "Loading participants..." : "Search for a name..."}
              className="w-full mt-3"
              value={searchTerm}
              onChange={handleSearchChange}
              disabled={isLoading} // Disable input while loading
            />
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 ml-2 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            )}
          </div>

          {searchTerm && !isLoading && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-48 overflow-y-auto">
              {filteredPesertas.map((peserta) => (
                <li
                  key={peserta._id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectPeserta(peserta)}
                >
                  {peserta.fullname}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='mb-4'>
          <Label htmlFor='fullname' value='Full Name' className='block text-sm font-medium text-gray-700 mb-3'/>
          <TextInput
            id="fullname"
            className='w-full mt-3'
            value={selectedPeserta ? selectedPeserta.fullname : ''}
            onChange={handleFullNameChange}
            required
            disabled={isLoading} // Disable input while loading
          />
          {selectedPeserta && (
            <p className="text-sm text-red-600 mt-2">{notification}</p>
          )}
        </div>

        <hr />

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            disabled={isSubmitting} // Disable the button while submitting
          >
            {isSubmitting ? 'Submitting...' : 'Submit Presence'}
          </button>
        </div>
      </form>

      <Modal
        show={isModalOpen}
        size="md"
        popup={true}
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to submit this presence?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleSubmit}
                disabled={isSubmitting} // Disable the button while submitting
              >
                {isSubmitting ? 'Submitting...' : 'Yes, submit it'}
              </Button>
              <Button
                color="gray"
                onClick={() => setIsModalOpen(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal
        show={isSuccessModalOpen}
        size="md"
        popup={true}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Presence and name updated successfully!
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => setIsSuccessModalOpen(false)}
              >
                OK
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AbsensiPeserta;
