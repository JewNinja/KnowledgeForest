import {observable, computed, autorun, reaction, get, action, makeAutoObservable} from 'mobx';
import optionsStore from "./optionsStore";
import AppStore from "./appStore";


class mainStore {
  constructor() {
    // Инициализация дочерних хранилищ
    this.AppStore = new AppStore();       
    
    this.listenerBlocks = {};

    // autorun(() => {     
    //     this.fillBlocks();         
    // });

    makeAutoObservable(this);
  }

//   componentsMap = {
//     userData : [
//         ["name", "fio"],           
//         ["surname", "fio"], 
//         ["email", "email"], 
//         ["send_data", "button"]
//     ]
//   };
  
  // Коллекции компонентов для работы listener'ов различных stores
  // listenerBlocks = {};

  /**
   * Заполнение коллекций компонентов
   */
//   fillBlocks() {
//       for (let i in this.componentsMap) {
//           const pageBlock = this.componentsMap[i];
//           // преобразуем в объект типов компонентов (key) с массивами их имён (value)
//           const blocks = {};
//           pageBlock.forEach((item, i) => {
//               const _name = item[0];
//               const _type = item[1];
//               if (!blocks[_type]) {
//                   blocks[_type] = [_name]
//               } else {
//                   blocks[_type].push(_name)
//               }                
//           })
//           this.listenerBlocks[i] = blocks;
//       }      
//   };


}

export default new mainStore();