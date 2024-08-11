const url = `https://picsum.photos/v2/list?limit=9`;

export const fetchImages = async function (pageNumber) {
  const res = await fetch(`${url}&page=${pageNumber}`);
  const data = await res.json();
  return data;
};
