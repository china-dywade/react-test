import * as React from 'react';
import { Radio  } from 'antd';
export interface SelectOptionProps {
  data: any;
}

export interface SelectOptionState {
  value: any;
  title: string;
  defaultChecked:any;
}

class SelectOption extends React.Component<SelectOptionProps, SelectOptionState> {
  constructor(props: SelectOptionProps) {
    super(props);
    this.state = { ...this.props.data };
  }
  onchange = (e:any) => {
    console.log(`radio checked:${e.target.value}`);
    this.props.data.callBack(e.target.value);
  }

  render() {
    return (
      <div className="flex-col">
        <span>{this.state.title}</span>
        <Radio.Group defaultValue={this.state.defaultChecked} size="small" buttonStyle="solid" onChange={this.onchange}>
          {/* <Radio.Button value="a">Hangzhou</Radio.Button>
          <Radio.Button value="b">Shanghai</Radio.Button>
          <Radio.Button value="c">Beijing</Radio.Button> */}
          {
            this.state.value.map((item:any,index:number)=>{
              return (
                <Radio.Button value={item.value} key={index}>{item.title}</Radio.Button>
              )
              
            })
          }

        </Radio.Group>
      </div>
    );
  }
}
export default SelectOption;