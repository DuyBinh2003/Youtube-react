const reducer = (state, action) => {
    switch (action.type) {
      case 'like':
        return { 
          ...state,
          like: 1
        };
      case 'unlike':
        return { 
          ...state,
          like: 0
        };
      case 'download':
        return { 
          ...state,
          download: 1
        };
      case 'undownload':
        return { 
          ...state,
          download: 0
        };
      case 'playlist':
        return { 
          ...state,
          pos: 'add'
        };
      case 'unplaylist':
        return { 
          ...state,
          pos: 'delete'
        };
      default:
        return state;
    }
};

export default reducer