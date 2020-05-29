import * as React from 'react';

export interface SayProps {
}
 
export interface SayState {
  
}
 
class Say extends React.Component<SayProps, SayState> {
  constructor(props: SayProps) {
    super(props);
  }
  render() { 
    return ( 
      <div>
        我是 say 组件
      </div>
     );
  }
}
 
export default Say;