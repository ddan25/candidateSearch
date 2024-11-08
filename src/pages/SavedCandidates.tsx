import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface.tsx';


const SavedCandidates = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Retrieve saved potential candidates from localStorage when the component loads
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (savedCandidates) {
      setPotentialCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  // Handle removing a candidate from the saved list
  const removeCandidate = (candidateToRemove: Candidate) => {
    const updatedCandidates = potentialCandidates.filter(
      (candidate) => candidate.login !== candidateToRemove.login
    );
    setPotentialCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates)); // Persist the updated list
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      {potentialCandidates.length === 0 ? (
        <p>No candidates have been accepted</p>
      ) : (
        <ul>
          {potentialCandidates.map((candidate) => (
            <li key={candidate.login} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={candidate.avatar_url}
                  alt={candidate.login}
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                <div style={{ marginLeft: '10px' }}>
                  <h3>{candidate.name}</h3>
                  <p>Username: {candidate.login}</p>
                  <p>Location: {candidate.location}</p>
                  <p>Email: {candidate.email}</p>
                  <p>Company: {candidate.company}</p>
                  <p>
                    <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  </p>
                  <button onClick={() => removeCandidate(candidate)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
