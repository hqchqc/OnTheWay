import './App.css';
import React from 'react'

const title = 'React';
const welcome = {
  greeting: 'Hey',
  title: 'React'
};
function getTitle(title) {
  return title
}
// const list = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   }, {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   }
// ]

function App() {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    }, {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ]
  
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React')


  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const searchStories = stories.filter(story => {
    return story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  })

  return (
    <div className="App">
      <h1>Hello {title}</h1>

      <h1>
        {welcome.greeting} 
        {welcome.title}
      </h1>

      <h1>Hello {getTitle('React')}</h1>

      <h1>My Hacker Stories</h1>
 
      <Search onSearch={handleSearch} search={searchTerm}/>

      <hr />

      <List list={searchStories}/>

    </div>
  );
}

const List = ({list}) => 
  list.map(({objectID, ...item}) => <Item key={objectID} {...item}/>)

const Item = ({title, author, url, num_comments, points}) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
)

const Search = ({search, onSearch} ) => (
  <div>
    <label htmlFor="search">Search:</label>
    <input id="search" type="text" value={search} onChange={onSearch}></input>
  </div>
)

const useSemiPersistentState = (key,  initalState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initalState);
  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}


export default App;
