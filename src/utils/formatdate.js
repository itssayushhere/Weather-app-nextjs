export const formatDate = (date, config) => {
    const defaultOptions = { day: 'numeric', month:'short', year:'numeric' };
    const options = config ? config : defaultOptions;

    return new Date(date).toLocaleDateString('en-US', options);
};
export const getCurrentDateFormatted = () =>{
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  export const getDateFormatted = (string) =>{
    const date = new Date(string);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
