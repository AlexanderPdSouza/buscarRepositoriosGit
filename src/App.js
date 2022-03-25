import { useState } from "react";
import "./App.css";
import "bulma/css/bulma.min.css";

function App() {''
  const [user, setUser] = useState();
  const [repository, setRepository] = useState([]);
  const handleChange = (event) => setUser(event.target.value);

  async function getRepository(user) {
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const data = await response.json();
    return data;
  }
  
  function repositoryN() {
    const liSemRepository = document.createElement("li");
    liSemRepository.innerHTML = `Não existe repositorio para <b>${user}</b>`;
    const elementPai = document.getElementById("ul-list");
    elementPai.append(liSemRepository);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const resp = await getRepository(user);
    if (resp.length > 0) {
      return setRepository(resp);
    } else {
      repositoryN();
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="user">User: </label>
                <input
                  className="input"
                  name="user"
                  type="text"
                  value={user}
                  onChange={handleChange}
                ></input>
                <br />
                <input type="submit" className="button is-success"></input>
              </div>
            </form>
          </div>
          <div className="column">
            <h1>{repository.length} repositorios</h1>
            <ul id="ul-list">
              {repository.map((repo) => (
                <a href={repo.url} key={repo.url} id='url-list'>
                  <li key={repo.name} url={repo.url}>
                    {repo.name} {repo.stargazers_count}
                  </li>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
