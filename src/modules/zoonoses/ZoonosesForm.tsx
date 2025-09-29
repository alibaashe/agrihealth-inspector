import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function ZoonosesForm() {
  // Header
  const [institution, setInstitution] = useState('');
  const [district, setDistrict] = useState('');
  const [dateOfVisit, setDateOfVisit] = useState(new Date().toISOString().split('T')[0]);
  const [officerName, setOfficerName] = useState('');
  const [contact, setContact] = useState('');

  // Section A
  const [location, setLocation] = useState('');
  const [speciesInvolved, setSpeciesInvolved] = useState([]);
  const [otherSpecies, setOtherSpecies] = useState('');
  const [humanCases, setHumanCases] = useState(0);
  const [animalCases, setAnimalCases] = useState(0);
  const [mortality, setMortality] = useState(false);
  const [mortalityNumber, setMortalityNumber] = useState();
  const [samplesTaken, setSamplesTaken] = useState(false);
  const [sampleType, setSampleType] = useState('');

  // Section C: Actions
  const [actions, setActions] = useState({
    isolation: false,
    publicAlert: false,
    education: false,
    vaccination: false,
    carcassDisposal: false,
    labSamples: false,
    disinfection: false,
    humanReferral: false,
  });

  // Section D
  const [comments, setComments] = useState('');

  const toggleSpecies = (species) => {
    setSpeciesInvolved(prev =>
      prev.includes(species) ? prev.filter(s => s !== species) : [...prev, species]
    );
  };

  const handleActionChange = (action, checked) => {
    setActions(prev => ({ ...prev, [action]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert('Please log in first');
      return;
    }

    const { error } = await supabase.from('zoonoses_reports').insert({
      institution,
      district,
      date_of_visit: dateOfVisit,
      officer_name: officerName,
      contact,
      location,
      species_involved: speciesInvolved,
      other_species: otherSpecies,
      human_cases: humanCases,
      animal_cases: animalCases,
      mortality,
      mortality_number: mortalityNumber,
      samples_taken: samplesTaken,
      sample_type: sampleType,
      actions,
      comments,
      inspector_id: user.id,
    });

    if (error) {
      console.error('Error saving zoonoses report:', error);
      alert('Failed to save zoonotic disease report. Please try again.');
    } else {
      alert('✅ Zoonotic disease report saved successfully!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">ZOONOTIC DISEASE SURVEILLANCE AND RESPONSE FORM</h1>
      <p className="text-center text-sm text-gray-600">Ministry of Public Health / Livestock Authority</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <input
            type="text"
            placeholder="Institution *"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="District/Region *"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            value={dateOfVisit}
            onChange={(e) => setDateOfVisit(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Officer’s Name *"
            value={officerName}
            onChange={(e) => setOfficerName(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Contact *"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>

        {/* SECTION A */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION A: GENERAL INFORMATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Location (village/facility) *"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <div>
              <label className="block mb-1">Species involved *</label>
              <div className="flex flex-wrap gap-2">
                {['Humans', 'Poultry', 'Cattle', 'Goats', 'Sheep', 'Camels'].map((species) => (
                  <label key={species} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={speciesInvolved.includes(species)}
                      onChange={() => toggleSpecies(species)}
                      className="mr-1"
                    />
                    {species}
                  </label>
                ))}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={speciesInvolved.includes('Other')}
                    onChange={() => toggleSpecies('Other')}
                    className="mr-1"
                  />
                  Other:
                  {speciesInvolved.includes('Other') && (
                    <input
                      type="text"
                      value={otherSpecies}
                      onChange={(e) => setOtherSpecies(e.target.value)}
                      className="ml-1 p-1 border rounded w-24"
                    />
                  )}
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <input
                type="number"
                placeholder="Human cases"
                value={humanCases || ''}
                onChange={(e) => setHumanCases(Number(e.target.value))}
                className="p-2 border rounded"
                min="0"
              />
              <input
                type="number"
                placeholder="Animal cases"
                value={animalCases || ''}
                onChange={(e) => setAnimalCases(Number(e.target.value))}
                className="p-2 border rounded"
                min="0"
              />
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={mortality}
                  onChange={(e) => setMortality(e.target.checked)}
                  className="mr-2"
                />
                Mortality observed
              </label>
              {mortality && (
                <input
                  type="number"
                  placeholder="Number"
                  value={mortalityNumber || ''}
                  onChange={(e) => setMortalityNumber(Number(e.target.value))}
                  className="p-1 border rounded w-20"
                  min="1"
                />
              )}
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={samplesTaken}
                  onChange={(e) => setSamplesTaken(e.target.checked)}
                  className="mr-2"
                />
                Samples taken for lab
              </label>
              {samplesTaken && (
                <input
                  type="text"
                  placeholder="Type"
                  value={sampleType}
                  onChange={(e) => setSampleType(e.target.value)}
                  className="p-1 border rounded"
                />
              )}
            </div>
          </div>
        </div>

        {/* SECTION B: DISEASE REFERENCE */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION B: ZOONOTIC DISEASES SUMMARY TABLE</h2>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border p-1">Disease</th>
                  <th className="border p-1">Signs & Symptoms</th>
                  <th className="border p-1">Prevention</th>
                  <th className="border p-1">Treatment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-1 font-medium">Brucellosis</td>
                  <td className="border p-1 text-sm">Abortion in animals, fever, joint pain, sweating in humans</td>
                  <td className="border p-1 text-sm">
                    - Animal vaccination (RB51/S19)<br/>
                    - Avoid raw milk/meat<br/>
                    - Hygiene in birthing areas
                  </td>
                  <td className="border p-1 text-sm">
                    - Doxycycline + Rifampicin (in humans)<br/>
                    - No treatment in animals; cull positives
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-medium">Anthrax</td>
                  <td className="border p-1 text-sm">Sudden death in animals, bleeding from orifices<br/>In humans: skin sores, fever, cough</td>
                  <td className="border p-1 text-sm">
                    - Vaccinate livestock annually<br/>
                    - Avoid contact with dead animals
                  </td>
                  <td className="border p-1 text-sm">
                    - Ciprofloxacin or Penicillin (humans)<br/>
                    - Immediate reporting and quarantine
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-medium">Rabies</td>
                  <td className="border p-1 text-sm">Aggression, biting, drooling in animals<br/>Fever, hydrophobia, confusion in humans</td>
                  <td className="border p-1 text-sm">
                    - Dog vaccination<br/>
                    - Avoid stray animals<br/>
                    - PEP for exposed people
                  </td>
                  <td className="border p-1 text-sm">
                    - No treatment after symptoms appear<br/>
                    - PEP (vaccine + immunoglobulin) if exposed
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-medium">Tuberculosis (Bovine TB)</td>
                  <td className="border p-1 text-sm">Chronic cough, weight loss in cattle<br/>In humans: prolonged cough, fever, night sweats</td>
                  <td className="border p-1 text-sm">
                    - Test and cull infected cattle<br/>
                    - Pasteurize milk
                  </td>
                  <td className="border p-1 text-sm">- Multi-drug antibiotic therapy (DOTS)</td>
                </tr>
                <tr>
                  <td className="border p-1 font-medium">Avian Influenza</td>
                  <td className="border p-1 text-sm">Sudden death, respiratory signs in birds<br/>In humans: fever, cough, pneumonia</td>
                  <td className="border p-1 text-sm">
                    - Biosecurity on farms<br/>
                    - Avoid contact with sick birds
                  </td>
                  <td className="border p-1 text-sm">
                    - Supportive care<br/>
                    - Oseltamivir (in confirmed human cases)
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-medium">Salmonellosis</td>
                  <td className="border p-1 text-sm">Diarrhea, vomiting, fever in humans<br/>Weakness, diarrhea in birds</td>
                  <td className="border p-1 text-sm">
                    - Proper food handling<br/>
                    - Clean water and hygiene
                  </td>
                  <td className="border p-1 text-sm">- Fluids and antibiotics if severe (Ciprofloxacin)</td>
                </tr>
                <tr>
                  <td className="border p-1 font-medium">E. coli (Colibacillosis)</td>
                  <td className="border p-1 text-sm">Diarrhea in young animals<br/>In humans: cramps, bloody diarrhea</td>
                  <td className="border p-1 text-sm">
                    - Hand hygiene<br/>
                    - Safe food/water
                  </td>
                  <td className="border p-1 text-sm">
                    - Hydration therapy<br/>
                    - Antibiotics in severe cases
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-medium">Leptospirosis</td>
                  <td className="border p-1 text-sm">Fever, jaundice, kidney damage in humans<br/>Abortion, reduced milk in animals</td>
                  <td className="border p-1 text-sm">
                    - Avoid urine-contaminated water<br/>
                    - Rodent control
                  </td>
                  <td className="border p-1 text-sm">- Doxycycline or Penicillin (humans)</td>
                </tr>
                <tr>
                  <td className="border p-1 font-medium">Q Fever</td>
                  <td className="border p-1 text-sm">Fever, fatigue, pneumonia in humans<br/>Abortion in goats/sheep</td>
                  <td className="border p-1 text-sm">
                    - Avoid raw milk<br/>
                    - Disinfection after birthing
                  </td>
                  <td className="border p-1 text-sm">- Doxycycline (humans)</td>
                </tr>
                <tr>
                  <td className="border p-1 font-medium">Campylobacteriosis</td>
                  <td className="border p-1 text-sm">Diarrhea, abdominal pain in humans<br/>Often asymptomatic in poultry</td>
                  <td className="border p-1 text-sm">
                    - Proper cooking<br/>
                    - Personal hygiene
                  </td>
                  <td className="border p-1 text-sm">
                    - Fluids<br/>
                    - Erythromycin (if needed)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION C: ACTION TAKEN */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION C: ACTION TAKEN</h2>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-1">Action</th>
                <th className="border p-1">Done</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Isolation of infected animals', key: 'isolation' },
                { label: 'Public health alert given', key: 'publicAlert' },
                { label: 'Community education conducted', key: 'education' },
                { label: 'Animal vaccination done', key: 'vaccination' },
                { label: 'Carcasses safely disposed', key: 'carcassDisposal' },
                { label: 'Lab samples submitted', key: 'labSamples' },
                { label: 'Household disinfection', key: 'disinfection' },
                { label: 'Human cases referred to clinic', key: 'humanReferral' },
              ].map((item) => (
                <tr key={item.key}>
                  <td className="border p-1">{item.label}</td>
                  <td className="border p-1 text-center">
                    <input
                      type="checkbox"
                      checked={actions[item.key]}
                      onChange={(e) => handleActionChange(item.key, e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTION D */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION D: COMMENTS & RECOMMENDATIONS</h2>
          <textarea
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Officer Name"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Signature"
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={dateOfVisit}
              onChange={(e) => setDateOfVisit(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-bold"
        >
          Submit Zoonotic Disease Report
        </button>
      </form>
    </div>
  );
}