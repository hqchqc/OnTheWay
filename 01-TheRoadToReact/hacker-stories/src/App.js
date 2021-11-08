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
  // const stories = [
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

  const initalStories = [
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

  // const [stories, setStories] = React.useState(initalStories);
  const [stories, setStories] = React.useState([]);

  const getAsyncStories = () => 
    new Promise(resolve => 
      setTimeout(
        () => resolve({data: {stories: initalStories}}), 
        2000
      )
    )

  React.useEffect(() => {
    getAsyncStories().then(result => {
      setStories(result.data.stories)
    });
  }, [])

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(story => item.objectID !== story.objectID)
    setStories(newStories)
  }

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
 
      {/* <Search onSearch={handleSearch} search={searchTerm}/> */}
      {/* <InputWithLabel id="search" label="Search" value={searchTerm} onInputChange={handleSearch} /> */}

      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch} isFocused>
        <strong>Search</strong>
      </InputWithLabel>

      <hr />

      <List list={searchStories} onRemoveItem={handleRemoveStory}/>

    </div>
  );
}

const List = ({list, onRemoveItem}) => 
  list.map((item) => 
    <Item 
      key={item.objectID} 
      item={item}
      onRemoveItem={onRemoveItem}
    />)

const Item = ({item, onRemoveItem}) => {
  // const handleRemoveItem = () => onRemoveItem(item)

  return (
    <div>
      <span>
        <a href={item.url}>{title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        {/* <button type="button" onClick={onRemoveItem.bind(null, item)}>Dismiss</button> */}
        <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
      </span>
    </div>
  )
}

// const Search = ({search, onSearch} ) => (
//   <div>
//     <label htmlFor="search">Search:</label>
//     <input id="search" type="text" value={search} onChange={onSearch}></input>
//   </div>
// )

// const Search = ({search, onSearch} ) => [
//   <label htmlFor="search">Search:</label>,
//   <input id="search" type="text" value={search} onChange={onSearch}></input>
// ]
  
// const InputWithLabel = ({id, label, value, onInputChange, type='text'}) => (
//   <>
//     <label htmlFor={id}>{label}</label>
//     <input id="search" type="text" value={value} onChange={onInputChange} type={type}></input>
//   </>
// )

const InputWithLabel = ({id, value, onInputChange, type='text', children, isFocused}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input 
        ref={inputRef}
        id="search" 
        autoFocus={isFocused} 
        type="text" 
        value={value} 
        onChange={onInputChange} 
        type={type}
      />
    </>
  )
}

const useSemiPersistentState = (key,  initalState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initalState);
  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}


export default App;
