import React from 'react';

// 库名
const packageName = 'memo-router';
const RouteContext = React.createContext();
const isHaveWindow = typeof window !== 'undefined';

// 基础state结构
const baseState = {
  path: undefined,
  lastPath: undefined,
  params: {},
  needRemove: false,
  animate: true,
  isDoingGoback: false,
};

// 多组件同渲染时的连接符
let SPACE = '&&';
export function setSpace(str) {
  SPACE = str;
}

// hash定位符，默认为空
let HASH = '';
export function setHash(str) {
  HASH = str;
}

// 导航器是否已经绑定dispatch
let isHistoryBindDispatch = false;

// 导航器
export const history = {
  useContext: () => {
    return React.useContext(RouteContext);
  },
  // 前往一个路径，如果曾经去过，则跳转到去过的路径
  push: action => {
    reducer(history, action);
  },
  setDefaultPath: (uri, focus) => {
    if (isHaveWindow && (focus || window.location.pathname === '/')) {
      history.push(uri);
    }
  },
  canGoback: path => {
    path = path || history.state.lastPath;
    if (!path) {
      return false;
    }
    return history.stateMap[path];
  },
  isPathAtTop: (path, checkPath) => {
    const topPath = checkPath || history.state.path;
    if (!topPath) {
      return false;
    }
    if (topPath.indexOf(SPACE) > -1) {
      const paths = topPath.split(SPACE);
      for (let i = 0; i < paths.length; i++) {
        if (path === paths[i]) {
          return true;
        }
      }
      return false;
    }
    return topPath === path;
  },
  isPathInStateMap: path => {
    for (const k in history.stateMap) {
      const list = k.split(SPACE);
      for (let i = 0; i < list.length; i++) {
        if (path === list[i]) {
          return true;
        }
      }
    }
    return false;
  },
  goback: (path, needRemove = true) => {
    const gobackPath = path || history.state.lastPath;
    const isCanGoback = history.canGoback(gobackPath);
    if (isCanGoback) {
      history.state.needRemove = needRemove;
      let nextState = { ...history.state };
      // 计算goback, 如果goback指定路径，会清理中间的历史
      function getNextState(dState, dStateMap) {
        if (dState.needRemove && dStateMap[dState.path]) {
          delete dStateMap[dState.path];
        }
        if (!dState.lastPath) {
          nextState = dState;
          return;
        }
        const lastState = dStateMap[dState.lastPath];
        if (lastState && lastState.path !== gobackPath) {
          getNextState(lastState, dStateMap);
        }
        nextState = lastState;
      }
      getNextState(nextState, history.stateMap);
      nextState.isDoingGoback = true;
      history.push(nextState);
    } else {
      console.error("[Error-Route] is can't goback");
    }
  },
  state: { ...baseState, path: '/' },
  stateMap: { '/': { ...baseState, path: '/' } },
};

// 当push执行时的减速器
function reducer(data, action) {
  if (typeof action === 'string') {
    action = { ...baseState, path: action };
  } else {
    action = { ...baseState, ...action };
  }
  if (action.path) {
    if (!action.isDoingGoback) {
      action.lastPath = history.state.path;
    }
    const state = { ...action };
    const stateMap = { ...history.stateMap, [action.path]: state };
    data = { stateMap, state };
  }
  history.state = { ...data.state };
  history.stateMap = { ...data.stateMap };
  if (isHaveWindow) {
    window.history.pushState({}, document.title, HASH + data.state.path);
  }
  return data;
}

export function Routers(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    state: history.state,
    stateMap: history.stateMap,
  });
  if (!isHistoryBindDispatch) {
    isHistoryBindDispatch = true;
    history.push = dispatch;
  }
  return React.useCallback(<RouteContext.Provider {...props} value={state} />, [state]);
}

export function Route(props) {
  const { style, ...rest } = props;
  const [isRenderChildren, setIsRenderChildren] = React.useState(0);
  const context = React.useContext(RouteContext);
  const isDisplay = history.isPathAtTop(props.path);
  React.useEffect(
    () => {
      if (isDisplay && !isRenderChildren) {
        setIsRenderChildren(isRenderChildren + 1);
      } else if (!history.isPathInStateMap(props.path)) {
        if (props.delayRemove) {
          setTimeout(() => {
            setIsRenderChildren(0);
          }, props.delayRemove);
        } else {
          setIsRenderChildren(0);
        }
      }
    },
    [isDisplay]
  );
  function render() {
    if (!isRenderChildren) {
      return null;
    }
    return <Container isDisplay={isDisplay} style={style} {...rest} />;
  }
  return React.useMemo(render, [isRenderChildren, isDisplay]);
}

// 设置默认容器，以实现切换路由时的组件显示
let Container;
if (isHaveWindow) {
  Container = function({ path, isDisplay, style, ...rest }) {
    return <div style={{
      display: isDisplay ? 'inline' : 'none',
      pointEvents: isDisplay ? 'auto' : 'none',
      ...style,
    }} {...rest} />;
  };
} else {
  // 如果在ReactNative等非浏览器的环境, 需要用户主动设定一个容器组件
  Container = function() {
    throw new Error(`
      [${packageName}] If not in Browser, You need set default containner:
      setContainner(({isDisplay, ...rest})=>{
        return <YourComponent isShowComponent={isDisplay} {...rest} ...
      })
    `);
  };
}
export function setContainer(fn) {
  Container = fn;
}

// 根据路径初始化默认路由
if (isHaveWindow && window.location.pathname !== '/') {
  const search = window.location.search;
  const pathname = window.location.pathname;
  const params = {};
  if (search.indexOf('?') === 0) {
    // 解析params
    const data = search.split('?')[1];
    const dataList = data.split('&');
    for (let i = 0; i < dataList.length; i++) {
      const ele = dataList[i];
      const [k, v] = ele.split('=');
      params[k] = v;
    }
  }
  history.push({ path: pathname, params });
}
