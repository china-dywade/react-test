import * as React from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Radio, Checkbox, Row, Col, Input} from 'antd';



export interface Props {
  data: any;
}

export interface State {
  title: string;
  value: any[];
  type:string;
}

class InputDefault extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { ...this.props.data };
    console.log(this.state,'result'); 
  }






  handleClick = (ev:any) => {

  }

  inputChange = (index:number, e: any) => {
    let arr = [...this.state.value];
    arr[index].value = e.target.value;
    this.setState({
      value: arr
    },()=>{
        this.props.data.callBack(arr);
    });
    
  }

  onDragEnd = (result:any) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    let arr = [...this.state.value];
    const [remove] = arr.splice(source.index, 1);
    arr.splice(destination.index, 0, remove);
    this.setState({
      value:arr
    },()=>{
        this.props.data.callBack(arr);
    })
   
  }

  onChange = (index:number,ev:any) => { 
    let arr = [...this.state.value];
    let [remove] = arr.splice(index,1);
    remove.value = ev.target.value;
    arr.splice(index, 0, remove);
    this.setState({
      value: arr
    },()=>{
        this.props.data.callBack(arr);    
    });
  
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>

              <Droppable droppableId="drag" type="DROG">
                {
                  (provided, snapshot) => (

                    <div className="" ref={provided.innerRef}   {...provided.droppableProps} style={{minHeight:this.state.value.length*40+20+'px'}} >
                      <div className="mbt_5">
                        <span>{this.state.title}</span> 
                      </div>  
                      {this.state.value.map((comp: any, index: number): any => {
                      
                        return (
                          <Draggable key={comp.id} draggableId={`${comp}_${comp.id}`} index={index}>
                            {(provided, snapshot) => (

                              <div
                                className="drag__container"
                                key={`${comp}_${comp.id}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                
                              >
                                <span className="iconfont icontuozhuai">

                                </span>
                              
                                {
                                  this.state.type == "radio" ?
                                    <Radio.Group value=''>
                                      <Row >                           
                                          <Col span={24} key={comp.id} className="mbt_5 row__li">
                                          <Radio value={ comp.value }>                                                                                  
                                           
                                           </Radio>
                                          <Input className="sort__input" value={comp.value} onChange={this.inputChange.bind(this,index)}/>
                                          {/* <span>
                                            <span className="iconfont icontianjia"></span>
                                            <span className="iconfont iconjian"></span>
                                          </span> */}
                                          
                                          </Col>                                          
                                      </Row>
                                    </Radio.Group>
                                    :
                                    <Checkbox.Group value={[]} >
                                      <Row>                              
                                        <Col span={24} key={comp.id} className="mbt_5 row__li">
                                          <Checkbox value={comp.value}></Checkbox>
                                          <Input className="sort__input" value={comp.value} onChange={this.inputChange.bind(this, index)}/>
                                          {/* <span>
                                            <span className="iconfont icontianjia"></span>
                                            <span className="iconfont iconjian"></span>
                                          </span> */}
                                        </Col> 
                                                                                                                     
                                      </Row>
                                    </Checkbox.Group>
                                }

                              </div>
                            )}
                          </Draggable>
                        )
                      })
                      }
                
                    </div>

                  )
                }

              </Droppable>
        
      </DragDropContext>
    )
  }
}
export default InputDefault;