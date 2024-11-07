import { useState, useEffect } from 'react';

interface Candidate {
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  html_url: string;
  company: string;
}

const SavedCandidates = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Retrieve saved potential candidates from localStorage when the component loads
    const savedCandidates = localStorage.getItem('potentialCandidates');
    if (savedCandidates) {
      setPotentialCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  // Handle removing a candidate from the saved list
  const removeCandidate = (candidateToRemove: Candidate) => {
    const updatedCandidates = potentialCandidates.filter(
      (candidate) => candidate.username !== candidateToRemove.username
    );
    setPotentialCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates)); // Persist the updated list
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      {potentialCandidates.length === 0 ? (
        <p>No candidates have been accepted</p>
      ) : (
        <ul>
          {potentialCandidates.map((candidate) => (
            <li key={candidate.username} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={candidate.avatar}
                  alt={candidate.username}
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                <div style={{ marginLeft: '10px' }}>
                  <h3>{candidate.name}</h3>
                  <p>Username: {candidate.username}</p>
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
