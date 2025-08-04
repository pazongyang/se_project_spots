import "./index.css";
import { setButtonText, deleteBtnText } from "../utils/helpers.js";
import {
  enableValidation,
  settings,
  resetValidation,
  disabledButton,
} from "../scripts/validate.js";
import Api from "../utils/Api.js";
import logoSrc from "../images/Logo.svg";
import pencilIconSrc from "../images/pencil-light.svg";
import pencilSrc from "../images/pencil.svg";
import plusSrc from "../images/plus.svg";
import closeIconSrc from "../images/close-icon.svg";
import closePreviewIconSrc from "../images/close-preview-icon.svg";
import deleteCloseIconSrc from "../images/delete-close-icon.svg";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logo").src = logoSrc;
  document.querySelector(".profile__pencil-icon").src = pencilIconSrc;
  document.querySelector(".profile__edit-btn").src = pencilSrc;
  document.querySelector(".profile__add-btn").src = plusSrc;
  document.querySelector(".modal__close-icon").src = closeIconSrc;
  document.querySelector(".modal__close-btn_type_preview").src =
    closePreviewIconSrc;
  document.querySelector(".modal__delete-icon").src = deleteCloseIconSrc;
});

// Initialize API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3b12f061-b483-4e72-ac04-631626ca2b2b",
    "Content-Type": "application/json",
  },
});

// DOM references
const profileAvatarEl = document.querySelector(".profile__avatar");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileEditCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCardModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostCardModal.querySelector(".modal__close-btn");
const newPostForm = newPostCardModal.querySelector(".modal__form");
const submitBtn = newPostForm.querySelector(".modal__submit-btn");
const newPostImageLinkInput = newPostForm.querySelector("#card-image-input");
const newPostCaptionInput = newPostCardModal.querySelector(
  "#caption-image-input"
);

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarsubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-confirmation-modal");
const deleteModalForm = deleteModal.querySelector("#delete-card-form");
const deleteModalCloseBtn = deleteModal.querySelector(
  ".modal-delete__close-btn"
);
const deleteCancelBtn = deleteModal.querySelector("#delete-cancel-btn");

// Variables to track selected card
let selectedCard = null;
let selectedCardId = null;

// Store current user id for like toggling
let currentUserId = null;

// Load initial data
api
  .getAppInfo()
  .then(([userInfo, cards]) => {
    currentUserId = userInfo._id;

    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    profileAvatarEl.src = userInfo.avatar;

    cards.forEach((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

// Handle like button click
function handleLike(evt, cardId) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-btn_active");

  api
    .changeLikeStatus(cardId, !isLiked)
    .then((updatedCard) => {
      const likedByUser = updatedCard.isLiked;

      if (likedByUser) {
        likeButton.classList.add("card__like-btn_active");
      } else {
        likeButton.classList.remove("card__like-btn_active");
      }
    })
    .catch((err) => {
      console.error("Failed to update like status:", err);
    });
}

// Create and return a card element
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  if (data.isLiked) {
    likeButton.classList.add("card__like-btn_active");
  }

  likeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  deleteButton.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Delete form submit handler
deleteModalForm.addEventListener("submit", function handleDeleteSubmit(evt) {
  evt.preventDefault();
  deleteBtnText(deleteModalForm, true, "delete", "deleting...");
  if (!selectedCardId || !selectedCard) return;

  api

    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })

    .catch(console.error)
    .finally(() => {
      selectedCard = null;
      selectedCardId = null;
    });
});

// Modal close handlers for delete modal
deleteModalCloseBtn.addEventListener("click", () => closeModal(deleteModal));
deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));

// Profile edit handlers
profileEditBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});
profileEditCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal)
);
editProfileForm.addEventListener(
  "submit",
  function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    //submitBtn.textContent = "saving..."
    setButtonText(submitBtn, true, "save", "saving...");
    api
      .editUserInfo({
        name: editProfileNameInput.value,
        about: editProfileDescriptionInput.value,
      })
      .then((data) => {
        profileNameEl.textContent = data.name;
        profileDescriptionEl.textContent = data.about;
        closeModal(editProfileModal);
        //todo - call setbuttonText instead
      })
      .catch(console.error);
  }
);
// implement loading text for all other form submission
// New post handlers
newPostBtn.addEventListener("click", () => openModal(newPostCardModal));
newPostCloseBtn.addEventListener("click", () => closeModal(newPostCardModal));
newPostForm.addEventListener("submit", function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const values = {
    name: newPostCaptionInput.value,
    link: newPostImageLinkInput.value,
  };
  api
    .addCard(values)
    .then((newCard) => {
      setButtonText(submitBtn, true, "save", "saving...");
      // Add isLiked flag (new cards are not liked initially)
      newCard.isLiked = false;
      const cardEl = getCardElement(newCard);
      cardsList.prepend(cardEl);
      newPostForm.reset();
      disabledButton(submitBtn, settings);
      closeModal(newPostCardModal);
    })
    .catch(console.error);
});

// Preview modal handlers
previewModalCloseBtn.addEventListener("click", () => closeModal(previewModal));

// Avatar edit handlers
avatarModalBtn.addEventListener("click", () => {
  resetValidation(avatarForm, [avatarInput], settings);
  openModal(avatarModal);
});
avatarModalCloseBtn.addEventListener("click", () => closeModal(avatarModal));
avatarForm.addEventListener("submit", function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const newAvatarUrl = avatarInput.value.trim();
  if (!newAvatarUrl || !newAvatarUrl.startsWith("http")) {
    alert("Please enter a valid image URL.");
    return;
  }
  disabledButton(avatarsubmitBtn, settings);
  setButtonText(submitBtn, true, "save", "saving...");
  api
    .editAvatarInfo(newAvatarUrl)
    .then((data) => {
      profileAvatarEl.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      avatarsubmitBtn.disabled = false;
      avatarsubmitBtn.classList.remove(settings.inactiveButtonClass);
    });
});

// Modal utility functions
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".modal_is-opened");
    if (opened) closeModal(opened);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.addEventListener("click", overlayClickListener);
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("click", overlayClickListener);
  document.removeEventListener("keydown", handleEscape);
  if (modal === deleteModal) {
    deleteModalForm.reset();
    selectedCard = null;
    selectedCardId = null;
  }
}

const overlayClickListener = (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
};
