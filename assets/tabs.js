class Tabs extends HTMLElement {
  constructor() {
    super();
    this.tabsTitle = this.querySelectorAll('tab-title');
    this.tabsContent = this.querySelectorAll('tab-content');
    this.tabContentActive = this.querySelectorAll('tab-content[active]');
  }

  connectedCallback() {
    console.log('tabs connected');
    console.log('Tab Active', this.tabContentActive[0]);

    this.initializeSwiper(this.tabContentActive[0]);
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

  initializeSwiper(tabContent) {
    // Busca el contenedor de Swiper dentro del `tabContent` activo
    const swiperEl = tabContent.querySelector('.collection-block .swiper');

    if (!swiperEl) {
      console.error('Swiper container not found in the DOM');
      return;
    }

    const slides = swiperEl.querySelectorAll('.swiper-slide');
    const totalSlides = slides.length;

    const swiperParams = {
      slidesPerView: Math.min(totalSlides, 5),
      slidesPerGroup: Math.min(totalSlides, 1),
      loop: false, // Deshabilita el modo loop
      mousewheel: {
        forceToAxis: true,
      },
      direction: 'horizontal',
      spaceBetween: 30,
      navigation: {
        nextEl: swiperEl.querySelector('.swiper-button-next'),
        prevEl: swiperEl.querySelector('.swiper-button-prev'),
      },
      pagination: false,
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        320: {
          slidesPerView: Math.min(totalSlides, 1),
          spaceBetween: 20,
        },
        640: {
          slidesPerView: Math.min(totalSlides, 2),
          spaceBetween: 20,
        },
        768: {
          slidesPerView: Math.min(totalSlides, 4),
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: Math.min(totalSlides, 5),
          spaceBetween: 50,
        },
      },
    };

    // Inicializa Swiper

    new window.Swiper(swiperEl, swiperParams);
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
      this.tabsComponent.initializeSwiper(tabContent);
    });
  }
}

class TabContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}
}

customElements.define('tabs-component', Tabs);
customElements.define('tab-title', TabTitle);
customElements.define('tab-content', TabContent);
