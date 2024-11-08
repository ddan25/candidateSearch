import { useState, useEffect } from 'react';
import { searchGithubUser, searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface.tsx';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Store all fetched candidates
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the index of the current candidate being displayed
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>()
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    // Initialize from localStorage if there are any saved candidates
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });
  // Fetch candidates when the component loads
  const fetchCandidates = async () => {
    try {
      // Adjusted search term to "developer" or a more general term
      const data = await searchGithub(); // Example search term
      setCandidates(data || []);
      const userData = await searchGithubUser(data[currentIndex].login);

       // Ensure it's always an array
         // Check if the currentIndex is valid before attempting to access candidates[currentIndex]
     setCurrentCandidate(userData);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };
  useEffect(() => {
    fetchCandidates();
  }, []);



  const saveCandidate = (candidate: Candidate) => {
    // Save the candidate to the savedCandidates list and persist in localStorage
    setSavedCandidates((prevSaved) => {
      const updatedSaved = [...prevSaved, candidate];
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSaved));
      setCurrentIndex((currentIndex +1));
      fetchCandidates();
      return updatedSaved;
    });
  };

  const skipCandidate = () => {
    // Move to the next candidate, wrap around to the first candidate if at the end of the list
    if (candidates.length > 0) {
      // setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
      setCurrentIndex((currentIndex +1));
      fetchCandidates();
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>

      {/* Display current candidate details */}
      {candidates.length > 0 && currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.name} />
          <h2>{currentCandidate.login}</h2>
          <p>Username: {currentCandidate.name === null? 'N/A':currentCandidate.name}</p>
          <p>Location: {currentCandidate.location === null? 'N/A':currentCandidate.location}</p>
          <p>Email: {currentCandidate.email === null? 'N/A':currentCandidate.email}</p>
          <p>Company: {currentCandidate.company === null? 'N/A':currentCandidate.company}</p>
          <p>
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </p>
          <div>
            <button onClick={() => saveCandidate(currentCandidate)}>+</button>
            <button onClick={skipCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No candidates available to review</p>
      )}

      {/* Display list of saved candidates */}
      {savedCandidates.length > 0 && (
        <div>
          <h2>Saved Candidates</h2>
          <ul>
            {savedCandidates.map((candidate, index) => (
              <li key={index}>
                <img
                  src={candidate.avatar_url}
                  alt={candidate.login}
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <p>{candidate.login} - {candidate.login}</p>
                <p>Location: {candidate.location}</p>
                <p>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
