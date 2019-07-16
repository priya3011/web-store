import angular from 'angular';
import Cart from './cart.component';

const cart = angular
  .module('menulist.cart', [])
  .component('cart', Cart)
  .name;

export default cart;