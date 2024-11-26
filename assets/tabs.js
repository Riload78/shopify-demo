class Tabs extends HTMLElement {
  constructor() {
    super();
    this.tabsTitle = this.querySelectorAll('tab-title');
    this.tabsContent = this.querySelectorAll('tab-content');
  }

  connectedCallback() {
    console.log('tabs connected');
  }

  removeTitleActive() {
    this.tabsTitle.forEach((tabTitle) => {
      tabTitle.removeAttribute('active');
    });
  }

  removeContentActive() {
    this.tabsContent.forEach((tabContent) => {
      tabContent.removeAttribute('active');
    });
  }
}

class TabTitle extends HTMLElement {
  constructor() {
    super();
    this.tabsComponent = this.closest('tabs-component');
  }

  connectedCallback() {
    this.addEventListener('click', async () => {
      // agregat atributo active al elemento y al contenido
      this.tabsComponent.removeTitleActive();
      this.setAttribute('active', '');

      //acceder al contenido y agregarle el atributo active
      this.tabsComponent.removeContentActive();
      const index = this.getAttribute('index');
      // this.tabsComponent.tabsContent[index - 1].setAttribute('active', '');
      const tabContent = this.tabsComponent.tabsContent[index - 1];
      tabContent.setAttribute('active', '');
      this.initializeSwiper(tabContent);
    });
  }
  initializeSwiper(tabContent) {
    console.log(window.Swiper);
    // Busca el contenedor de Swiper dentro del `tabContent` activo
    const swiperEl = tabContent.querySelector('.collection-block .swiper');
    console.log(swiperEl);
    if (!swiperEl) {
      console.error('Swiper container not found in the DOM');
      return;
    }

    const swiperParams = {
      slidesPerView: 5,
      slidesPerGroup: 1,
      mousewheel: {
        forceToAxis: true,
      },
      direction: 'horizontal',
      spaceBetween: 30,
      grabCursor: true,
      navigation: {
        nextEl: swiperEl.querySelector('.swiper-button-next'),
        prevEl: swiperEl.querySelector('.swiper-button-prev'),
      },
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      },
    };

    // Inicializa Swiper

    new window.Swiper(swiperEl, swiperParams);
  }
}

class TabContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log('tab content connected');
  }
}

customElements.define('tabs-component', Tabs);
customElements.define('tab-title', TabTitle);
customElements.define('tab-content', TabContent);
