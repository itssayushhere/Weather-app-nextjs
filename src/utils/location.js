export async function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            try {
              const locationName = await getPlaceName(latitude, longitude);
              resolve({ latitude, longitude, locationName }); // Resolves with coordinates and location name
            } catch (error) {
              reject(error); // Rejects with an error message
            }
          },
          (error) => {
            reject(handleError(error)); // Rejects with the error message
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  }
  
  async function getPlaceName(latitude, longitude) {
    const apiKey = 'eb822974c3ae4b0bad82c9b235539984';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch location name.");
    }
  
    const data = await response.json();
    if (data && data.results && data.results.length > 0) {
      return data.results[0].formatted; // Returns the formatted address or place name
    } else {
      throw new Error("No results found for the given coordinates.");
    }
  }
  
  function handleError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "User denied the request for Geolocation.";
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable.";
      case error.TIMEOUT:
        return "The request to get user location timed out.";
      case error.UNKNOWN_ERROR:
        return "An unknown error occurred.";
      default:
        return "An unknown error occurred.";
    }
  }
  