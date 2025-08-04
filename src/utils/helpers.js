export function setButtonText(
  btn,
  isLoading,
  defaultText = "save",
  loadingText = "saving..."
) {
  if (isLoading) {
    //set the loading text
    console.log(`setting text to ${loadingText}`);
  } else {
    //set not loading text
  }
}

export function deleteBtnText(
  btn,
  isLoading,
  defaultText = "delete",
  loadingText = "deleting..."
) {
  if (isLoading) {
    console.log(`setting text to ${loadingText}`);
  } else {
  }
}
