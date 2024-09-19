// Save state to localStorage
const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState); // or sessionStorage
    } catch (e) {
      console.error('Could not save state', e);
    }
  };
  
  // Load state from localStorage
  const loadState = () => {
    try {
      const serializedState = localStorage.getItem('reduxState'); // or sessionStorage
      if (serializedState === null) {
        return undefined; // Use default state if nothing is stored
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.error('Could not load state', e);
      return undefined;
    }
  };
  
  export{
    loadState,
    saveState
  }