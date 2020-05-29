import React, { memo, useMemo, useCallback, useState } from 'react';
import {
  SmileOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import './style.css';
import { connect } from 'react-redux';
import header from '../Header';
import footer from '../Footer'
import Menu from '../Menu';
import { Button, Space, PageHeader} from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export interface Props {
  isPriview:boolean;
  currentSelectComponent:any[];
  menu:any[]; // 左侧菜单列表
  addComponentToList?(data:any[]):any; //ADD component tO List
  isPriviewCallBack ?(type:boolean):any;
  componentList:any[];
  setOptions:any;
  addCurrentSelectListCallBack?(data: any[]):any[];
  setOpt?(data: any[]): any[];
  children: any;
}
 

export interface State {
  collapsed:boolean;
  settingData:any;
}

class App extends React.Component<Props, State>{

  public state: State = {
    collapsed: false,
    settingData:null
  };



  // 编辑 预览 点击事件
  public editoAndPriviewHandler = (type:boolean):void => {
    this.props.isPriviewCallBack && this.props.isPriviewCallBack(type); 
  }

// 保存
  public save  =  () => {
    let { isPriview, componentList, currentSelectComponent, menu}= this.props;
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
    console.log(componentList[0]);
    
    localStorage.setItem("jzData",JSON.stringify(obj));
  }

  public render() {

    return (
 
        <Layout style={{ minHeight: '100vh' }} className="wade-container">
            <div id="moveWrap">
            </div>
 
          <Layout className="site-layout">
  
            <Header className="site-layout-background header-wrap" style={{ padding: 0 }}>
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="Title"
            />
              <Space>
                <Button type="link" onClick={this.editoAndPriviewHandler.bind(this, false)}>< Link to="/">编辑项目</ Link></Button>
                <RightOutlined />
                <Button type="link">< Link to="/say">发布项目</ Link></Button>
                <RightOutlined />
                <Button type="link">< Link to="/say">数据报表</ Link></Button>    
              </Space>
              <div>          
                  <Button type="primary" onClick={this.editoAndPriviewHandler.bind(this, true)} icon={<SmileOutlined />} size="large">
                          预览项目
                  </Button>
                  <Button type="link" onClick={this.save.bind(this)}>保存</Button>             
              </div>
 
            </Header>
            <Content style={{ margin: '74px 16px' }}>
              {this.props.children}
            </Content>

          </Layout>

        </Layout>


    );

    
  }
}


const mapStateToProps = (state: any) => {
  return {
    menu  : [...state.home.menu],
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
    isPriviewCallBack: (val:boolean) => {   
        dispatch({ type: "CHANGE__PRIVIEW__TRUE", val });   
    },
    addCurrentSelectListCallBack: (data:any[]) => {
      dispatch({ type: "ADD__CURRENT__SELECT__COMPONENT", data });
    },
    setOpt: (obj: any[]) => {
      dispatch({ type: "SET__OPTIONS", obj });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) ;
