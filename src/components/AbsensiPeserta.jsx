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

    if (filtered.length === 0) {
      toast.warn("No participants found with that name. Please check the spelling.");
    }
  };

  const handleSelectPeserta = (peserta) => {
    setSelectedPeserta(peserta);
    setSearchTerm('');  // Clear the search term to hide the list
    setNotification(
      <>
        <span className="text-red-500">*</span> Please ensure that you 
        <strong className="font-bold text-blue-600"> enter your name correctly</strong> for certificate purposes. 
        <strong className="font-bold text-blue-600"> If any titles need to be included</strong> in your certificate, 
        please include them with your name. <strong className="font-bold text-blue-600">If no title is needed</strong>, simply enter your{' '}full name.
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
          toast.success('Presence and name updated successfully!');
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
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Show the modal
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
            disabled={isLoading} // Disable button while loading
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
              Are you sure your name and any titles you have entered are correct? You can make corrections if something is wrong.
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={handleSubmit}
                disabled={isSubmitting} // Disable button while loading
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2055 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2055 0 50.5908C0 22.976 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.976 100 50.5908ZM9.08166 50.5908C9.08166 74.1965 26.3943 91.5091 50 91.5091C73.6057 91.5091 90.9183 74.1965 90.9183 50.5908C90.9183 26.9851 73.6057 9.67241 50 9.67241C26.3943 9.67241 9.08166 26.9851 9.08166 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5534C95.2932 28.8224 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7231 75.2124 7.41289C69.5422 4.10268 63.2754 1.94025 56.6845 1.05126C51.7544 0.36787 46.7852 0.446248 41.8933 1.27968C39.4009 1.69642 37.9372 4.16888 38.5743 6.59426C39.2115 9.01963 41.6874 10.4295 44.1712 10.0208C47.9887 9.35162 51.9277 9.34418 55.7571 9.99946C60.8782 10.8897 65.7869 12.793 70.1443 15.6028C74.5016 18.4127 78.2352 22.0752 81.1136 26.3927C83.4636 29.828 85.1324 33.6028 86.0815 37.5836C86.6876 39.935 89.0409 41.314 91.4885 40.739C93.936 40.164 95.4388 37.6881 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Confirm'
                )}
              </Button>
              <Button color="gray" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AbsensiPeserta;

