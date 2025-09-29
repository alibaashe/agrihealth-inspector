[import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function MilkTestForm() {
  // Header
  const [dateOfCollection, setDateOfCollection] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [sampleCode, setSampleCode] = useState('');
  const [location, setLocation] = useState('');
  const [collectorName, setCollectorName] = useState('');
  const [contact, setContact] = useState('');

  // Section A
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [otherSpecies, setOtherSpecies] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [age, setAge] = useState(0);
  const [healthStatus, setHealthStatus] = useState('');
  const [sickDescription, setSickDescription] = useState('');
  const [recentTreatment, setRecentTreatment] = useState(false);
  const [treatmentDetails, setTreatmentDetails] = useState('');
  const [vaccinationStatus, setVaccinationStatus] = useState('');

  // Section B
  const [milkAppearance, setMilkAppearance] = useState('');
  const [milkOdor, setMilkOdor] = useState('');
  const [odorOther, setOdorOther] = useState('');
  const [consistency, setConsistency] = useState('');
  const [volumeMl, setVolumeMl] = useState(1);
  const [storageCondition, setStorageCondition] = useState('');
  const [timeSinceMilking, setTimeSinceMilking] = useState(0);

  // Section C: Lab Tests
  const [pH, setPH] = useState('');
  const [pHResult, setPHResult] = useState('');
  const [pHInterpretation, setPHInterpretation] = useState('');

  const [specificGravity, setSpecificGravity] = useState('');
  const [sgResult, setSGResult] = useState('');
  const [sgInterpretation, setSGInterpretation] = useState('');

  const [alcoholTestPerformed, setAlcoholTestPerformed] = useState(false);
  const [alcoholResult, setAlcoholResult] = useState('');
  const [alcoholInterpretation, setAlcoholInterpretation] = useState('');

  const [cmtTestPerformed, setCmtTestPerformed] = useState(false);
  const [cmtResult, setCmtResult] = useState('');
  const [cmtInterpretation, setCmtInterpretation] = useState('');

  const [antibioticTest, setAntibioticTest] = useState(false);
  const [antibioticResult, setAntibioticResult] = useState('');
  const [antibioticInterpretation, setAntibioticInterpretation] = useState('');

  const [brucellaTest, setBrucellaTest] = useState(false);
  const [brucellaResult, setBrucellaResult] = useState('');
  const [brucellaInterpretation, setBrucellaInterpretation] = useState('');

  const [ecoliTest, setEcoliTest] = useState(false);
  const [ecoliResult, setEcoliResult] = useState('');
  const [ecoliInterpretation, setEcoliInterpretation] = useState('');

  const [salmonellaResult, setSalmonellaResult] = useState('');
  const [salmonellaInterpretation, setSalmonellaInterpretation] = useState('');

  const [tbc, setTbc] = useState('');
  const [tbcResult, setTbcResult] = useState('');
  const [tbcInterpretation, setTbcInterpretation] = useState('');

  const [scc, setScc] = useState('');
  const [sccResult, setSccResult] = useState('');
  const [sccInterpretation, setSccInterpretation] = useState('');

  // Section D
  const [finalJudgment, setFinalJudgment] = useState('');

  // Section E
  const [comments, setComments] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert('Please log in first');
      return;
    }

    const { error } = await supabase.from('milk_tests').insert({
      date_of_collection: dateOfCollection,
      time,
      sample_code: sampleCode,
      location,
      collector_name: collectorName,
      contact,
      animal_species: animalSpecies,
      other_species: otherSpecies,
      animal_id: animalId,
      age,
      health_status: healthStatus,
      sick_description: sickDescription,
      recent_treatment: recentTreatment,
      treatment_details: treatmentDetails,
      vaccination_status: vaccinationStatus,
      milk_appearance: milkAppearance,
      milk_odor: milkOdor,
      odor_other: odorOther,
      consistency: consistency,
      volume_ml: volumeMl,
      storage_condition: storageCondition,
      time_since_milking: timeSinceMilking,
      ph: pH,
      ph_result: pHResult,
      ph_interpretation: pHInterpretation,
      specific_gravity: specificGravity,
      sg_result: sgResult,
      sg_interpretation: sgInterpretation,
      alcohol_test_performed: alcoholTestPerformed,
      alcohol_result: alcoholResult,
      alcohol_interpretation: alcoholInterpretation,
      cmt_test_performed: cmtTestPerformed,
      cmt_result: cmtResult,
      cmt_interpretation: cmtInterpretation,
      antibiotic_test: antibioticTest,
      antibiotic_result: antibioticResult,
      antibiotic_interpretation: antibioticInterpretation,
      brucella_test: brucellaTest,
      brucella_result: brucellaResult,
      brucella_interpretation: brucellaInterpretation,
      ecoli_test: ecoliTest,
      ecoli_result: ecoliResult,
      ecoli_interpretation: ecoliInterpretation,
      salmonella_result: salmonellaResult,
      salmonella_interpretation: salmonellaInterpretation,
      tbc,
      tbc_result: tbcResult,
      tbc_interpretation: tbcInterpretation,
      scc,
      scc_result: sccResult,
      scc_interpretation: sccInterpretation,
      final_judgment: finalJudgment,
      comments,
      inspector_id: user.id,
    });

    if (error) {
      console.error('Error saving milk test:', error);
      alert('Failed to save milk test. Please try again.');
    } else {
      alert('✅ Milk test saved successfully!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">MILK TEST FORM FOR ZOONOTIC DISEASE DETECTION</h1>
      <p className="text-center text-sm text-gray-600">Ministry of Livestock and Rural Development</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            type="date"
            value={dateOfCollection}
            onChange={(e) => setDateOfCollection(e.target.value)}
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
            placeholder="Sample Code *"
            value={sampleCode}
            onChange={(e) => setSampleCode(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Location/Farm Name *"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border rounded md:col-span-2"
            required
          />
          <input
            type="text"
            placeholder="Collector’s Name *"
            value={collectorName}
            onChange={(e) => setCollectorName(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Phone/Contact *"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>

        {/* SECTION A */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION A: SOURCE INFORMATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block mb-1">Animal Species *</label>
              <div className="flex flex-wrap gap-2">
                {['Cow', 'Camel', 'Goat', 'Sheep'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="species"
                      checked={animalSpecies === type}
                      onChange={() => setAnimalSpecies(type)}
                      className="mr-1"
                    />
                    {type}
                  </label>
                ))}
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="species"
                    checked={animalSpecies === 'Other'}
                    onChange={() => setAnimalSpecies('Other')}
                    className="mr-1"
                  />
                  Other:
                  {animalSpecies === 'Other' && (
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
            <input
              type="text"
              placeholder="Animal ID/Tag *"
              value={animalId}
              onChange={(e) => setAnimalId(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Age of Animal"
              value={age || ''}
              onChange={(e) => setAge(Number(e.target.value))}
              className="p-2 border rounded"
            />
            <div>
              <label className="block mb-1">Health Status *</label>
              <div className="flex items-center">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="health"
                    checked={healthStatus === 'Healthy'}
                    onChange={() => setHealthStatus('Healthy')}
                    className="mr-1"
                  />
                  Healthy
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="health"
                    checked={healthStatus === 'Sick'}
                    onChange={() => setHealthStatus('Sick')}
                    className="mr-1"
                  />
                  Sick:
                  {healthStatus === 'Sick' && (
                    <input
                      type="text"
                      value={sickDescription}
                      onChange={(e) => setSickDescription(e.target.value)}
                      className="ml-1 p-1 border rounded"
                    />
                  )}
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={recentTreatment}
                  onChange={(e) => setRecentTreatment(e.target.checked)}
                  className="mr-2"
                />
                Recent Treatment
                {recentTreatment && (
                  <input
                    type="text"
                    placeholder="Specify"
                    value={treatmentDetails}
                    onChange={(e) => setTreatmentDetails(e.target.value)}
                    className="ml-2 p-1 border rounded"
                  />
                )}
              </label>
            </div>
            <div>
              <label className="block mb-1">Vaccination Status</label>
              {['Up to date', 'Not vaccinated', 'Unknown'].map((type) => (
                <label key={type} className="inline-block mr-4">
                  <input
                    type="radio"
                    name="vaccination"
                    checked={vaccinationStatus === type}
                    onChange={() => setVaccinationStatus(type)}
                    className="mr-1"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION B */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION B: MILK SAMPLE INFORMATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block mb-1">Milk Appearance</label>
              {['Normal', 'Discolored', 'Watery', 'Bloody'].map((opt) => (
                <label key={opt} className="inline-block mr-4">
                  <input
                    type="radio"
                    name="appearance"
                    checked={milkAppearance === opt}
                    onChange={() => setMilkAppearance(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
            </div>
            <div>
              <label className="block mb-1">Odor</label>
              {['Normal', 'Sour', 'Rotten'].map((opt) => (
                <label key={opt} className="inline-block mr-4">
                  <input
                    type="radio"
                    name="odor"
                    checked={milkOdor === opt}
                    onChange={() => setMilkOdor(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="odor"
                  checked={milkOdor === 'Other'}
                  onChange={() => setMilkOdor('Other')}
                  className="mr-1"
                />
                Other:
                {milkOdor === 'Other' && (
                  <input
                    type="text"
                    value={odorOther}
                    onChange={(e) => setOdorOther(e.target.value)}
                    className="ml-1 p-1 border rounded w-24"
                  />
                )}
              </label>
            </div>
            <div>
              <label className="block mb-1">Consistency</label>
              {['Normal', 'Clotted', 'Flaky', 'Watery'].map((opt) => (
                <label key={opt} className="inline-block mr-4">
                  <input
                    type="radio"
                    name="consistency"
                    checked={consistency === opt}
                    onChange={() => setConsistency(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
            </div>
            <input
              type="number"
              placeholder="Volume Collected (ml) *"
              value={volumeMl || ''}
              onChange={(e) => setVolumeMl(Number(e.target.value))}
              className="p-2 border rounded"
              min="1"
              required
            />
            <div>
              <label className="block mb-1">Storage Condition</label>
              {['Chilled', 'Not chilled'].map((opt) => (
                <label key={opt} className="inline-block mr-4">
                  <input
                    type="radio"
                    name="storage"
                    checked={storageCondition === opt}
                    onChange={() => setStorageCondition(opt)}
                    className="mr-1"
                  />
                  {opt}
                </label>
              ))}
            </div>
            <input
              type="number"
              placeholder="Time Since Milking (hrs)"
              value={timeSinceMilking || ''}
              onChange={(e) => setTimeSinceMilking(Number(e.target.value))}
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* SECTION C: LABORATORY TESTS */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION C: LABORATORY TESTS</h2>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-1">Test</th>
                <th className="border p-1">Method</th>
                <th className="border p-1">Result</th>
                <th className="border p-1">Normal Range</th>
                <th className="border p-1">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-1">pH</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={pH}
                    onChange={(e) => setPH(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={pHResult}
                    onChange={(e) => setPHResult(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
                <td className="border p-1">6.4–6.8</td>
                <td className="border p-1">
                  <label className="inline-block mr-2">
                    <input
                      type="radio"
                      name="ph-interp"
                      checked={pHInterpretation === 'Normal'}
                      onChange={() => setPHInterpretation('Normal')}
                      className="mr-1"
                    />
                    Normal
                  </label>
                  <label className="inline-block">
                    <input
                      type="radio"
                      name="ph-interp"
                      checked={pHInterpretation === 'Abnormal'}
                      onChange={() => setPHInterpretation('Abnormal')}
                      className="mr-1"
                    />
                    Abnormal
                  </label>
                </td>
              </tr>
              <tr>
                <td className="border p-1">Specific Gravity</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={specificGravity}
                    onChange={(e) => setSpecificGravity(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={sgResult}
                    onChange={(e) => setSGResult(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
                <td className="border p-1">1.027–1.035</td>
                <td className="border p-1">
                  <label className="inline-block mr-2">
                    <input
                      type="radio"
                      name="sg-interp"
                      checked={sgInterpretation === 'Normal'}
                      onChange={() => setSGInterpretation('Normal')}
                      className="mr-1"
                    />
                    Normal
                  </label>
                  <label className="inline-block">
                    <input
                      type="radio"
                      name="sg-interp"
                      checked={sgInterpretation === 'Abnormal'}
                      onChange={() => setSGInterpretation('Abnormal')}
                      className="mr-1"
                    />
                    Abnormal
                  </label>
                </td>
              </tr>
              <tr>
                <td className="border p-1">Alcohol/Clot Test</td>
                <td className="border p-1 text-center">
                  <input
                    type="checkbox"
                    checked={alcoholTestPerformed}
                    onChange={(e) => setAlcoholTestPerformed(e.target.checked)}
                  />
                </td>
                <td className="border p-1">
                  {alcoholTestPerformed && (
                    <>
                      <label className="inline-block mr-2">
                        <input
                          type="radio"
                          name="alcohol-result"
                          checked={alcoholResult === 'Positive'}
                          onChange={() => setAlcoholResult('Positive')}
                          className="mr-1"
                        />
                        Positive
                      </label>
                      <label className="inline-block">
                        <input
                          type="radio"
                          name="alcohol-result"
                          checked={alcoholResult === 'Negative'}
                          onChange={() => setAlcoholResult('Negative')}
                          className="mr-1"
                        />
                        Negative
                      </label>
                    </>
                  )}
                </td>
                <td className="border p-1">-</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={alcoholInterpretation}
                    onChange={(e) => setAlcoholInterpretation(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
              </tr>
              <tr>
                <td className="border p-1">Mastitis Test (CMT)</td>
                <td className="border p-1 text-center">
                  <input
                    type="checkbox"
                    checked={cmtTestPerformed}
                    onChange={(e) => setCmtTestPerformed(e.target.checked)}
                  />
                </td>
                <td className="border p-1">
                  {cmtTestPerformed && (
                    <>
                      <label className="inline-block mr-2">
                        <input
                          type="radio"
                          name="cmt-result"
                          checked={cmtResult === 'Positive'}
                          onChange={() => setCmtResult('Positive')}
                          className="mr-1"
                        />
                        Positive
                      </label>
                      <label className="inline-block">
                        <input
                          type="radio"
                          name="cmt-result"
                          checked={cmtResult === 'Negative'}
                          onChange={() => setCmtResult('Negative')}
                          className="mr-1"
                        />
                        Negative
                      </label>
                    </>
                  )}
                </td>
                <td className="border p-1">-</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={cmtInterpretation}
                    onChange={(e) => setCmtInterpretation(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
              </tr>
              <tr>
                <td className="border p-1">Antibiotic Residue</td>
                <td className="border p-1 text-center">
                  <input
                    type="checkbox"
                    checked={antibioticTest}
                    onChange={(e) => setAntibioticTest(e.target.checked)}
                  />
                </td>
                <td className="border p-1">
                  {antibioticTest && (
                    <>
                      <label className="inline-block mr-2">
                        <input
                          type="radio"
                          name="abx-result"
                          checked={antibioticResult === 'Detected'}
                          onChange={() => setAntibioticResult('Detected')}
                          className="mr-1"
                        />
                        Detected
                      </label>
                      <label className="inline-block">
                        <input
                          type="radio"
                          name="abx-result"
                          checked={antibioticResult === 'Not Detected'}
                          onChange={() => setAntibioticResult('Not Detected')}
                          className="mr-1"
                        />
                        Not Detected
                      </label>
                    </>
                  )}
                </td>
                <td className="border p-1">-</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={antibioticInterpretation}
                    onChange={(e) => setAntibioticInterpretation(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
              </tr>
              <tr>
                <td className="border p-1">Brucella (Milk Ring Test)</td>
                <td className="border p-1 text-center">
                  <input
                    type="checkbox"
                    checked={brucellaTest}
                    onChange={(e) => setBrucellaTest(e.target.checked)}
                  />
                </td>
                <td className="border p-1">
                  {brucellaTest && (
                    <>
                      <label className="inline-block mr-2">
                        <input
                          type="radio"
                          name="bruc-result"
                          checked={brucellaResult === 'Positive'}
                          onChange={() => setBrucellaResult('Positive')}
                          className="mr-1"
                        />
                        Positive
                      </label>
                      <label className="inline-block">
                        <input
                          type="radio"
                          name="bruc-result"
                          checked={brucellaResult === 'Negative'}
                          onChange={() => setBrucellaResult('Negative')}
                          className="mr-1"
                        />
                        Negative
                      </label>
                    </>
                  )}
                </td>
                <td className="border p-1">-</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={brucellaInterpretation}
                    onChange={(e) => setBrucellaInterpretation(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
              </tr>
              <tr>
                <td className="border p-1">E. coli</td>
                <td className="border p-1 text-center">
                  <input
                    type="checkbox"
                    checked={ecoliTest}
                    onChange={(e) => setEcoliTest(e.target.checked)}
                  />
                </td>
                <td className="border p-1">
                  {ecoliTest && (
                    <>
                      <label className="inline-block mr-2">
                        <input
                          type="radio"
                          name="ecoli-result"
                          checked={ecoliResult === 'Detected'}
                          onChange={() => setEcoliResult('Detected')}
                          className="mr-1"
                        />
                        Detected
                      </label>
                      <label className="inline-block">
                        <input
                          type="radio"
                          name="ecoli-result"
                          checked={ecoliResult === 'Not Detected'}
                          onChange={() => setEcoliResult('Not Detected')}
                          className="mr-1"
                        />
                        Not Detected
                      </label>
                    </>
                  )}
                </td>
                <td className="border p-1">Absent</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={ecoliInterpretation}
                    onChange={(e) => setEcoliInterpretation(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
              </tr>
              <tr>
                <td className="border p-1">Salmonella spp.</td>
                <td className="border p-1">-</td>
                <td className="border p-1">
                  <label className="inline-block mr-2">
                    <input
                      type="radio"
                      name="sal-result"
                      checked={salmonellaResult === 'Detected'}
                      onChange={() => setSalmonellaResult('Detected')}
                      className="mr-1"
                    />
                    Detected
                  </label>
                  <label className="inline-block">
                    <input
                      type="radio"
                      name="sal-result"
                      checked={salmonellaResult === 'Not Detected'}
                      onChange={() => setSalmonellaResult('Not Detected')}
                      className="mr-1"
                    />
                    Not Detected
                  </label>
                </td>
                <td className="border p-1">Absent</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={salmonellaInterpretation}
                    onChange={(e) => setSalmonellaInterpretation(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
              </tr>
              <tr>
                <td className="border p-1">Total Bacterial Count (CFU/ml)</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={tbc}
                    onChange={(e) => setTbc(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={tbcResult}
                    onChange={(e) => setTbcResult(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
                <td className="border p-1"><100,000 CFU/ml</td>
                <td className="border p-1">
                  <label className="inline-block mr-2">
                    <input
                      type="radio"
                      name="tbc-interp"
                      checked={tbcInterpretation === 'Normal'}
                      onChange={() => setTbcInterpretation('Normal')}
                      className="mr-1"
                    />
                    Normal
                  </label>
                  <label className="inline-block">
                    <input
                      type="radio"
                      name="tbc-interp"
                      checked={tbcInterpretation === 'High'}
                      onChange={() => setTbcInterpretation('High')}
                      className="mr-1"
                    />
                    High
                  </label>
                </td>
              </tr>
              <tr>
                <td className="border p-1">Somatic Cell Count (SCC)</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={scc}
                    onChange={(e) => setScc(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={sccResult}
                    onChange={(e) => setSccResult(e.target.value)}
                    className="w-full p-1"
                  />
                </td>
                <td className="border p-1"><400,000/ml</td>
                <td className="border p-1">
                  <label className="inline-block mr-2">
                    <input
                      type="radio"
                      name="scc-interp"
                      checked={sccInterpretation === 'Normal'}
                      onChange={() => setSccInterpretation('Normal')}
                      className="mr-1"
                    />
                    Normal
                  </label>
                  <label className="inline-block">
                    <input
                      type="radio"
                      name="scc-interp"
                      checked={sccInterpretation === 'High'}
                      onChange={() => setSccInterpretation('High')}
                      className="mr-1"
                    />
                    High
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION D: FINAL JUDGEMENT */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION D: FINAL JUDGEMENT</h2>
          {[
            'Milk safe for human consumption',
            'Milk requires pasteurization before use',
            'Milk unfit for human consumption',
            'Sample sent for further testing',
            'Follow-up on animal health required',
          ].map((option) => (
            <label key={option} className="block mb-1">
              <input
                type="radio"
                name="judgment"
                checked={finalJudgment === option}
                onChange={() => setFinalJudgment(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>

        {/* SECTION E */}
        <div className="border p-4">
          <h2 className="font-bold mb-2">SECTION E: COMMENTS</h2>
          <textarea
            placeholder="Remarks by Inspector/Laboratory Technician"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Inspector/Lab Officer Name"
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Signature"
              className="p-2 border rounded"
            />
            <input
              type="date"
              className="p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-bold"
        >
          Submit Milk Test Report
        </button>
      </form>
    </div>
  );
}]
