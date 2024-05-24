import React, { useEffect, useState } from "react";
// import SearchResultCard from "./SearchResultsCard";
import { Link, useSearchParams } from "react-router-dom";

// Import SearchShimmer component here
import SearchShimmer from "./SearchShimmer";
import { YOUTUBE_VIDEO_SEARCH_RESULT_API } from "../utils/constants";
import SearchResultsCard from "./SearchResultsCard";
import ButtonList from "./ButtonList";
import { useSelector } from "react-redux";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search_query");
  const api_key=process.env.REACT_APP_YOUTUBE_KEY;
  const isMenuOpen=useSelector(store=>store.app.isMenuOpen);

  useEffect(() => {
    getResults();
  }, [searchParams]);

  const [searchResult, setSearchResult] = useState([]);

  const getResults = async () => {
    const data = await fetch(YOUTUBE_VIDEO_SEARCH_RESULT_API +api_key+"&q="+searchTerm);
    const json = await data.json();
    // console.log(json.items);
    setSearchResult(json.items);
    console.log(searchResult)
  };

  return (
    <div className={`col-span-7 pl-2 w-full mt-16 ${!isMenuOpen?"lg:col-span-7":"lg:col-span-5"}`}>
      <div className='h-[calc(100vh-4rem)]  w-full overflow-y-scroll custom-scrollbar1 grid  grid-cols-1 gap-4 max-w-[1400px] mx-auto' >
      {searchResult.length === 0 ? (
        <SearchShimmer /> // Render the shimmer component when searchResult is empty
        ) : (
        searchResult.map((r) => (
          <Link to={"/watch?v=" + r.id.videoId} key={r.id.videoId}>
            <SearchResultsCard info={r} />
          </Link>
        )
        )
        )}
      </div>      
    </div>
  );
};

export default SearchResult;