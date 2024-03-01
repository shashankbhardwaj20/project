import React, { useState } from 'react';
const UserProfile = ({ username, rating, games }) => (
  <div>
    <h2>{username}'s Profile</h2>
    <p>Rating: {rating}</p>
    <p>Games Played: {games}</p>
    {/* Add more essential information as needed */}
  </div>
);
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userData, setUserData] = useState(null);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // to test use george as username
  const search = () => {
    if (searchTerm.trim() !== "") {
      fetch(`https://lichess.org/api/user/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUserData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      alert("Please enter a search term.");
    }
  };

  return (
    <div>
      <h1>API Search</h1>
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Enter your search term" />
      <button onClick={search}>Search</button>

      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            {/* Display results however you like */}
            <p>{result.title}</p> {/* Assuming each result has a title property */}
          </div>
        ))}
      </div>

      {userData && (
        <UserProfile
          username={userData.username}
          rating={userData.perfs.blitz.rating}
          games={userData.perfs.blitz.games}
          // Add more properties as needed
        />
      )}

    </div>
  );
}
export default SearchComponent;