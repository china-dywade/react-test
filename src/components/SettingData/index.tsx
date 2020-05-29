import * as React from 'react';
export interface SettingDataProps {

  name:string;
  setCom:any[];
}
 
export interface SettingDataState {
  name:string;
  settingCom:any[];
}
 
class SettingData extends React.Component<SettingDataProps, SettingDataState> {
  constructor(props: SettingDataProps) {
    super(props);
    // this.state = this.props.settingData

    let arr = [];
    arr = this.props.setCom;
    this.state ={
      name: this.props.name,
      settingCom: arr
    }

  }


  render() { 

    return (  
      <div className="setting__data__container">
        <span className="settTitle">
          {
            this.state.name
          }
        </span>
        <div className="settinng__ul">
          {
            this.state.settingCom.map((item:any,index:number)=>{
              let Com = require(`../../components/${item.type}`);
              return(
                <div key={index}>
                  <Com.default  data={item.props} />
                </div>
                 
              )
              
            })
         }
        </div>
      </div>
    );
  }
}
 
export default SettingData;