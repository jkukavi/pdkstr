import "./App.css";

function App() {
  return (
    <div class="container">
      <form class="form" method="POST" content-type="application/json">
        <p class="message"></p>
        <input class="input" type="text" name="url"></input>
        <button class="button" type="submit">
          Send Url
        </button>
        <a>Listen</a>
      </form>
    </div>
  );
}

export default App;
