// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    login: string;
    name: string;
    location: string;
    avatar_url: string;  // URL to the candidate's avatar image
    email: string;
    html_url: string;  // URL to the candidate's profile (e.g., GitHub)
    company: string;
  }
  
  export default Candidate