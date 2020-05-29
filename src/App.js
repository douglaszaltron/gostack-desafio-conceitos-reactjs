import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Bootcamp rocketseat - ${Date.now()}`,
      url: 'https://www.rocketseat.com.br',
      techs: ['NodeJs', 'ReactJs', 'React Native']
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }
  
  useEffect(() => {
    api.get('/repositories')
      .then(response => setRepositories(response.data))
      .catch(err => console.log(err));
  }, []);


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
