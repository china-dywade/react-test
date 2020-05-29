import React, { memo, useMemo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Layout } from 'antd';
import './style.css';
import { connect } from 'react-redux';
import header from '../Header';
import footer from '../Footer'
import SettingData from '../SettingData'
import Menu from '../Menu';
import { Button,  Modal ,Tooltip, Badge  } from 'antd';
import { CopyOutlined, ExclamationCircleOutlined, NodeCollapseOutlined } from '@ant-design/icons';
import { log } from 'util';

const { Header, Footer, Sider, Content } = Layout;
const { confirm } = Modal;
export interface Props {
  isPriview: boolean;
  currentSelectComponent: any[];
  menu: any[]; // 左侧菜单列表
  addComponentToList?(data: any[]): any; //ADD component tO List
  isPriviewCallBack?(type: boolean): any;
  componentList: any[];
  setOptions: any;
  addCurrentSelectListCallBack?(data: any[]): any[];
  setOpt?(data: any): any;
  children: any;
}


export interface State {
  collapsed: boolean;
  settingData: any;
  obj:any;
}

class Home extends React.Component<Props, State>{
  myRef:any = [];
  public state: State = {
    collapsed: false,
    settingData: null,
    obj:{}
  };
  reorder:any;


  public onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };
  public showConfirm = (item:any)=> {
    let _this = this;
    confirm({
      title: '提示',
      centered:true,
      icon: <ExclamationCircleOutlined />,
      content: '您确定要删除组件？',
      cancelText:'取消',
      okText:'确认',
      onOk() {
        let index:any;
        let arr = [..._this.props.componentList];
        arr.map((com, inx) => {
          if (com.fId == item.fId) {
            index = inx;
            return;
          }
        })
   
          console.log(index,'index');
          
        if (index != 'undefined') {
          arr.splice(index, 1)
          _this.props.addCurrentSelectListCallBack && _this.props.addCurrentSelectListCallBack([]);
          _this.props.addComponentToList && _this.props.addComponentToList(arr);
          _this.editoAndPriviewHandler(false);
        }

      },
      onCancel() { },
    });
  }

  mounted = (index:number) => {
  setTimeout(() => {
    let a = this.myRef[index].getIntance();
    this.setState({
      settingData: null
    },()=>{
        this.setState({
          settingData: { ...a }
        })
    })
    }, 0);
  }



  // 添加组件
  public addCompontHandler = (item: any, inx?: any, str?:any) => {
    
    let currentArr = [];
    let arr = [...this.props.componentList];
    item = JSON.parse(JSON.stringify(item));
    item.fId = Math.random().toString(32).substr(2).padStart(12, "abcd");
    if (inx != undefined && str != undefined ){

      if (str == "before"){    
        let  [remove] = arr.splice(inx, 1);
        if (inx - 1 <= 0){    
          arr.splice(inx, 0, item);
        }else{
          arr.splice(inx, 0, item);
        }    
          arr.splice(inx + 1, 0, remove);
        
        
      }else{
        arr.splice(inx + 1 >= arr.length  ? arr.length : inx + 1, 0, item);
      }
    }else{
      arr.push(item);
    }
    arr.map((ele) => {
      ele.checked = false;
    })
    item.checked = true;
    currentArr.push(item);
    this.props.addCurrentSelectListCallBack && this.props.addCurrentSelectListCallBack(currentArr);
    this.props.addComponentToList && this.props.addComponentToList(arr);
    this.editoAndPriviewHandler(false);
    this.setState({
      settingData: null
    })
  }

  // 编辑 预览 点击事件
  public editoAndPriviewHandler = (type: boolean): void => {
    this.props.isPriviewCallBack && this.props.isPriviewCallBack(type);
  }

  // 保存
  public save = () => {
    let { isPriview, componentList, currentSelectComponent, menu } = this.props;
    isPriview = false;
    componentList.map((ele) => {
      ele.checked = false;
    })
    let obj = {
      isPriview,
      componentList,
      menu,
      currentSelectComponent
    }
    localStorage.removeItem("jzData");
    localStorage.setItem("jzData", JSON.stringify(obj));
  }

  //  组件点击事件
  public componentClick = (item: any, index: number) => {
    let a = this.myRef[index].getIntance()
    if (this.props.isPriview) {
      return;
    }
    let arr = [...this.props.componentList];
    arr.map((ele) => {
      ele.checked = false;
      if (ele.fId == item.fId) {
        ele.checked = true;
        return
      }
    })
    item.checked = true;
    this.props.addCurrentSelectListCallBack && this.props.addCurrentSelectListCallBack([item]);
    this.props.addComponentToList && this.props.addComponentToList(arr);
    this.setState({
      settingData:null
    },()=>{
        this.setState({
          settingData: { ...a }
        })
    })
 
  }

  // 更新设置项
  public updateSettingDatas = (index: number, data: any) => {
    let arr = [...this.props.componentList];
    arr.map((ele, inx) => {
      if (inx == index) {
        ele.settingData = JSON.parse(JSON.stringify(data));
      }
    })
    this.props.addComponentToList && this.props.addComponentToList(arr);
  }
  // 复制组件

  public copyComponent = (item:any,e:any) => {
    e.stopPropagation();
    this.addCompontHandler(item);
  }

  public onDragEnd = (result:any) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    let arr = [...this.props.componentList];
    arr.map((item)=>{
      item.checked = false;
    })
    const [remove] = arr.splice(source.index, 1);
    remove.checked = true;
    arr.splice(destination.index, 0, remove);
    this.props.addComponentToList && this.props.addComponentToList(arr);
    this.props.addCurrentSelectListCallBack && this.props.addCurrentSelectListCallBack([remove]);
    this.mounted(destination.index);
  }

  // 获取滚动条的高度
  getScrollTop = ()=> {
    var scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scroll_top = document.documentElement.scrollTop;
    }
    else if (document.body) {
      scroll_top = document.body.scrollTop;
    }
    return scroll_top;
  }



 
  closest = (el:any, selector:any) => {
      var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
      while (el) {
        if (matchesSelector.call(el, selector)) {
          break;
        }
        el = el.parentElement;
      }
      return el;
}

  mouseenter = (index:number,ev:any) => {
 
    if (ev.target.className != "component__li") {
      ev.target = this.closest(ev.target,".component__li");
      let getScrollTop = this.getScrollTop();
      let sum = ev.target.offsetTop + ev.target.offsetHeight / 2 + 74 - getScrollTop;
      let obj = {
        index: index,
        h: sum,
        e: ev.target
      }
      this.setState({
        obj
      })
    }

  
 
  }

  setData = (data:any,state:any,index:number) => {
    let obj = {
      name:data.name,
      settingCom: []
    }
    obj.settingCom = data.settingCom;
    this.setState({
      settingData: {...obj}
    })
  }
  public render() {
    let current = this.props.currentSelectComponent[0];
    return (
      <DragDropContext onDragEnd={this.onDragEnd}  >
          <Layout style={{ minHeight: '100vh' }} className="wade-container">
            {
              !this.props.isPriview ?
                <Sider style={{
                  overflow: 'auto',
                  height: '100vh',
                  width:'20%',
                  position: 'fixed',
                  left: 0,
                  top:'74px',
                  bottom:0
                }}>
                <Menu menuData={this.props.menu} toValue={this.state.obj}  addCompont={this.addCompontHandler} />
                </Sider> : <Sider ></Sider>
            }
          <Layout className="site-layout" style={{ position: 'absolute', left: '230px', width: ' calc(100% - 600px)', minWidth: '300px', minHeight: "100%", 'overflow': 'hidden' }}>
              <Header id="header__wrap">表单名称</Header>
            <Content id="wrap__list">
              <Droppable droppableId="d" type="HOME">
                    {
                      (provided, snapshot) => (                                    
                        <div className="site-layout-background  com__list"   ref={provided.innerRef}   {...provided.droppableProps} >

                          {this.props.componentList.map((comp: any, index: number): any => {
                              let Com = require(`../../components/${!this.props.isPriview ? 'EditorComponent' : 'PreviewComponent'}/${comp.url}`);
                                return(
                                  <Draggable key={comp.fId} draggableId={comp.fId} index={index}>
                                    {(provided, snapshot) => (
                                  
                                      
                                        <div                                         
                                          key={comp.fId}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          onMouseEnter={this.mouseenter.bind(this, index)}
                                          id={comp.fId} 
                                          className={comp.checked && !this.props.isPriview ? 'component__li component__actived ' : 'component__li'} 
                                          onClick={this.componentClick.bind(this, comp, index)}
                                          >
                                        <div >
                                                    <span>{index + 1}.</span>

                                                    {/* <div className={ !this.props.isPriview ?'com__motal' : ''}>
                                          
                                                    </div> */}
                                                    <div className="right" >
                                                           <Com.default data={comp} mounted={ this.mounted.bind(this,index) }  index = {index} ref={(img:any) => this.myRef[index] = img } setSettingData={this.setData} updateSettingData={this.updateSettingDatas.bind(this, index)} />
                                                    </div>
                                                    {/* 设置项 */}

                                                    {
                                                        !this.props.isPriview ? <div className={comp.checked ? 'setting__wrap setchecked' : 'setting__wrap'} >
                                                          <Tooltip placement="top" title="拖拽">
                                                            <i className="iconfont iconyidong"></i>
                                                          </Tooltip>
                                                          <Tooltip placement="top" title="逻辑">
                                                            <i className="iconfont icon-luoji"></i>
                                                          </Tooltip>
                                                          <span onClick={this.copyComponent.bind(this, comp)}>
                                                            <Tooltip placement="top" title="复制" >
                                                              <i className="iconfont iconfuzhi"></i>
                                                            </Tooltip>
                                                          </span>
                                                          <span onClick={this.showConfirm.bind(this, comp)}>
                                                            <Tooltip placement="top" title="删除">
                                                              <i className="iconfont iconshanchu1"></i>
                                                            </Tooltip>
                                                          </span>
                                                        </div>:null
                                                      }

                                                 
                                          </div>



                                        </div>
                                      )}
                                    </Draggable>
                                )
                            })
                          }               
                          {provided.placeholder}
                        </div>
                        
                      )
                    }
                
                  </Droppable>
              </Content>
              <Footer id="footer">
                 页底
                 {/* { JSON.stringify(this.props.currentSelectComponent) } */}
              </Footer>
            {
              
                <div className={current && current.checked ? 'setting__container active' : 'setting__container'}>
                {
                    this.state.settingData && <SettingData  name={ this.state.settingData.name } setCom={ [...this.state.settingData.settingCom ]} />
                }
                 
            
                </div>
               
            }  
            </Layout>
          </Layout>
     </DragDropContext>

    );


  }
}


const mapStateToProps = (state: any) => {
  return {
    menu: [...state.home.menu],
    componentList: [...state.home.componentList],
    isPriview: state.home.isPriview,
    setOptions: state.home.setOptions,
    currentSelectComponent: [...state.home.currentSelectComponent]
  }
}


const mapDispatchToProps = (dispatch: any): object => {
  return {
    addComponentToList: (data: any[]) => {
      dispatch({ type: "ADD__COMPONENT__LIST", data });
    },
    isPriviewCallBack: (val: boolean) => {
      dispatch({ type: "CHANGE__PRIVIEW__TRUE", val });
    },
    addCurrentSelectListCallBack: (data: any[]) => {
      dispatch({ type: "ADD__CURRENT__SELECT__COMPONENT", data });
    },
    setOpt: (obj: any) => {
      dispatch({ type: "SET__OPTIONS", obj });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
