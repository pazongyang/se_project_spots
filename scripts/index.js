const profileEditBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileEditCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostProfileModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostProfileModal.querySelector(".modal__close-btn");

profileEditBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

profileEditCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostProfileModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostProfileModal.classList.remove("modal_is-opened");
});
