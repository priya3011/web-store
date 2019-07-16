import data from '../../../data/categories';
class MenuListService {
    constructor() {}
    
    getMenuData(){
        let categories = data.map(c => {
            return c['Category'];
        });
        return {
            items: categories
        }
    }
}

MenuListService.$inject = [];

export default MenuListService;
