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

  useEffect(() => {
    getPeserta();
  }, []);

  const getPeserta = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/peserta`);
      setPeserta(response.data);
    } catch (error) {
      console.error('Failed to fetch participants:', error);
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
    setNotification('*) Make sure your name is correct because it will be used for certificate purposes');
    toast.info('Make sure your name is correct and includes titles, as it will be used for the event certificate.');
  };

  const handleFullNameChange = (e) => {
    if (selectedPeserta) {
      setSelectedPeserta({ ...selectedPeserta, fullname: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (selectedPeserta) {
      try {
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
          <TextInput
            id="search"
            type="search"
            placeholder="Search for a name..."
            className="w-full mt-3"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {searchTerm && (
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
          <Label htmlFor='fullname' value='FullName (Corrected name with title)' className='block text-sm font-medium text-gray-700 mb-3'/>
          <TextInput
            id="fullname"
            className='w-full mt-3'
            value={selectedPeserta ? selectedPeserta.fullname : ''}
            onChange={handleFullNameChange}
            required
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
              Are you sure your full name, including titles, is correct? You can rename your name if something are wrong😁
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={handleSubmit}
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
    </>
  );
}

export default AbsensiPeserta;
