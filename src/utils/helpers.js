// export function setButtonText(
//   btn,
//   isLoading,
//   defaultText = "save",
//   loadingText = "saving..."
// ) {
//   if (isLoading) {
//     //set the loading text
//     console.log(`setting text to ${loadingText}`);
//   } else {
//     //set not loading text
//   }
// }

// export function deleteBtnText(
//   btn,
//   isLoading,
//   defaultText = "delete",
//   loadingText = "deleting..."
// ) {
//   if (isLoading) {
//     console.log(`setting text to ${loadingText}`);
//   } else {
//   }
// }

export function setButtonText(
  btn,
  isLoading,
  defaultText = "save",
  loadingText = "saving..."
) {
  if (!btn) return;
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}

export function deleteBtnText(
  btn,
  isLoading,
  defaultText = "delete",
  loadingText = "deleting..."
) {
  if (!btn) return;
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}
