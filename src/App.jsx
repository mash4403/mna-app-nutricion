
import React, { useState } from 'react';
import jsPDF from 'jspdf';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [answers, setAnswers] = useState(Array(6).fill('0'));
  const [result, setResult] = useState(null);

  const handleAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const calculate = () => {
    const score = answers.reduce((acc, val) => acc + parseInt(val), 0);
    const imc = weight && height ? (weight / ((height / 100) ** 2)).toFixed(1) : null;
    let classification = '';
    if (score >= 12) classification = 'Estado nutricional normal';
    else if (score >= 8) classification = 'Riesgo de malnutrición';
    else classification = 'Malnutrición';

    setResult({ score, imc, classification });
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Evaluación MNA - Mini Nutritional Assessment`, 10, 10);
    doc.text(`Nombre: ${name}`, 10, 20);
    doc.text(`Edad: ${age}`, 10, 30);
    doc.text(`Peso: ${weight} kg`, 10, 40);
    doc.text(`Talla: ${height} cm`, 10, 50);
    doc.text(`IMC: ${result?.imc}`, 10, 60);
    doc.text(`Score total: ${result?.score}`, 10, 70);
    doc.text(`Clasificación: ${result?.classification}`, 10, 80);
    doc.save("MNA_Result.pdf");
  };

  const getColor = (score) => {
    if (score >= 12) return "text-green-600";
    if (score >= 8) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Mini Nutritional Assessment (MNA)</h1>

      <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="number" placeholder="Edad" value={age} onChange={e => setAge(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="number" placeholder="Peso (kg)" value={weight} onChange={e => setWeight(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="number" placeholder="Talla (cm)" value={height} onChange={e => setHeight(e.target.value)} className="border p-2 w-full mb-4" />

      <div className="space-y-4 text-sm">
        <div>
          <label>🍽️ 1. Disminución en la ingesta alimentaria <span title="Evaluar si ha comido menos en la última semana por anorexia, disfagia, náuseas, etc." className="ml-1 cursor-help">ℹ️</span></label>
          <select value={answers[0]} onChange={e => handleAnswer(0, e.target.value)} className="border p-2 w-full">
            <option value="0">Disminución severa</option>
            <option value="1">Disminución moderada</option>
            <option value="2">No hay disminución</option>
          </select>
        </div>

        <div>
          <label>⚖️ 2. Pérdida de peso (últimos 3 meses) <span title="Pérdida documentada o percibida de masa corporal reciente." className="ml-1 cursor-help">ℹ️</span></label>
          <select value={answers[1]} onChange={e => handleAnswer(1, e.target.value)} className="border p-2 w-full">
            <option value="0">Pérdida > 3 kg</option>
            <option value="1">No sabe</option>
            <option value="2">Pérdida entre 1–3 kg</option>
            <option value="3">Sin pérdida</option>
          </select>
        </div>

        <div>
          <label>🚶 3. Movilidad <span title="Capacidad para caminar, levantarse o estar activo funcionalmente." className="ml-1 cursor-help">ℹ️</span></label>
          <select value={answers[2]} onChange={e => handleAnswer(2, e.target.value)} className="border p-2 w-full">
            <option value="0">Encamado</option>
            <option value="1">Limitado en movilidad</option>
            <option value="2">Deambula libremente</option>
          </select>
        </div>

        <div>
          <label>💥 4. Estrés agudo o enfermedad reciente <span title="Hospitalización, infección, trauma, cirugía reciente." className="ml-1 cursor-help">ℹ️</span></label>
          <select value={answers[3]} onChange={e => handleAnswer(3, e.target.value)} className="border p-2 w-full">
            <option value="0">Sí</option>
            <option value="2">No</option>
          </select>
        </div>

        <div>
          <label>🧠 5. Problemas neuropsicológicos <span title="Demencia, depresión diagnosticada o deterioro cognitivo." className="ml-1 cursor-help">ℹ️</span></label>
          <select value={answers[4]} onChange={e => handleAnswer(4, e.target.value)} className="border p-2 w-full">
            <option value="0">Demencia/depresión severa</option>
            <option value="1">Depresión leve</option>
            <option value="2">Sin problemas</option>
          </select>
        </div>

        <div>
          <label>📏 6. IMC <span title="Calculado automáticamente: peso / talla²" className="ml-1 cursor-help">ℹ️</span></label>
          <select value={answers[5]} onChange={e => handleAnswer(5, e.target.value)} className="border p-2 w-full">
            <option value="0">IMC &lt; 19</option>
            <option value="1">IMC 19–21</option>
            <option value="2">IMC 21–23</option>
            <option value="3">IMC ≥ 23</option>
          </select>
        </div>
      </div>

      <button onClick={calculate} className="bg-blue-600 text-white px-4 py-2 mt-6 rounded">Calcular</button>

      {result && (
  <div className="mt-4 p-4 border rounded bg-gray-50">
    <p><strong>IMC:</strong> {result.imc}</p>
    <p><strong>Score total:</strong> {result.score}</p>
    <p className={`font-semibold mt-2 ${getColor(result.score)}`}>Clasificación: {result.classification}</p>
    <button onClick={exportPDF} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">Exportar PDF</button>
  </div>
)}

        </div>
      )}
    </div>
  );
}

export default App;
