import { useState, useMemo } from 'react';

// Data from SIGNS.docx
const diseaseData = [
  {
    id: 'ai',
    name: 'Avian Influenza (Bird Flu)',
    cause: 'Avian influenza virus (especially H5 and H7 subtypes)',
    zoonotic: true,
    signs: [
      'Sudden death without signs',
      'Swollen head, comb, wattles, and legs',
      'Cyanosis (bluish discoloration) of comb and wattles',
      'Respiratory distress (gasping, coughing)',
      'Greenish diarrhea',
      'Drop in egg production',
      'Nervous signs (twisting of neck, paralysis)',
    ],
    postMortem: [
      'Hemorrhages on shanks, intestines, and proventriculus',
    ],
  },
  {
    id: 'nd',
    name: 'Newcastle Disease',
    cause: 'Newcastle disease virus (Paramyxovirus)',
    zoonotic: false, // mild conjunctivitis only
    signs: [
      'Sudden death in large numbers',
      'Nasal and eye discharge',
      'Coughing, sneezing, and gasping',
      'Greenish diarrhea',
      'Twisted necks, tremors, or paralysis (neurological signs)',
      'Drop in egg production',
    ],
    postMortem: [
      'Hemorrhages in trachea, intestines, and proventriculus',
    ],
    notes: 'Mildly zoonotic (can cause conjunctivitis in humans)',
  },
  {
    id: 'salmonellosis',
    name: 'Salmonellosis',
    cause: 'Salmonella spp. (e.g., S. enteritidis, S. typhimurium)',
    zoonotic: true,
    signs: [
      'Weakness, huddling, ruffled feathers',
      'Diarrhea (watery, white or green)',
      'Poor growth or weight loss',
      'Joint swelling in chronic cases',
      'Yolk sac infection in chicks',
    ],
    postMortem: [
      'Enlarged liver, spleen, and congested intestines',
    ],
  },
  {
    id: 'campy',
    name: 'Campylobacteriosis',
    cause: 'Campylobacter jejuni',
    zoonotic: true,
    signs: [
      'Often asymptomatic in chickens',
      'May cause mild diarrhea or decreased growth',
    ],
    notes: 'Lab testing usually required. Carcass contamination is main human risk.',
  },
  {
    id: 'ecoli',
    name: 'Colibacillosis (E. coli infection)',
    cause: 'Escherichia coli',
    zoonotic: false,
    signs: [
      'Weakness, respiratory signs',
      'Diarrhea in young birds',
      'Swollen abdomen',
    ],
    postMortem: [
      'Pericarditis, perihepatitis (yellow fibrin deposits)',
      'Air sacculitis (cloudy or thickened air sacs)',
      'Omphalitis (navel infection) in chicks',
    ],
    notes: 'Rarely zoonotic, but contamination risk for humans',
  },
  {
    id: 'other',
    name: 'Other Diseases',
    cause: 'Various',
    zoonotic: false,
    signs: [],
    notes: 'Includes Mycoplasmosis, Pullorum Disease, Infectious Bursal Disease (Gumboro)',
  },
];

export function DiseaseLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showZoonoticOnly, setShowZoonoticOnly] = useState(false);

  const filteredDiseases = useMemo(() => {
    return diseaseData.filter(disease => {
      const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.signs.some(sign => sign.toLowerCase().includes(searchTerm.toLowerCase())) ||
        disease.cause.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesZoonotic = !showZoonoticOnly || disease.zoonotic;

      return matchesSearch && matchesZoonotic;
    });
  }, [searchTerm, showZoonoticOnly]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Disease Signs Reference Library</h1>
      <p className="text-gray-600">Based on official Ministry guidelines (SIGNS.docx)</p>

      <div className="border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by disease name or symptom (e.g., diarrhea, swollen head)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="zoonotic-only"
              checked={showZoonoticOnly}
              onChange={(e) => setShowZoonoticOnly(e.target.checked)}
            />
            <label htmlFor="zoonotic-only">Show zoonotic diseases only</label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredDiseases.map((disease) => (
          <div key={disease.id} className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold">{disease.name}</h2>
              {disease.zoonotic && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  Zoonotic
                </span>
              )}
            </div>
            
            <div className="mb-2"><strong>Cause:</strong> {disease.cause}</div>
            
            {disease.signs.length > 0 && (
              <div className="mb-2">
                <strong>Signs:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {disease.signs.map((sign, idx) => (
                    <li key={idx}>{sign}</li>
                  ))}
                </ul>
              </div>
            )}

            {disease.postMortem && (
              <div className="mb-2">
                <strong>Post-Mortem Findings:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {disease.postMortem.map((finding, idx) => (
                    <li key={idx}>{finding}</li>
                  ))}
                </ul>
              </div>
            )}

            {disease.notes && (
              <div><strong>Note:</strong> {disease.notes}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}