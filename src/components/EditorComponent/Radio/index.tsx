import * as React from 'react';
import { Radio, Checkbox, Row, Col } from 'antd';
import SettingData from '../../SettingData'
import ContentEditorable from '../../Comon/contentEditor'
export interface RadioProps {
  data: any;
  updateSettingData: any;
  title: string;
  value:string;
  radioListText:[];
  rowLen: number;
  mounted: any;
  setSettingData:any;
  index:number;
}
export interface RadioState {
  title: string;
  isMust: any;
  value: string;
  radioListText:any[];
  rowLen:number;
  radioCol:[];
  typeList:[];
  type:string;
  cheboxVal: [];
  
}
class RadioComponent extends React.Component<RadioProps, RadioState> {

  myRef: any;
  constructor(props: RadioProps) {
    super(props);
    this.state = { ...this.props.data.settingData };
    // let obj = this.getIntance();
    // this.props.setSettingData(obj);
  }

  unDatedSet = (state: any) => {
    let obj = this.getIntance();
    this.props.setSettingData(obj, state, this.props.index);
    this.props.updateSettingData(state);
  }

  getIntance = () => {
    let _this = this;
    return {
      name: '单选框设置项',
      settingCom: [
        {
          type: 'Set/isMust',
          props: {
            title: '是否必填',
            value: _this.state.isMust,
            callBack: (v: any) => {
              _this.setState({
                isMust: v
              }, () => {
                // 传给父组件 更新 store;
                  _this.unDatedSet(_this.state);
              })

            }
          }
        },
        {
          type: 'Set/selectOpt',
          props: {
            title: '选项列布局',
            value: _this.state.radioCol,
            defaultChecked:_this.state.rowLen,
            callBack: (v: any) => {
              _this.setState({
                rowLen: v
              }, () => {
                // 传给父组件 更新 store;
                _this.unDatedSet(_this.state);
              })

            }
          }
        },
        {
          type: 'Set/selectOpt',
          props: {
            title: '问卷类型',
            value: _this.state.typeList,
            defaultChecked: _this.state.type,
            callBack: (v: any) => {
              if (_this.state.title !== "请选择一个选项" && _this.state.title !== "请选择多个选项  [ 多选 ]"){
                _this.setState({
                  type: v
                }, () => {
                  // 传给父组件 更新 store;
                  _this.unDatedSet(_this.state);
                  _this.props.mounted(_this.props.index);
                })
              }else{
                _this.setState({
                  type: v,
                  title: v == 'radio' ? "请选择一个选项" : "请选择多个选项  [ 多选 ]"
                }, () => {
                  // 传给父组件 更新 store;
                  _this.unDatedSet(_this.state);
                  _this.props.mounted(_this.props.index);
                })
              }
            }
          }
        },
        {
          type: 'Set/dragDrog',
          props: {
            title: '选项排序---( 可拖拽 )',
            value: _this.state.radioListText,
            type:  _this.state.type,
            callBack: (v: any) => {
              let arr = [...v];           
              _this.setState({
                radioListText: arr
              }, () => {
                // 传给父组件 更新 store;
                _this.unDatedSet(_this.state);
              })

            }
          }
        },
      ]
    }
  }

  updateSettingData = (state: any) => {
    this.setState({
      title: state.title
    }, () => {
      this.unDatedSet(this.state);
    })
  }

  onChange = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  };

  checkboxChange = (checkboxChange: any) => {
    // console.log(checkboxChange,'checkboxChange');
    // this.setState({
    //   cheboxVal: checkboxChange,
    // },()=>{
    //     console.log(this.state.cheboxVal); 
    // });
  };

  handleClick = (ev: any) => {
    console.log(ev,'ev');
  }



  // componentDidMount() {
  //   this.props.mounted()
  // }



  render() {
    return ( 
      <div className="INPUT__CONTANER">
            <div className={this.props.data.checked ? 'title__focus title__container' : "title__container"}>
                <ContentEditorable updateSettingData={this.updateSettingData} data={this.state} checked={this.props.data.checked} />
                {
                  this.state.isMust ? <span className={this.state.isMust ? 'red' : ''}>*</span> : null
                }
             </div>

                {
                    this.state.type == "radio" ? 
                    <Radio.Group value={this.state.value} >
                      <Row >
                        {
                          this.state.radioListText.map((item: any, index: number) => {
                            return (
                              <Col span={this.state.rowLen} key={item.id} className="mbt_5">
                                <Radio value={item.value}>{item.value}</Radio>
                              </Col>
                            )

                          })
                        }
                      </Row>
                    </Radio.Group>
                    :
                    <Checkbox.Group value={this.state.cheboxVal} onChange={this.checkboxChange}>
                      <Row>
     
                          {
                            this.state.radioListText.map((item: any, index: number) => {
                              return (
                                <Col span={this.state.rowLen} key={item.id} className="mbt_5">
                                  <Checkbox value={item.value}>{item.value}</Checkbox>
                                </Col>                   
                              )

                            })
                          }
                      </Row>
                    </Checkbox.Group>
                }
      

      </div>
    );
  }
}








export default RadioComponent;