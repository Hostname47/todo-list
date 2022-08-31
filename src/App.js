import Header from "./components/Header";
import './css/App.css'

const list = [
  { id: 1, content: "I'm going to kick your ass next time you use class component", done: false },
  { id: 2, content: "I have to get a job by the end of 2022", done: false },
  { id: 3, content: "I should learn redux for state management", done: false },
  { id: 4, content: "I have to train today", done: true },
]

function App() {
  const length = list.length
  return (
    <div className="App">
      <Header />
      <h2 className="text-center">{length ? `You have ${length} task${length > 1 ? 's' : ''}` : "You don't have any task for the moment"}</h2>
      <div id='todo-items-box'>
        {
          list.map(item => (
              <div key={ item.id } className="todo-item-container">
                <input type="checkbox" className="" checked={item.done ? 'checked' : ''} />
                <p className="content">{ item.content }</p>
              </div>
            )
          )
        }
      </div>

    </div>
  );
}

export default App;
