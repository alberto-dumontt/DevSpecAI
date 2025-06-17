import { useState } from 'react';
import { requestGenerateSpec } from './services/api';
import './App.css';

function App() {
  const [technologiesError, setTechnologiesError] = useState(false);
  const [levelError, setLevelError] = useState(false);
  const [goalError, setGoalError] = useState(false);
  const [technologies, setTechnologies] = useState('');
  const [level, setLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [spec, setSpec] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSpec = async () => {

    if (!technologies) {
      setTechnologiesError(true);
      setSpec('');
      return;
    }

    if (!goal) {
      setGoalError(true);
      setSpec('');
      return;
    }

    if (!level) {
      setLevelError(true);
      setSpec('');
      return;
    }

    setTechnologiesError(false);
    setLevelError(false);
    setGoalError(false);

    const levelMap = {
      '1': 'JUNIOR',
      '2': 'MID', 
      '3': 'SENIOR'
    };

    const requestData = {
      'technologies': technologies,
      'professionalLevel': levelMap[level],
      'careerObjective': goal
    };

    try {
      setLoading(true);
      setSpec('');

      const response = await requestGenerateSpec(requestData);
      setSpec(response.spec);

    } catch (error) {
      setSpec('Desculpe, no momento o devSpecAI está indisponível.\nTente novamente em alguns minutos.');
    } finally {
      setLoading(false);
  };
}

  return (
    <>
      <div className="header-container">
        <h1>DevSpec.AI</h1>
        <div className="line"></div>
      </div>

      <div className="container">
        <label className={technologiesError ? 'error' : ''}>Tecnologias a aplicar</label>
        <input
          type="text"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="Ex: API com Java e Redis"
        />

        <label className={goalError ? 'error' : ''}>Objetivo profissional</label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Ex: Vaga para dev Java Júnior em fintech"
        />

        <label className={levelError ? 'error' : ''}>Nível profissional</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Selecione</option>
          <option value="1">Júnior</option>
          <option value="2">Pleno</option>
          <option value="3">Sênior</option>
        </select>

        <button onClick={generateSpec}>Gerar Especificações de projeto</button>

        {loading && (
          <div className="loading" style={{ marginTop: '10px' }}>
            ⌛ Gerando especificação...
          </div>
        )}

        {spec && (
          <div className="result">
            <h2>Especificação</h2>
            <p>{spec}</p>
          </div>
        )}

        <footer>
          <p>Por estar hospedado na camada gratuita da Render, o sistema pode levar alguns minutos para iniciar após períodos de inatividade (cold start). Caso a aplicação não responda de imediato, aguarde alguns instantes e tente novamente.</p>
        </footer>
      </div>
    </>
  );
}

export default App;