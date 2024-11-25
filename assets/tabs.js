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
    this.addEventListener('click', () => {
      // agregat atributo active al elemento y al contenido
      this.tabsComponent.removeTitleActive();
      this.setAttribute('active', '');

      //acceder al contenido y agregarle el atributo active
      this.tabsComponent.removeContentActive();
      const index = this.getAttribute('index');
      console.log(index);
      this.tabsComponent.tabsContent[index - 1].setAttribute('active', '');
    });
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
