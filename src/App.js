import React, {useState, useEffect} from "react";
import "./styles.css";
import api from "./services/api";

function App() {

  const [ repositorys, setRepositorys ] = useState([]) 
  
  useEffect(() => {
    api.get('/repositories').then(resonse => {
      setRepositorys(resonse.data)
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Santos",
      url: "https://github.com/Yan-pg/Conceitos-ReactJS",
      techs: "yan477"
    })

    const repositoryData = response.data
    setRepositorys([...repositorys, repositoryData])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositorys(repositorys.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.map(repositoryAdd => (
          <li>
          {repositoryAdd.title}
              <button onClick={() => handleRemoveRepository(repositoryAdd.id)}>
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
