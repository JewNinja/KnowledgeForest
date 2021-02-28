import {action, observable, get, set, makeAutoObservable, autorun, configure} from 'mobx';
import db from '../helpers/dbHandler'

configure({ enforceActions: 'observed' })

const booleanSettings = ['isPlayingForTime', 'isWithExtraTime']


export default class appStore {
  constructor() {
    this.isInit = false;

    // TODO: может всё таки в null?
    this.gameMode = null;
    this.wherewith = 'picture';
    this.what = 'word';
    this.isPlayingForTime = false;
    this.isWithExtraTime = false;
    this.guessesAmount = 4;

    autorun(() => {     
        this.initializeApp();         
    });

    makeAutoObservable(this);
  }

  async initializeApp() {   
    debugger
    await db('SELECT * FROM settings').then(res => {
      debugger
      res?.rows?.raw().forEach(setting => {
        if (booleanSettings.includes(setting.setting)) {
          this[setting.setting] = !!setting.value
        } else {
          this[setting.setting] = setting.value
        }       
      })
      this.setNewSettings({ isInit: true })
    }).catch(err => {
      console.log(err);

      if (err.message.startsWith('no such table')) {
        db(`CREATE TABLE "settings" (
          "setting"	TEXT NOT NULL UNIQUE,
          "value"	INTEGER DEFAULT null
        )`)
        .then(res => { this.setNewSettings({ isInit: true }) })
        .catch(err => { console.log(err) })
      } else {
        this.setNewSettings({ isInit: true })
      }
    })
  }

  setNewSettings(newSettings, updateDB, callback) {
    Object.entries(newSettings).forEach(setting => {
      this[setting[0]] = setting[1]
    })

    // TODO: дописать отправку gameMode
    if(updateDB) {
      db(`INSERT
            OR REPLACE
          INTO
            settings (setting, value)
          VALUES
            ('wherewith', '${newSettings.wherewith}'),
            ('what', '${newSettings.what}'),
            ('isPlayingForTime', ${newSettings.isPlayingForTime}),
            ('isWithExtraTime', ${newSettings.isWithExtraTime}),
            ('guessesAmount', ${newSettings.guessesAmount})
      `)
      
        .then(res => { if (callback) callback() })
        .catch(err => { console.log(err) })
    }
        
    // this.gameMode = [newSettings];   //'PWFF4'
  }
}