export function handleAxiosError(error) {
  // Check if the error is an Axios error
  if (!error.isAxiosError) {
    return "An unknown error occurred.";
  }

  // Extract the response data
  const response = error.response;

  // Check for the status code and return appropriate messages
  if (
    response.status === 400 &&
    response.data.problemDetails &&
    response.data.problemDetails.errors
  ) {
    // Handle validation error
    const validationErrors = response.data.problemDetails.errors;
    const errorMessages = Object.keys(validationErrors)
      .map((field) => `${field}: ${validationErrors[field].join(", ")}`)
      .join("; ");
    return `Validation error: ${errorMessages}`;
  } else {
    // Handle other errors
    const errorMessage = response.data.title || "An error occurred";
    return `${errorMessage}`;
  }
}
