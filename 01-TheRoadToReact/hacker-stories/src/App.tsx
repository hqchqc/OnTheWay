import './App.css';
import React from 'react'
import axios from 'axios'

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
}

const title = 'React';
const welcome = {
  greeting: 'Hey',
  title: 'React'
};
function getTitle(title: string) {
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

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

const storiesReducer = (state, action) => {
  // if (action.type === 'SET_STORIES') {
  //   return action.payload
  // } else if(action.type === 'REMOVE_STORY') {
  //   return state.filter(story => action.payload.objectID !== story.objectID)
  // } else {
  //   throw new Error()
  // }
  
  switch (action.type) {
    case 'STORIES_FETCH_INIT': 
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'STORIES_FETCH_SUCCESS': 
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        )
      }
    default: 
      throw new Error()
  }
}

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
  // const [stories, setStories] = React.useState([]);
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [], isLoading: false, isError: false
  })
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`)

  const getAsyncStories = () => 
    new Promise((resolve, reject) => 
      // setTimeout(
      //   () => resolve({data: {stories: initalStories}}), 
      //   2000
      // )
      setTimeout(
        reject, 
        2000
      )
    )
  
  const handleFetchStories = React.useCallback(async () => {
    if (!searchTerm) return

    dispatchStories({
      type: 'STORIES_FETCH_INIT'
    })

    // 从网络获取
    // fetch(url).then(res => {
    //   return res.json()
    // }).then(result => {
    //   dispatchStories({
    //     type: 'STORIES_FETCH_SUCCESS',
    //     payload: result.hits
    //   })
    // }).catch(() => {
    //   dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    // })
    try {
      const result = await axios.get(url)

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits
      })
    }catch{
      dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    }
    
  }, [url])

  React.useEffect(() => {
    // // setIsLoading(true)

    // if (!searchTerm) return

    // dispatchStories({
    //   type: 'STORIES_FETCH_INIT'
    // })

    // // getAsyncStories().then(result => {
    // //   // setStories(result.data.stories)
    // //   dispatchStories({
    // //     type: 'STORIES_FETCH_SUCCESS',
    // //     payload: result.data.stories
    // //   })
    // //   // setIsLoading(false)
    // // })
    // // .catch(err => {
    // //   dispatchStories({
    // //     type: 'STORIES_FETCH_FAILURE'
    // //   })
    // // })

    // // 从网络获取
    // fetch(`${API_ENDPOINT}${searchTerm}`).then(res => {
    //   return res.json()
    // }).then(result => {
    //   dispatchStories({
    //     type: 'STORIES_FETCH_SUCCESS',
    //     payload: result.hits
    //   })
    // }).catch(() => {
    //   dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    // })
    handleFetchStories()
  }, [handleFetchStories])

  const handleRemoveStory = (item) => {
    // const newStories = stories.filter(story => item.objectID !== story.objectID)
    // // setStories(newStories)
    // dispatchStories({
    //   type: 'SET_STORIES',
    //   payload: newStories
    // })

    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    })
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  // const searchStories = stories.data.filter(story => {
  //   return story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  // })

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`)

    event.preventDefault()
  }

  const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit
  }) => (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel id="search" value={searchTerm} onInputChange={onSearchInput} isFocused > 
        <strong>Search</strong>
      </InputWithLabel>

      <button type="submit" disabled={!searchTerm}>Submit</button>
    </form>
  )

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

      <SearchForm 
        searchTerm={searchTerm}
        onSearchInput={handleSearch}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />

      {stories.isError && <p>Something went wrong</p>}

      {
        stories.isLoading ? (
          <p>Loading?...</p>
        ) : (
          <List list={stories.data} onRemoveItem={handleRemoveStory}/>
        )
      }

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

const useSemiPersistentState = (key: string,  initalState: string): [string, (newValue: string) => void] => {
  const isMounted = React.useRef(false)
  const [value, setValue] = React.useState(localStorage.getItem(key) || initalState);
  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      console.log('A')
      localStorage.setItem(key, value)
    }
  }, [value, key])

  return [value, setValue]
}

export default App;
