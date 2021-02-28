import SQLite from 'react-native-sqlite-storage';

export default function(sql) {
  function openCB() { console.log("Database OPENED") }
  function errorCB(err) { console.log("SQL Error: " + err.message + ' - code: ' + err.code) }
  
  let db = SQLite.openDatabase({ name: 'db' }, openCB, errorCB);
  debugger
  return new Promise((resolve, reject) => db.transaction((tx) => {
    tx.executeSql(sql, [], (tx, res) => {
      // debugger
      console.log("Query completed");
      return resolve(res)
    }, reject);
  }));
}
