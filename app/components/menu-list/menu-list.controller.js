class MenuListController {
  constructor(MenuListService) {
    this.menuListService = MenuListService;
  }
  $onInit() {

    this.menu = [];
    this.cart = [];
    this.count = 0;
    this.cartOpen = false;
    this.totalItems = 0;
    this.totalPrice = 0;
    this.itemsCount = {};
    this.itemsIngredients = {};
    this.menu = this.menuListService.getMenuData();
  }

  openCart() {
    if(!this.cartOpen){
      this.cartOpen = true
    }else {
      this.cartOpen = false;
    }
    console.log(this.cartOpen);
  }

  addToLocalStorage(name, value) {
    localStorage[name] = value;
  }

  updateCart(obj, action) {
  }

  addToCart(item) {
    let existingItem = this.cart.find(i => i.ID == item.ID);
    if(existingItem){
        existingItem.cart_count += 1;
    }
    else{
        existingItem = item;
        existingItem.cart_count = 1;
        this.cart.push(existingItem);

    }

    this.totalCount();
    this.addToLocalStorage('cart', JSON.stringify(this.cart));
    console.log('Cart: ', this.cart, 'Total Count: ', this.totalItems, 'Total Price: ', this.totalPrice);
  }

  removeFromCart(item){
      let removeItemIndex = this.cart.findIndex(i => i.ID == item.ID);
      if(removeItemIndex > -1){
            if (this.cart[removeItemIndex].cart_count === 1) {
                this.cart[removeItemIndex].cart_count --;
                this.cart.splice(removeItemIndex, 1);
            }
            else {
                this.cart[removeItemIndex].cart_count --;
            }
      }
      this.totalCount();
      this.addToLocalStorage('cart', JSON.stringify(this.cart));
  }

  addIngredientToCart(itemId, ingredientId){
      let itemIndex = this.cart.findIndex(i => i.ID == itemId);
      if(itemIndex > -1){
          let ingredientIndex =  this.cart[itemIndex].Modifiers.Preps.findIndex(i => i.ID == ingredientId);
          if(ingredientIndex > -1){
              this.cart[itemIndex].Modifiers.Preps[ingredientIndex].Quantity ++;
              this.updateIngredientState(itemId, ingredientId, itemIndex, ingredientIndex);
          }
      }
      this.totalCount();
      this.addToLocalStorage('cart', JSON.stringify(this.cart));
  }

  removeIngredientFromCart(itemId, ingredientId){
      let itemIndex = this.cart.findIndex(i => i.ID == itemId);
      if(itemIndex > -1){
          let ingredientIndex =  this.cart[itemIndex].Modifiers.Preps.findIndex(i => i.ID == ingredientId);
          if(ingredientIndex > -1){
              if(this.cart[itemIndex].Modifiers.Preps[ingredientIndex].Quantity > 0){
                  this.cart[itemIndex].Modifiers.Preps[ingredientIndex].Quantity --;
              }

              this.updateIngredientState(itemId, ingredientId, itemIndex, ingredientIndex);
          }
      }

      this.totalCount();
      this.addToLocalStorage('cart', JSON.stringify(this.cart));
  }


  updateIngredientState(itemId, ingredientId, itemIndex, ingredientIndex){
      if(!this.itemsIngredients[itemId]){
          this.itemsIngredients[itemId] = {};
      }

      this.itemsIngredients[itemId][ingredientId] = {
          'quantity': this.cart[itemIndex].Modifiers.Preps[ingredientIndex].Quantity,
          'price': this.cart[itemIndex].Modifiers.Preps[ingredientIndex].Price
      }
  }


  totalCount() {
    this.totalItems = 0;
    this.totalPrice = 0;
    this.itemsCount = {};
    this.cart.map((item) => {
        this.itemsCount[item.ID] = item.cart_count;
        this.totalItems += item.cart_count;
        this.totalPrice += item.Price*item.cart_count;
    });

    Object.values(this.itemsIngredients).map(i => {
        Object.values(i).map(ingredient => {
            this.totalPrice += ingredient.price * ingredient.quantity;
        });
    });
  }

}

MenuListController.$inject = ['MenuListService'];

export default MenuListController;
