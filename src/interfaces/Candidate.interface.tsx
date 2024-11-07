// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    name: string;
    username: string;
    location: string;
    avatar: string;  // URL to the candidate's avatar image
    email: string;
    html_url: string;  // URL to the candidate's profile (e.g., GitHub)
    company: string;
  }
  