import angular from 'angular';
import uiRouter from 'angular-ui-router';
import MenuListComponent from './menu-list.component';
import MenuListService from './menu-list.service';
import Items from './items';
import Cart from './cart';
import TopHeader from '../top-header';

const MenuList = angular
  .module('menulist', [
    uiRouter,
    Items,
    TopHeader,
    Cart
  ])
  .component('menulist', MenuListComponent)
  .service('MenuListService', MenuListService)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('menulist', {
        url: '/',
        component: 'menulist'
      })
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default MenuList;
