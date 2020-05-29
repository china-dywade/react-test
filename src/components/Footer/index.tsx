import * as React from 'react';
export interface FooterProps {
  
}
 
export interface FooterState {
  
}
 
class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
  }
  render() { 
    return (  

        <div>
            我是common footer
        </div>

    );
  }
}
 
export default Footer;