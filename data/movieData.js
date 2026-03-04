// Removed large data array; movies are now served dynamically from the backend SQLite database via the API for scalability.
const MOVIES = [];
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MOVIES;
}
