export class Section {
    constructor(renderer, containerSelector) {
        this._dataRenderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems(arrCard) {
        arrCard.forEach(card => {
            this._dataRenderer(card);
        });
    }

    addItem(cardTemplate) {
        this._containerSelector.prepend(cardTemplate)
    }
}