import axios from "axios";;

export const apiAuth = async (url, method, data) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    let response;
    switch (method) {
      case "get":
        response = await axios.get(url, config);
        break;
      case "post":
        response = await axios.post(url, data, config);
        break;
      case "put":
        response = await axios.put(url, data, config);
        break;
      case "delete":
        response = await axios.delete(url, config);
        break;
      default:
        break;
    }
    return response.data
  } catch (error) {
    if (error.status === 401) {
      return router.push('/login')
    }
    console.error("Failed to fetch users:", error);
  }
}