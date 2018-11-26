import * as React from 'react';

interface IStore {
  useContext: Function;
  dispatch: Function;
  state: Object;
  initalState: Object;
  actions: Object;
}

interface IParams {
  path: Boolean;
}

interface IHistory {
  useContext:()=>Object;
  push:(path:String)=>void;
  setDefaultPath: (path:String, focus?:boolean) => void;
  canGoback:(path?:string) => boolean;
  isPathAtTop: (path:String, checkPath?:string) => boolean;
  isPathInStateMap: (path:String)=> boolean;
  goback:(path?:string, needRemove?:boolean)=>void;
  state: {
    path:string,
    lastPath:string,
    params:Object,
    animate:boolean,
    isDoingGoback:boolean,
  },
  stateMap:Object,
}

declare function Routers(): any;
declare function Route(params: IParams): any;
declare function setSpace(space:String): any;
declare function setHash(hash:String): any;
declare const history:IHistory;