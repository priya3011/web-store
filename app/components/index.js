import angular from 'angular';
import MenuList from './menu-list';

import BottomFooter from './bottom-footer';

const Components = angular
  .module('app.components', [
    MenuList,
    BottomFooter
  ])
  .name;

export default Components;
