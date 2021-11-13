import React from 'react';
import {sortBy} from 'lodash'

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
}

type Stories = Array<Story>

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
}

const SORTS = {
  NONE: (list: Stories) => list,
  TITLE: (list: Stories) => sortBy(list, 'title'),
  AUTHOR: (list: Stories) => sortBy(list, 'author'),
  COMMENT: (list: Stories) => sortBy(list, 'num_comments').reverse(),
  POINT: (list: Stories) => sortBy(list, 'points').reverse()
} as any

const List = ({list, onRemoveItem}: ListProps) => {

  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = (sortKey: string) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse
    setSort({sortKey, isReverse})
  }

  const sortFunction = SORTS[sort.sortKey]

  const sortedLit = sort.isReverse ? sortFunction(list).reverse() : sortFunction(list)

  

  return (
    <div>
      <div style={{display: 'flex'}}>
        <span style={{width: '40%'}}>
          <button type="button" onClick={() => handleSort('TITLE')}>
            Title
          </button>
        </span>
        <span style={{width: '30%'}}>
          <button type="button" onClick={() => handleSort('AUTHOR')}>
            Author
          </button>
        </span>
        <span style={{width: '10%'}}>
          <button type="button" onClick={() => handleSort('COMMENT')}>
            Comments
          </button>
        </span>
        <span style={{width: '10%'}}>
          <button type="button" onClick={() => handleSort('POINT')}>
            Points
          </button>
        </span>
        <span style={{width: '10%'}}>Action</span>
      </div>

      {
        sortedLit.map((item: Story) => (
          <Item 
            key={item.objectID} 
            item={item}
            onRemoveItem={onRemoveItem}
          />
        ))
      }
    </div>
  )
}

const Item = ({item, onRemoveItem}: ItemProps) => {

  return (
    <div style={{display: 'flex'}}>
      <span style={{width: '40%'}}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{width: '30%'}}>{item.author}</span>
      <span style={{width: '10%'}}>{item.num_comments}</span>
      <span style={{width: '10%'}}>{item.points}</span>
      <span style={{width: '10%'}}>
        <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
      </span>
    </div>
  )
}

export default List