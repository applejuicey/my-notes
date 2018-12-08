import packedAxios from './axios';

// 用来存储所有api
let apiDictionary = {
  getNoteTitleLinkArray: 'https://easy-mock.com/mock/5bebe7bc3e54131e11d49398/mynotesdev/api/getNoteTitleLinkArray',
  getNote: 'https://easy-mock.com/mock/5bebe7bc3e54131e11d49398/mynotesdev/api/getNote',
};

// 供组件contentCard获取数据使用
export function contentCardAPIService(category) {
  return packedAxios.get(apiDictionary.getNoteTitleLinkArray, {
    params: {
      category: category,
    },
  })
}

// 供组件noteRenderer获取数据使用
export function noteRendererAPIService(noteID) {
  return packedAxios.get(apiDictionary.getNote, {
    params: {
      noteID: noteID,
    },
  })
}
