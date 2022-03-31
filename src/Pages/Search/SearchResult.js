import SearchItem from "./SearchItem";
import './SearchResult.css'

function SearchResult(props) {
  return (
    <ul className="searchResultList">
      {props.result.map(data =>
        <li className="searchResultListItem" key={data.type + data.id}>
          <SearchItem data={data} />
        </li>
      )}
    </ul>
  );
}

export default SearchResult;