import './App.css';
import React from 'react';
import axios from 'axios';
import List from './List';
import SearchForm from './SearchForm';

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
}

type Stories = Array<Story>



type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
}

interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT'
}
interface StoriesFetchSuccessAction {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}

interface StoriesFetchFailureAction {
  type: 'STORIES_FETCH_FAILURE';
}

interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

type StoriesAction = 
  | StoriesFetchInitAction 
  | StoriesFetchSuccessAction 
  | StoriesFetchFailureAction 
  | StoriesRemoveAction



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

const storiesReducer = (state: StoriesState, action: StoriesAction) => {
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

const getLastSearches = (urls: any[]) => urls.slice(-5)
const extraSearchTerm = (url: string) => url.replace(API_ENDPOINT, '');

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
  const [urls, setUrls] = React.useState([`${API_ENDPOINT}${searchTerm}`])

  const lastSearches = getLastSearches(urls)

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
      const lastUrl = urls[urls.length - 1]
      const result = await axios.get(lastUrl)

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits
      })
    }catch{
      dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    }
    
  }, [urls])

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

  const handleRemoveStory = (item: Story) => {
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // const searchStories = stories.data.filter(story => {
  //   return story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  // })

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const url = `${API_ENDPOINT}${searchTerm}`
    setUrls(urls.concat(url))

    event.preventDefault()
  }

  const handleLastSearch = (searchTerm: any) => {
    const url = `${API_ENDPOINT}${searchTerm}`
    setUrls(urls.concat(url))
  }


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

      {
        lastSearches.map(url => (
          <button key={url} type="button" onClick={() => handleLastSearch(url)}>{url}</button>
        ))
      }

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
