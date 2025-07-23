import { useState } from 'react';
import jsPDF from 'jspdf';

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [answers, setAnswers] = useState(Array(6).fill(0));
  const [score, setScore] = useState(null);

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    return (parseFloat(weight) / (h * h)).toFixed(1);
  };

  const calculateScore = () => {
    const total = answers.reduce((sum, val) => sum + val, 0);
    setScore(total);
  };

  const getResult = () => {
    if (score >= 12) return "Estado nutricional normal";
    if (score >= 8) return "Riesgo de malnutrición";
    return "Malnutrición";
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Mini Nutritional Assessment (MNA)", 10, 10);
    doc.text(`Nombre: ${name}`, 10, 20);
    doc.text(`Edad: ${age}`, 10, 30);
    doc.text(`Peso: ${weight} kg`, 10, 40);
    doc.text(`Estatura: ${height} cm`, 10, 50);
    doc.text(`IMC: ${calculateBMI()}`, 10, 60);
    doc.text(`Puntaje MNA: ${score}`, 10, 70);
    doc.text(`Resultado: ${getResult()}`, 10, 80);
    doc.save("mna_resultado.pdf");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Mini Nutritional Assessment (MNA)</h1>
      <div className="grid grid-cols-2 gap-4">
        <div><label>Nombre</label><input value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full" /></div>
        <div><label>Edad</label><input type="number" value={age} onChange={e => setAge(e.target.value)} className="border p-2 w-full" /></div>
        <div><label>Peso (kg)</label><input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="border p-2 w-full" /></div>
        <div><label>Estatura (cm)</label><input type="number" value={height} onChange={e => setHeight(e.target.value)} className="border p-2 w-full" /></div>
      </div>
      <div>
        <h2 className="font-semibold mt-4">Preguntas MNA</h2>
        {["Disminución en la ingesta", "Pérdida de peso", "Movilidad", "Estrés agudo", "Problemas neuropsicológicos", "IMC"].map((q, i) => (
          <div key={i} className="mt-2"><label>{q}</label><input type="number" min="0" max="3" value={answers[i]} onChange={e => handleAnswer(i, e.target.value)} className="border p-2 w-full" /></div>
        ))}
      </div>
      <button onClick={calculateScore} className="bg-blue-600 text-white px-4 py-2 rounded">Calcular</button>
      {score !== null && (
        <div className="mt-4 space-y-2">
          <p><strong>IMC:</strong> {calculateBMI()}</p>
          <p><strong>Puntaje total:</strong> {score}</p>
          <p><strong>Resultado:</strong> {getResult()}</p>
          <button onClick={exportToPDF} className="bg-gray-700 text-white px-4 py-2 rounded">Exportar a PDF</button>
        </div>
      )}
    </div>
  );
}
