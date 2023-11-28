export const convertResponseToArray = (response) => {
  var array = [];
  if (Object.keys(response).length > 0) {
    array = Object.values(response).filter((item) => typeof item === 'object');
  } else {
    array = response.data || [];
  }
  return array;
};
