import template from './items.template.html';

const ItemsComponent = {
  bindings: {
    items: '<',
    itemsCount: '<',
    itemsIngredients: '<',
    addToCart: '&',
    removeFromCart: '&',
    addIngredientToCart: '&',
    removeIngredientFromCart: '&'
  },
  templateUrl: template
};

export default ItemsComponent;
