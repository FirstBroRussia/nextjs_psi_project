import styles from './swiper.module.scss';

const closeButtonSvg = require('./img/close-button.svg');

const arrowClickEvent = {
	Back: 'back',
	Forward: 'forward',
};

// Кастомный вид опций для класса Slider, ЭТО ОБЪЕКТ!!!
const options = {
	nextjs : [true, false], // Два значения!!!
};
//
export default class Swiper {
  #options = null;

  #container = null;
  #dataArray = null;

  #swiperBLock = null;
  #arrowLeft = null;
  #arrowRight = null;
  #contentBlock = null;
  #contentWrapper = null;
  #fullScreenImageBlock = null;
  #closeFullScreenImageBlockButton = null;

  #elementsCount = null;
  #currentNumberVisibleElement = null;
  #currentVisibleElement = null;

  #widthContentBlock = null;
  #heightContentBlock = null;

  #swiperBlockResizeHandler = (evt) => {
	const parentBlockRect = this.#contentBlock.getBoundingClientRect();
	const width = parentBlockRect.width;
	const height = parentBlockRect.height;

	if (this.#widthContentBlock !== width) {
		this.#widthContentBlock = width;
		this.#contentWrapper.style.width = `${this.#widthContentBlock * this.#elementsCount}px`;
	}
	if (this.#heightContentBlock !== height) {
		this.#heightContentBlock = height;
		this.#contentWrapper.style.height = `${this.#heightContentBlock}px`;
	}
  };

  #renderImageItem (data) {
	const imageElement = document.createElement('img');
	imageElement.setAttribute('class', `${styles.image}`);
	// imageElement.setAttribute('class', `display_none`);
	imageElement.setAttribute('src', data);
	imageElement.setAttribute('alt', 'Изображение');
	
	const imageWrapper = document.createElement('div');
	imageWrapper.setAttribute('class', `${styles.image_wrapper}`);
	const widthParentBlock = this.#contentBlock.getBoundingClientRect().width;
	imageWrapper.style.width = `${widthParentBlock}px`;
	imageWrapper.appendChild(imageElement);

	return imageWrapper;
  }


  #arrowClickHandler = (evt) => {
	const targetElement = evt.target;

	if (targetElement.getAttribute('data-item') === arrowClickEvent.Back) {
		// for (let index = 0; index < this.#elementsCount; index++) {
		// 	console.log(this.#contentBlock.children[index]);
		// }
		this.#arrowRight.classList.remove(`${styles.arrow_disabled}`);

		this.#currentVisibleElement.classList.add('display_none');
		this.#currentVisibleElement = this.#contentBlock.children[this.#currentNumberVisibleElement - 1];
		this.#currentVisibleElement.classList.remove('display_none');
		if (this.#currentNumberVisibleElement === 1) {
			this.#arrowLeft.classList.toggle(`${styles.arrow_disabled}`);
		}
		this.#currentNumberVisibleElement -= 1;
	}
	if (targetElement.getAttribute('data-item') === arrowClickEvent.Forward) {
		// for (let index = 0; index < this.#elementsCount; index++) {
		// 	console.log(this.#contentBlock.children[index]);
		// }
		this.#arrowLeft.classList.remove(`${styles.arrow_disabled}`);

		this.#currentVisibleElement.classList.add('display_none');
		this.#currentVisibleElement = this.#contentBlock.children[this.#currentNumberVisibleElement + 1];
		this.#currentVisibleElement.classList.remove('display_none');
		if (this.#currentNumberVisibleElement === this.#elementsCount - 2) {
			this.#arrowRight.classList.toggle(`${styles.arrow_disabled}`);
		}
		this.#currentNumberVisibleElement += 1;
	}

	console.log(this.#currentNumberVisibleElement);
  };

  #imageContentClickHandler = (evt) => {
	if (!evt.target.closest(`.${styles.image}`)) {
		return;
	}
	const cloneImage = this.#currentVisibleElement.cloneNode(true);
	this.#fullScreenImageBlock.appendChild(cloneImage);
	this.#fullScreenImageBlock.appendChild(this.#closeFullScreenImageBlockButton);
	document.querySelector('html').style.overflow = 'hidden';
	document.querySelector('body').appendChild(this.#fullScreenImageBlock);
  };

  #closeFullScreenImageClickHandler = () => {
	this.#fullScreenImageBlock.innerHTML = '';
	document.querySelector('html').style.overflow = 'auto';
	document.querySelector('body').removeChild(this.#fullScreenImageBlock);
  };

  #contentBlockMouseMoveHandler = (evt) => {
	console.log(evt);
  };

  constructor (container, data, options) {
	this.#options = options;
	typeof container === 'string' ? (this.#container = document.querySelector(container)) : (this.#container = container);
	this.#dataArray = data;

	this.#fullScreenImageBlock = document.createElement('div');
	this.#closeFullScreenImageBlockButton = document.createElement('img');
	this.#fullScreenImageBlock.setAttribute('class', `${styles.full_screen_block}`);
	this.#closeFullScreenImageBlockButton.setAttribute('class', `${styles.close_full_screen_button}`);
	if (this.#options !== null && this.#options.nextjs) {
		this.#closeFullScreenImageBlockButton.setAttribute('src', closeButtonSvg.default.src);
	} else {
		this.#closeFullScreenImageBlockButton.setAttribute('src', closeButtonSvg);
	}
	this.#closeFullScreenImageBlockButton.setAttribute('alt','Крестик выхода');
	this.#closeFullScreenImageBlockButton.addEventListener('click', this.#closeFullScreenImageClickHandler);

	window.addEventListener('resize', this.#swiperBlockResizeHandler);
	

	this.#swiperBLock = document.createElement('div');
	this.#swiperBLock.setAttribute('class', `${styles.swiper}`);
	this.#container.innerHTML = '';
	this.#container.appendChild(this.#swiperBLock);

	this.#arrowLeft = document.createElement('div');
	this.#arrowLeft.setAttribute('class', `${styles.arrow_left} ${styles.arrow_disabled}`);
	this.#arrowLeft.setAttribute('data-item', `${arrowClickEvent.Back}`);
	this.#arrowLeft.addEventListener('click', this.#arrowClickHandler);
	this.#swiperBLock.appendChild(this.#arrowLeft);

	this.#contentBlock = document.createElement('div');
	this.#contentBlock.classList.add(`${styles.content_block}`);
	this.#contentBlock.addEventListener('click', this.#imageContentClickHandler);
	this.#contentBlock.addEventListener('mousemove', this.#contentBlockMouseMoveHandler);
	this.#swiperBLock.appendChild(this.#contentBlock);

	this.#contentWrapper = document.createElement('div');
	this.#contentWrapper.setAttribute('class', `${styles.content_wrapper}`);
	this.#contentBlock.appendChild(this.#contentWrapper);

	this.#arrowRight = document.createElement('div');
	this.#arrowRight.setAttribute('class', `${styles.arrow_right}`);
	this.#arrowRight.setAttribute('data-item', `${arrowClickEvent.Forward}`);
	this.#arrowRight.addEventListener('click', this.#arrowClickHandler);
	this.#swiperBLock.appendChild(this.#arrowRight);

	const containerItems = new DocumentFragment();

	if (this.#options !== null && this.#options.nextjs) {
		for (const key in data) {
		  containerItems.append(this.#renderImageItem(data[key].default.src));
		}
	} else {
		for (const key in data) {
		  containerItems.appendChild(this.#renderImageItem(data[key]));
		}
	}

	// this.#currentVisibleElement = containerItems.firstElementChild;
	// this.#currentVisibleElement.classList.remove('display_none');

	this.#contentWrapper.appendChild(containerItems);

	this.#elementsCount = Number(this.#contentWrapper.children.length);
	this.#currentNumberVisibleElement = 0;

	// допы

	const parentBlockRect = this.#contentBlock.getBoundingClientRect();
	this.#widthContentBlock = parentBlockRect.width;
	this.#heightContentBlock = parentBlockRect.height;
	this.#contentWrapper.style.width = `${this.#widthContentBlock * this.#elementsCount}px`;
	this.#contentWrapper.style.height = `${this.#heightContentBlock}px`;

	// console.log(window.getComputedStyle(this.#contentBlock).gap);

	//----

	
  }



}