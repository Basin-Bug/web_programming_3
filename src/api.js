export async function fetchImages(type) {
  const response = await fetch(
    `https://foodish-api.herokuapp.com/api/images/${type}`
  );
  const data = await response.json();
  return data.image;
}