import {createImg} from './util.js'

const avatarPic = document.querySelector('.ad-form-header__preview');
const avatarPreview = document.querySelector('.ad-form-header__input');
const advertPic = document.querySelector('.ad-form__photo');
const advertPreview = document.querySelector('.ad-form__input');
const IMG_FORMAT = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg', 'image/svg+xml'];
const ALT_TEXT = 'Фотография аппартаментов';
const AVATAR_SRC = 'img/muffin-red.svg';
const SIZE = 70;

const onPreviewPictureChange = (load, preview) => {
  const file = load.files[0];
  const typeOfFile = file.type;
  const format = IMG_FORMAT.includes(typeOfFile);

  if (preview.children.length === 0 && format) {
    preview.appendChild(createImg(ALT_TEXT, SIZE, SIZE));
  }

  if (format) {
    const reader = new FileReader;
    reader.addEventListener('load', () => {
      preview.children[0].src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

const resetPhotoPreview = () => {
  avatarPic.querySelector('img').src = AVATAR_SRC;
  advertPic.querySelector('img').src = AVATAR_SRC;
}

avatarPreview.addEventListener('change', () => onPreviewPictureChange(avatarPreview, avatarPic));
advertPreview.addEventListener('change', () => onPreviewPictureChange(advertPreview, advertPic));

export {
  resetPhotoPreview
}
