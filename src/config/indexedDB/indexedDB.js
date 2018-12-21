// 封装数据库的打开新建、添加一条记录等方法
import { Message } from 'element-ui';

let defaultDatabaseInfo = {
  name: 'browserNotesDatabase',
  version: 1,
  notesTable: {
    name: 'tempNotes',
    keyPath: 'noteID',
  },
};

/**
 * @description: 打开（或新建）数据库的方法
 * @param: 欲创建或打开的数据库的信息，databaseInfo = { name: , version: , notesTable: { name: , keyPath: , }, }
 * @return: Promise: 其中的resolve包含一个对象，对象中含有对数据库的引用及其他一些信息
 * @author: FY
 * @date: 2018-12-11
*/
export function OpenOrCreateAnIndexedDB(databaseInfo = defaultDatabaseInfo) {

  // 使用Promise，对应不同数据库处理情况，返回resolve和reject
  return new Promise(function (resolve, reject) {

    // 检测当前用户浏览器是否支持indexedDB
    let checkIndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!checkIndexedDB) {
      Message({
        message: '您当前的浏览器不支持IndexedDB，因此无法使用【暂时存储笔记】功能',
        type: 'error',
        duration: 0,
        showClose: true,
      });
      reject('您当前的浏览器不支持IndexedDB');
    }

    // 创建一个对象，保存数据库的名称、版本和引用、数据表的名字，在整个函数执行完毕后返回
    let returnedDatabase = {
      name: databaseInfo.name || 'browserNotesDatabase',
      version: databaseInfo.version || 1,
      database: null,
      notesTable: databaseInfo.notesTable || {
        name: 'tempNotes',
        keyPath: 'noteID',
      },
    };

    // 新建或打开数据库browserNotesDatabase（如果是新建，则在其中建立一个tempNotes的表格）
    let request = window.indexedDB.open(returnedDatabase.name, returnedDatabase.version);

    // 新建或打开出错：
    request.onerror = function (event) {
      Message({
        message: '数据库打开出错，错误代码：' + event.target.errorCode,
        type: 'error',
        duration: 0,
        showClose: true,
      });
      reject('数据库打开出错');
    };

    // 数据库版本有变化(新建或手动升级)：
    request.onupgradeneeded = function (event) {
      returnedDatabase.database = event.target.result;
      // 如果数据库中不存在数据表，则创建数据表：
      if (!returnedDatabase.database.objectStoreNames.contains(returnedDatabase.notesTable.name)) {
        // 使用noteID作为自增的主键
        let objectStore = returnedDatabase.database.createObjectStore(returnedDatabase.notesTable.name, { keyPath: returnedDatabase.notesTable.keyPath, autoIncrement: true });
        // 建立索引通过笔记标题搜索，允许重复
        objectStore.createIndex('title', 'title', { unique: false });
      }
      Message({
        message: '数据库版本变更成功！当前版本为：' + returnedDatabase.version,
        type: 'success',
        duration: 3000,
        showClose: true,
      });
      // 如果onupgradeneeded事件成功执行完成，打开数据库请求的onsuccess处理函数会被触发，因此后续的操作不在这里进行
    };

    // 打开成功或新建成功后：
    request.onsuccess = function (event) {
      returnedDatabase.database = event.target.result;
      Message({
        message: '成功连接至数据库！',
        type: 'success',
        duration: 3000,
        showClose: true,
      });
      resolve(returnedDatabase);
    };

  });

}

/**
 * @description: 向一个已经打开的数据库中增加一条记录
 * @param: 一个存储笔记的对象，noteDetail = { title: , author: , tags: , noteContent: }
 *         一个存储了数据库信息的对象，databaseInfo = { name: , version: , database: , notesTable: { name: , keyPath: , }, }
 * @return: Promise
 * @author: FY
 * @date: 2018-12-11
*/
export function addARecordToAnIndexedDB(noteDetail, databaseInfo = defaultDatabaseInfo) {

  return new Promise(function (resolve, reject) {
    if (!databaseInfo || !databaseInfo.database) {
      Message({
        message: '在提交记录前请先打开数据库！',
        type: 'warning',
        duration: 10000,
        showClose: true,
      });
      reject('数据库没打开');
    } else {
      let transaction = databaseInfo.database.transaction([databaseInfo.notesTable.name], 'readwrite');
      let objectStore = transaction.objectStore(databaseInfo.notesTable.name);
      objectStore.add({
        title: noteDetail.title,
        author: noteDetail.author,
        tags: noteDetail.tags,
        noteContent: noteDetail.noteContent,
      });
      transaction.oncomplete = function (event) {
        Message({
          message: '笔记保存成功!',
          type: 'success',
          duration: 3000,
          showClose: true,
        });
        resolve('笔记保存成功');
      };
      transaction.onerror = function (event) {
        Message({
          message: '笔记保存失败!',
          type: 'error',
          duration: 10000,
          showClose: true,
        });
        reject('笔记保存失败');
      };
    }
  });


}

/**
 * @description: 通过自增的主键noteID来获取一条笔记
 * @param: 一个key
 *         一个存储了数据库信息的对象，databaseInfo = { name: , version: , database: , notesTable: { name: , keyPath: , }, }
 * @return: Promise
 * @author: FY
 * @date: 2018-12-11
*/
export function getARecordThroughKey(key, databaseInfo = defaultDatabaseInfo) {

  return new Promise(function (resolve, reject) {
    if (!databaseInfo || !databaseInfo.database) {
      Message({
        message: '在查询记录前请先打开数据库！',
        type: 'warning',
        duration: 10000,
        showClose: true,
      });
      reject('在查询记录前请先打开数据库！');
    } else {
      let transaction = databaseInfo.database.transaction([databaseInfo.notesTable.name]);
      let objectStore = transaction.objectStore(databaseInfo.notesTable.name);
      let request = objectStore.get(key);
      request.onerror = function(event) {
        reject('GET时出错，错误代码为：' + event.target.errorCode);
      };
      request.onsuccess = function(event) {
        resolve(event.target.result);
      };
    }
  });

}

/**
 * @description: 根据传入的主键noteID以及数量n，获取从主键noteID开始的n条数据
 * @param: 一个key，一个n
 *         一个存储了数据库信息的对象，databaseInfo = { name: , version: , database: , notesTable: { name: , keyPath: , }, }
 * @return: Promise
 * @author: FY
 * @date: 2018-12-12
*/
export function getNRecordsThroughKey(key, n, databaseInfo = defaultDatabaseInfo) {

  return new Promise(function (resolve, reject) {
    if (!databaseInfo || !databaseInfo.database) {
      Message({
        message: '在查询记录前请先打开数据库！',
        type: 'warning',
        duration: 10000,
        showClose: true,
      });
      reject('在查询记录前请先打开数据库！');
    } else {
      let transaction = databaseInfo.database.transaction([databaseInfo.notesTable.name]);
      let objectStore = transaction.objectStore(databaseInfo.notesTable.name);
      let boundKeyRange = IDBKeyRange.bound(key, key + n - 1);
      let returnedArray = [];
      objectStore.openCursor(boundKeyRange).onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
          returnedArray.push({
            IDBKey: cursor.key,
            IDBValue: cursor.value
          });
          cursor.continue();
        }
        else {
          Message({
            message: '成功从数据库中取出数据！',
            type: 'success',
            duration: 3000,
            showClose: true,
          });
          resolve(returnedArray);
        }
      };
    }
  });

}

/**
 * @description: 获取数据库中的记录数
 * @param: 一个存储了数据库信息的对象，databaseInfo = { name: , version: , database: , notesTable: { name: , keyPath: , }, }
 * @return: Promise
 * @author: FY
 * @date: 2018-12-13
*/
export function getRecordNumber(databaseInfo = defaultDatabaseInfo) {

  return new Promise(function (resolve, reject) {
    if (!databaseInfo || !databaseInfo.database) {
      Message({
        message: '在查询所有记录数量前请先打开数据库！',
        type: 'warning',
        duration: 10000,
        showClose: true,
      });
      reject('在查询所有记录数量前请先打开数据库！');
    } else {
      let transaction = databaseInfo.database.transaction([databaseInfo.notesTable.name]);
      let objectStore = transaction.objectStore(databaseInfo.notesTable.name);
      let returnedCounter = 0;
      objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
          returnedCounter++;
          cursor.continue();
        }
        else {
          resolve(returnedCounter);
        }
      };
    }
  });

}

/**
 * @description: 关闭一个已经打开的数据库
 * @param: 一个存储了数据库信息的对象，databaseInfo = { name: , version: , database: , notesTable: { name: , keyPath: , }, }
 * @return:
 * @author: FY
 * @date: 2018-12-14
*/
export function closeAnOpenDatabase(databaseInfo = defaultDatabaseInfo) {

  if (!databaseInfo || !databaseInfo.database) {
    // Message({
    //   message: '在关闭数据库前请先打开一个数据库！',
    //   type: 'warning',
    //   duration: 10000,
    //   showClose: true,
    // });
  } else {
    databaseInfo.database.close();
    Message({
      message: '成功关闭数据库！',
      type: 'success',
      duration: 3000,
      showClose: true,
    });
  }

}