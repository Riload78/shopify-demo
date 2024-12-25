class RelatedCollections extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.relatedCollections = []; // Aquí se almacenan los datos procesados
  }

  connectedCallback() {
    // Obtener los atributos configurados en el HTML
    const rawGids = this.getAttribute('data-gids');
    if (!rawGids) {
      this.renderError('No collection IDs provided.');
      return;
    }

    // Convertir los GIDs en un array
    // const gids = JSON.parse(rawGids);

    // Llamar a la API para obtener datos de las colecciones
    this.fetchCollectionData(rawGids)
      .then((data) => {
        this.relatedCollections = data;
        this.render();
      })
      .catch((error) => {
        console.error(error);
        this.renderError('Failed to fetch collection data.');
      });
  }

  async fetchCollectionData(rawGids) {
    // Llama a tu backend para convertir los GIDs en datos utilizables
    const response = await fetch('/api/get-collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rawGids }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch collection data');
    }

    return response.json(); // Devuelve un array con los datos de las colecciones
  }

  render() {
    // Renderizar las colecciones en el Web Component
    const html = this.relatedCollections
      .map(
        (collection) => `
          <div class="collection">
            <h2>${collection.title}</h2>
            <p>${collection.description}</p>
            <a href="${collection.url}">View Collection</a>
          </div>
        `
      )
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        .collection {
          margin-bottom: 1rem;
        }
      </style>
      <div class="collections">
        ${html}
      </div>
    `;
  }

  renderError(message) {
    this.shadowRoot.innerHTML = `<p>${message}</p>`;
  }
}

// Registrar el Web Component
customElements.define('related-collections', RelatedCollections);
