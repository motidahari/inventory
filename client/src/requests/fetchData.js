export const fetchData = async (req, opt) => {
  const result = await fetch(req, opt)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.errors) || response.status;
        return Promise.reject(error);
      }
      return data;
    })
    .catch((errors) => {
      return { errors };
    });
  return result;
};
