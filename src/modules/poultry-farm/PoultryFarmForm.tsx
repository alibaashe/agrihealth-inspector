import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function PoultryFarmForm() {
  // Section A
  const [region, setRegion] = useState('');
  const [dateOfInspection, setDateOfInspection] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [inspectorName, setInspectorName] = useState('');
  const [inspectorId, setInspectorId] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmOwner, setFarmOwner] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [typeOfPoultry, setTypeOfPoultry] = useState<string[]>([]);
  const [otherPoultryType, setOtherPoultryType] = useState('');
  const [numberOfBirds, setNumberOfBirds] = useState(1);
  const [housingType, setHousingType] = useState('');
  const [otherHousing, setOtherHousing] = useState('');
  const [farmLocation, setFarmLocation] = useState('');

  // Section B
  const [penCleanliness, setPenCleanliness] = useState('');
  const [wasteDisposal, setWasteDisposal] = useState('');
  const [wasteRemarks, setWasteRemarks] = useState('');
  const [waterSource, setWaterSource] = useState('');
  const [waterClean, setWaterClean] = useState(true);
  const [feedHygiene, setFeedHygiene] = useState('');
  const [feedRemarks, setFeedRemarks] = useState('');
  const [wildlifePresence, setWildlifePresence] = useState('');
  const [wildlifeRemarks, setWildlifeRemarks] = useState('');
  const [fencing, setFencing] = useState('');

  // Section C
  const [suddenDeaths, setSuddenDeaths] = useState(false);
  const [suddenDeathCount, setSuddenDeathCount] = useState<number | undefined>();
  const [respiratorySigns, setRespiratorySigns] = useState(false);
  const [diarrhea, setDiarrhea] = useState(false);
  const [skinProblems, setSkinProblems] = useState('');
  const [swollenHead, setSwollenHead] = useState(false);
  const [decreasedEggs, setDecreasedEggs] = useState('');
  const [vetTreatment, setVetTreatment] = useState(false);
  const [vetTreatmentDetails, setVetTreatmentDetails] = useState('');
  const [vaccinationRecords, setVaccinationRecords] = useState(false);
  const [biosecuritySigns, setBiosecuritySigns] = useState(false);

  // Section D
  const diseases = [
    { name: 'Avian Influenza', signs: 'Sudden death, cyanosis, swollen head' },
    { name: 'Newcastle Disease', signs: 'Respiratory signs, twisted necks' },
    { name: 'Salmonellosis', signs: 'Diarrhea, weakness, morbidity and mortality in chicks' },
    { name: 'Campylobacter', signs: 'Often asymptomatic, diarrheal risk to humans' },
    { name: 'Colibacillosis (E. coli)', signs: 'Air sacculitis, pericarditis' },
    { name: 'Other', signs: '' },
  ];
  const [diseaseRisks, setDiseaseRisks] = useState(
    diseases.map(d => ({ name: d.name, riskLevel: 'Low' as 'Low' | 'Medium' | 'High', sampleTaken: false }))
  );

  // Section E
  const [handwashing, setHandwashing] = useState<boolean | null>(null);
  const [ppeUsed, setPpeUsed] = useState<boolean | null>(null);
  const [sickWorkers, setSickWorkers] = useState<boolean | null>(null);
  const [training, setTraining] = useState<boolean | null>(null);
  const [workerRemarks, setWorkerRemarks] = useState('');

  // Section F
  const [samples, setSamples] = useState([
    { type: 'Cloacal Swabs', number: undefined as number | undefined, dateSent: '', purpose: '' },
    { type: 'Blood Samples', number: undefined as number | undefined, dateSent: '', purpose: '' },
    { type: 'Droppings', number: undefined as number | undefined, dateSent: '', purpose: '' },
    { type: 'Feed/Water Samples', number: undefined as number | undefined, dateSent: '', purpose: '' },
  ]);

  // Section G
  const [conclusion, setConclusion] = useState('');

  // Section H
  const [comments, setComments] = useState('');

  const togglePoultryType = (type: string) => {
    setTypeOfPoultry(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleDiseaseRiskChange = (index: number, field: 'riskLevel' | 'sampleTaken', value: any) => {
    const newRisks = [...diseaseRisks];
    newRisks[index] = { ...newRisks[index], [field]: value };
    setDiseaseRisks(newRisks);
  };

  const handleSampleChange = (index: number, field: string, value: any) => {
    const newSamples = [...samples];
    newSamples[index] = { ...newSamples[index], [field]: value };
    setSamples(newSamples);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert('Please log in first');
      return;
    }

    const { error } = await supabase.from('poultry_inspections').insert({
      region,
      date_of_inspection: dateOfInspection,
      time,
      inspector_name: inspectorName,
      inspector_id: user.id,
      farm_name: farmName,
      farm_owner: farmOwner,
      phone_number: phoneNumber,
      type_of_poultry: typeOfPoultry,
      other_poultry_type: otherPoultryType,
      number_of_birds: numberOfBirds,
      housing_type: housingType,
      other_housing: otherHousing,
      farm_location: farmLocation,
      pen_cleanliness: penCleanliness,
      waste_disposal: wasteDisposal,
      waste_remarks: wasteRemarks,
      water_source: waterSource,
      water_clean: waterClean,
      feed_hygiene: feedHygiene,
      feed_remarks: feedRemarks,
      wildlife_presence: wildlifePresence,
      wildlife_remarks: wildlifeRemarks,
      fencing,
      sudden_deaths: suddenDeaths,
      sudden_death_count: suddenDeathCount,
      respiratory_signs: respiratorySigns,
      diarrhea,
      skin_problems: skinProblems,
      swollen_head: swollenHead,
      decreased_eggs: decreasedEggs,
      vet_treatment: vetTreatment,
      vet_treatment_details: vetTreatmentDetails,
      vaccination_records: vaccinationRecords,
      biosecurity_signs: biosecuritySigns,
      diseases: diseaseRisks,
      handwashing,
      ppe_used: ppeUsed,
      sick_workers: sickWorkers,
      training,
      worker_remarks: workerRemarks,
      samples,
      conclusion,
      comments,
    });

    if (error) {
      console.error('Error saving inspection:', error);
      alert('Failed to save inspection. Please try again.');
    } else {
      alert('✅ Inspection saved successfully!');
    }
  };

  const captureGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setFarmLocation(`${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`);
        },
        () => alert('GPS access denied')
      );
    } else {
      alert('Geolocation not supported');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">POULTRY FARM INSPECTION FORM FOR ZOONOTIC DISEASES</h1>
      <p className="text-center text-sm text-gray-600">Ministry of Livestock / Public Health Authority</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <input
            type="text"
            placeholder="Region/District *"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            value={dateOfInspection}
            onChange={(e) => setDateOfInspection(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Time *"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Inspector Name *"
            value={inspectorName}
            onChange={(e) => setInspectorName(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Inspector ID/Stamp *"
            value={inspectorId}
            onChange={(e) => setInspectorId(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>

        {/* SECTION A */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION A: FARM IDENTIFICATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Farm Name *"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Farm Owner/Manager *"
              value={farmOwner}
              onChange={(e) => setFarmOwner(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Phone Number *"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Number of Birds *"
              value={numberOfBirds || ''}
              onChange={(e) => setNumberOfBirds(Number(e.target.value))}
              className="p-2 border rounded"
              min="1"
              required
            />
          </div>

          <div className="mt-2">
            <label className="block mb-1">Type of Poultry *</label>
            <div className="flex flex-wrap gap-2">
              {['Broilers', 'Layers', 'Breeders', 'Indigenous'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={typeOfPoultry.includes(type)}
                    onChange={() => togglePoultryType(type)}
                    className="mr-1"
                  />
                  {type}
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={typeOfPoultry.includes('Other')}
                  onChange={() => togglePoultryType('Other')}
                  className="mr-1"
                />
                Other:
                {typeOfPoultry.includes('Other') && (
                  <input
                    type="text"
                    value={otherPoultryType}
                    onChange={(e) => setOtherPoultryType(e.target.value)}
                    className="ml-1 p-1 border rounded w-24"
                  />
                )}
              </label>
            </div>
          </div>

          <div className="mt-2">
            <label className="block mb-1">Housing Type</label>
            <div className="flex flex-wrap gap-2">
              {['Deep litter', 'Battery cage', 'Free-range'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="housing"
                    checked={housingType === type}
                    onChange={() => setHousingType(type)}
                    className="mr-1"
                  />
                  {type}
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="housing"
                  checked={housingType === 'Other'}
                  onChange={() => setHousingType('Other')}
                  className="mr-1"
                />
                Other:
                {housingType === 'Other' && (
                  <input
                    type="text"
                    value={otherHousing}
                    onChange={(e) => setOtherHousing(e.target.value)}
                    className="ml-1 p-1 border rounded w-24"
                  />
                )}
              </label>
            </div>
          </div>

          <div className="mt-2">
            <label className="block mb-1">Farm Location (GPS/Address) *</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                className="flex-1 p-2 border rounded"
                required
              />
              <button
                type="button"
                onClick={captureGPS}
                className="bg-blue-600 text-white px-3 rounded"
              >
                Get GPS
              </button>
            </div>
          </div>
        </div>

        {/* SECTION B */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION B: GENERAL FARM CONDITIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block mb-1">Cleanliness of pens</label>
              {['Clean', 'Dirty', 'Very dirty'].map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name="cleanliness"
                    checked={penCleanliness === opt}
                    onChange={() => setPenCleanliness(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
            </div>
            <div>
              <label className="block mb-1">Waste disposal method</label>
              {['Composting', 'Open dumping', 'Burned', 'Buried'].map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name="waste"
                    checked={wasteDisposal === opt}
                    onChange={() => setWasteDisposal(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
              <input
                type="text"
                placeholder="Remarks"
                value={wasteRemarks}
                onChange={(e) => setWasteRemarks(e.target.value)}
                className="mt-1 p-1 border rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Water source</label>
              {['Borehole', 'Tap', 'River', 'Tanker'].map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name="water"
                    checked={waterSource === opt}
                    onChange={() => setWaterSource(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
              <div className="mt-1">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="waterClean"
                    checked={waterClean === true}
                    onChange={() => setWaterClean(true)}
                    className="mr-1"
                  />
                  Is water clean? Yes
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="waterClean"
                    checked={waterClean === false}
                    onChange={() => setWaterClean(false)}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-1">Feed storage hygiene</label>
              {['Good', 'Fair', 'Poor'].map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name="feed"
                    checked={feedHygiene === opt}
                    onChange={() => setFeedHygiene(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
              <input
                type="text"
                placeholder="Remarks"
                value={feedRemarks}
                onChange={(e) => setFeedRemarks(e.target.value)}
                className="mt-1 p-1 border rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Presence of wild birds or rodents</label>
              {['None', 'Moderate', 'Many'].map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name="wildlife"
                    checked={wildlifePresence === opt}
                    onChange={() => setWildlifePresence(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
              <input
                type="text"
                placeholder="Remarks"
                value={wildlifeRemarks}
                onChange={(e) => setWildlifeRemarks(e.target.value)}
                className="mt-1 p-1 border rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Farm fencing/security</label>
              {['Properly fenced', 'Partially fenced', 'No fence'].map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name="fencing"
                    checked={fencing === opt}
                    onChange={() => setFencing(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION C */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION C: ANIMAL HEALTH STATUS</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={suddenDeaths}
                onChange={(e) => setSuddenDeaths(e.target.checked)}
                className="mr-2"
              />
              Sudden deaths in flock (last 2 weeks)
              {suddenDeaths && (
                <input
                  type="number"
                  placeholder="Number"
                  value={suddenDeathCount || ''}
                  onChange={(e) => setSuddenDeathCount(Number(e.target.value))}
                  className="ml-2 p-1 border rounded w-20"
                  min="1"
                />
              )}
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={respiratorySigns}
                onChange={(e) => setRespiratorySigns(e.target.checked)}
                className="mr-2"
              />
              Respiratory signs (cough, gasping)
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={diarrhea}
                onChange={(e) => setDiarrhea(e.target.checked)}
                className="mr-2"
              />
              Diarrhea (watery/greenish/white)
            </label>
            <div>
              <label className="block mb-1">Skin or feather problems</label>
              {['Normal', 'Ruffled', 'Missing feathers', 'Swelling'].map((opt) => (
                <label key={opt} className="inline-block mr-4">
                  <input
                    type="radio"
                    name="skin"
                    checked={skinProblems === opt}
                    onChange={() => setSkinProblems(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={swollenHead}
                onChange={(e) => setSwollenHead(e.target.checked)}
                className="mr-2"
              />
              Swollen heads or wattles
            </label>
            <div>
              <label className="block mb-1">Decreased egg production</label>
              {['Yes', 'No', 'N/A'].map((opt) => (
                <label key={opt} className="inline-block mr-4">
                  <input
                    type="radio"
                    name="eggs"
                    checked={decreasedEggs === opt}
                    onChange={() => setDecreasedEggs(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={vetTreatment}
                onChange={(e) => setVetTreatment(e.target.checked)}
                className="mr-2"
              />
              Any veterinary treatment used
              {vetTreatment && (
                <input
                  type="text"
                  placeholder="Specify"
                  value={vetTreatmentDetails}
                  onChange={(e) => setVetTreatmentDetails(e.target.value)}
                  className="ml-2 p-1 border rounded"
                />
              )}
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={vaccinationRecords}
                onChange={(e) => setVaccinationRecords(e.target.checked)}
                className="mr-2"
              />
              Vaccination records available
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={biosecuritySigns}
                onChange={(e) => setBiosecuritySigns(e.target.checked)}
                className="mr-2"
              />
              Biosecurity signs at gate
            </label>
          </div>
        </div>

        {/* SECTION D */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION D: ZOONOTIC DISEASE RISK CHECK</h2>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-1">Disease</th>
                <th className="border p-1">Signs in Birds</th>
                <th className="border p-1">Risk Level</th>
                <th className="border p-1">Sample Taken</th>
              </tr>
            </thead>
            <tbody>
              {diseases.map((disease, idx) => (
                <tr key={disease.name}>
                  <td className="border p-1">{disease.name}</td>
                  <td className="border p-1">{disease.signs}</td>
                  <td className="border p-1">
                    {['Low', 'Medium', 'High'].map((level) => (
                      <label key={level} className="inline-block mr-2">
                        <input
                          type="radio"
                          name={`risk-${idx}`}
                          checked={diseaseRisks[idx].riskLevel === level}
                          onChange={() => handleDiseaseRiskChange(idx, 'riskLevel', level)}
                          className="mr-1"
                        />
                        {level}
                      </label>
                    ))}
                  </td>
                  <td className="border p-1 text-center">
                    <input
                      type="checkbox"
                      checked={diseaseRisks[idx].sampleTaken}
                      onChange={(e) => handleDiseaseRiskChange(idx, 'sampleTaken', e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTION E */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION E: WORKER SAFETY & HYGIENE</h2>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-1">Item</th>
                <th className="border p-1">Yes</th>
                <th className="border p-1">No</th>
                <th className="border p-1">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Handwashing stations available', state: handwashing, setState: setHandwashing },
                { label: 'Workers use gloves or boots', state: ppeUsed, setState: setPpeUsed },
                { label: 'Sick workers allowed to handle birds', state: sickWorkers, setState: setSickWorkers },
                { label: 'Training on zoonotic diseases provided', state: training, setState: setTraining },
              ].map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-1">{item.label}</td>
                  <td className="border p-1 text-center">
                    <input
                      type="radio"
                      name={`worker-${idx}`}
                      checked={item.state === true}
                      onChange={() => item.setState(true)}
                    />
                  </td>
                  <td className="border p-1 text-center">
                    <input
                      type="radio"
                      name={`worker-${idx}`}
                      checked={item.state === false}
                      onChange={() => item.setState(false)}
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      value={workerRemarks}
                      onChange={(e) => setWorkerRemarks(e.target.value)}
                      className="w-full p-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTION F */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION F: LABORATORY SAMPLES TAKEN</h2>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-1">Sample Type</th>
                <th className="border p-1">Number</th>
                <th className="border p-1">Date Sent to Lab</th>
                <th className="border p-1">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((sample, idx) => (
                <tr key={idx}>
                  <td className="border p-1">{sample.type}</td>
                  <td className="border p-1">
                    <input
                      type="number"
                      value={sample.number || ''}
                      onChange={(e) => handleSampleChange(idx, 'number', Number(e.target.value))}
                      className="w-full p-1"
                      min="0"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="date"
                      value={sample.dateSent}
                      onChange={(e) => handleSampleChange(idx, 'dateSent', e.target.value)}
                      className="w-full p-1"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      value={sample.purpose}
                      onChange={(e) => handleSampleChange(idx, 'purpose', e.target.value)}
                      className="w-full p-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTION G */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION G: INSPECTION CONCLUSION</h2>
          {[
            'Farm meets hygiene and biosecurity standards',
            'Farm requires improvement (minor issues)',
            'Farm poses significant zoonotic risk',
            'Immediate action recommended (report sent to health authority)',
          ].map((option) => (
            <label key={option} className="block mb-1">
              <input
                type="radio"
                name="conclusion"
                checked={conclusion === option}
                onChange={() => setConclusion(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>

        {/* SECTION H */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION H: COMMENTS & RECOMMENDATIONS</h2>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-bold"
        >
          Submit Inspection Report
        </button>
      </form>
    </div>
  );
}
