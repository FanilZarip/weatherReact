export function checkError404(awaitResult) {
  try {
    if (awaitResult.status === 404) {
      throw new Error("Enter correct city");
    } else if (awaitResult.status === 401) {
      throw new Error("Check API Key");
    }
  } catch (error) {
    alert(error);
  }
}
