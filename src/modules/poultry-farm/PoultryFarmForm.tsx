import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function PoultryFarmForm() {
  const [farmName, setFarmName] = useState('');
  const [inspectorName, setInspectorName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert('Please log in first');
      return;
    }

    const { error } = await supabase.from('poultry_inspections').insert({
      farm_name: farmName,
      inspector_name: inspectorName,
      inspector_id: user.id,
      region: 'Nairobi',
      date_of_inspection: new Date().toISOString().split('T')[0],
    });

    if (error) console.error('Error:', error);
    else alert('Inspection saved!');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Poultry Farm Inspection Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Farm Name"
          value={farmName}
          onChange={(e) => setFarmName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Inspector Name"
          value={inspectorName}
          onChange={(e) => setInspectorName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Inspection
        </button>
      </form>
    </div>
  );
}
