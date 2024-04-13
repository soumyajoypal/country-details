
const url = "../data.json";

async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("error");
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default getData;
