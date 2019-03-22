import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components'
import LayoutContentWrapper from '../components/utility/layoutWrapper';

import { cloneDeep, mapValues } from 'lodash'


import { FlowChart, INodeInnerDefaultProps, IChart } from "@mrblenny/react-flow-chart";


//import { chartSimple } from "./Chartnode/pipeline"; // Demo chart state
import * as actions from './Chartnode/actions'


const chartSimple: IChart = {
  offset: {
    x: 0,
    y: 0,
  },
  nodes: {
    node1: {
      id: 'node1',
      type: 'custom',
        x: 300,
        y: 100,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'output',
          properties: {
            value: 'yes',
          },
        },
      },
    },
    node2: {
      id: 'node2',
      type: 'input-output',
      position: {
        x: 300,
        y: 300,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
    node3: {
      id: 'node3',
      type: 'input-output',
      position: {
        x: 100,
        y: 600,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
    node4: {
      id: 'node4',
      type: 'input-output',
      position: {
        x: 500,
        y: 600,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
  },
  links: {
    link1: {
      id: 'link1',
      from: {
        nodeId: 'node1',
        portId: 'port1',
      },
      to: {
        nodeId: 'node2',
        portId: 'port1',
      },
    },
    link2: {
      id: 'link2',
      from: {
        nodeId: 'node2',
        portId: 'port2',
      },
      to: {
        nodeId: 'node3',
        portId: 'port1',
      },
    },
    link3: {
      id: 'link3',
      from: {
        nodeId: 'node2',
        portId: 'port2',
      },
      to: {
        nodeId: 'node4',
        portId: 'port1',
      },
    },
  },
  selected: {},
  hovered: {},
}

const Sidebar = styled.div`
  width: 200px;
  background: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`
const SidebarFeedback = styled.div`
  width: 200px;
  background: green;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`

const Message = styled.div`
  margin: 10px;
  padding: 10px;
  line-height: 1.4em;
`

const Outer = styled.div`
  padding: 30px;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid cornflowerblue;
  width: 100%;
`


const NodeInnerCustom = ({ node }: INodeInnerDefaultProps) => {
  if (node.type === 'output-only') {
    return (
      <Outer>
        <p>Use Node inner to customise the content of the node</p>
      </Outer>
    )
  }
  else if (node.type === 'custom') {
    return (
      <Outer>
        <p>OMG</p>
      </Outer>
    )
  }
  else {
    return (
      <Outer>
        <p>Add custom displays for each node.type</p>
        <p>You may need to stop event propagation so your forms work.</p>
        <br />
        <Input
          placeholder="Add forms etc if required"
          onClick={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        />
      </Outer>
    )
  }
}

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const chart = cloneDeep(chartSimple)
    const stateActions = mapValues(actions, (func: any) => (...args: any) => this.setState(func(...args)))
    console.log(actions)
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <Content>

          <FlowChart
          chart={chartSimple}
          callbacks={stateActions}
          />
        </Content>

      </LayoutContentWrapper>
    );
  }
}


function mapStateToProps(state) {

  return {

  };
}


export default connect(mapStateToProps, {})(Dashboard);
