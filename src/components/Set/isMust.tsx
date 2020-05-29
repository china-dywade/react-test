import * as React from 'react';
import { Switch } from 'antd';
export interface IsMustProps {
  data:any;
}
 
export interface IsMustState {
  value:any;
  title:string;
}
 
class IsMust extends React.Component<IsMustProps, IsMustState> {
  constructor(props: IsMustProps) {
    super(props);
    this.state = { ...this.props.data }; 
    
  }
  switchHandler = (checked:boolean) => {
 
    this.setState({
      value: checked
    })

    this.props.data.callBack(checked);
  }
  
  render() { 
    return ( 
      <div className="flex-col">
        <span>{this.state.title}</span>
         <Switch checkedChildren="开启" checked={ this.state.value ?true:false} onChange={this.switchHandler.bind(this)} unCheckedChildren="关闭"/> 
      </div>  
     );
  }
}
 
export default IsMust;