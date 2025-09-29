import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PoultryFarmForm } from './modules/poultry-farm/PoultryFarmForm';
import { ChickenMeatForm } from './modules/chicken-meat/ChickenMeatForm';
import { MilkTestForm } from './modules/milk-test/MilkTestForm';
import { ZoonosesForm } from './modules/zoonoses/ZoonosesForm';
import { DiseaseLibrary } from './modules/disease-library/DiseaseLibrary';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PoultryFarmForm />} />
        <Route path="/poultry/inspect" element={<PoultryFarmForm />} />
        <Route path="/meat/inspect" element={<ChickenMeatForm />} />
        <Route path="/milk/test" element={<MilkTestForm />} />
        <Route path="/zoonoses/report" element={<ZoonosesForm />} />
        <Route path="/diseases" element={<DiseaseLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}