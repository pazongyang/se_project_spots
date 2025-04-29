const profileEditBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileEditCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfiledescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCardModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostCardModal.querySelector(".modal__close-btn");

const newPostForm = newPostCardModal.querySelector(".modal__form");

const newPostImageLinkInput = newPostForm.querySelector("#card-image-input");
const newPostCaptionInput = newPostCardModal.querySelector(
  "#caption-image-input"
);

const cardEl = document.querySelector("card");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const newPostImageEl = document.querySelector("card__image");
const newPostCardTitleEl = document.querySelector("card__title");

profileEditBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfiledescriptionInput.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

profileEditCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostCardModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostCardModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfiledescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(newPostImageLinkInput.value);
  console.log(newPostCaptionInput.value);
  newPostCardModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handleAddCardSubmit);
