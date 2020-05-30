import * as React from 'react';
import { Input } from 'antd';


export interface Props {
  data:any;
}
 
export interface State {
  title:string;
  value:string;
}
 
class InputDefault extends React.Component<Props, State> {
  refs:any;
  constructor(props: Props) {
    super(props);
    this.state = {...this.props.data}; 
  }

  inputChange = (e:any) => {
   
    this.setState({
      value: e.target.value
    },()=>{
        this.props.data.callBack(this.state.value);
        
    });
    
  }

  render() { 
    return ( 
      <div>
        <span>{this.state.title}</span> 
        <Input value={this.state.value} onChange={this.inputChange}/>
      </div>  
     )
  }
}
export default InputDefault;