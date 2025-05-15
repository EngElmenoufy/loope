import { Edit, Trash2 } from 'lucide-react';
function SavedAddresses() {
    const [addresses] = useState([
    { id: 1, name: 'Home', address: 'C 142, Second Floor, Sector 63, Noida, Uttar Pradesh 201301' },
    { id: 2, name: 'Office', address: 'C 142, Second Floor, Sector 63, Noida, Uttar Pradesh 201301' },
    { id: 3, name: 'Education place', address: 'C 142, Second Floor, Sector 63, Noida, Uttar Pradesh 201301' }
  ]);
    return (
         <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="flex items-center mb-6">
            <button onClick={() => setActiveTab('profile')} className="mr-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 className="text-2xl font-bold">My Saved Addresses</h1>
          </div>
          
          <div className="space-y-4">
            {addresses.map(address => (
              <div key={address.id} className="border-b pb-4">
                <h2 className="font-bold mb-1">{address.name}</h2>
                <p className="text-gray-600 mb-2">{address.address}</p>
                <div className="flex gap-4">
                  <button className="text-gray-700">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-gray-700">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
    )
}

export default SavedAddresses;
