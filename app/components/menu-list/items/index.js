import angular from 'angular';
import ItemsComponent from './items.component';

const items = angular
  .module('menulist.items', [])
  .component('items', ItemsComponent)
  .name;

export default items;
