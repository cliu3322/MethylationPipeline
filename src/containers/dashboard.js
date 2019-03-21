import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components'
import LayoutContentWrapper from '../components/utility/layoutWrapper';

import { cloneDeep, mapValues } from 'lodash'

import { FlowChartWithState, INodeInnerDefaultProps  } from "@mrblenny/react-flow-chart";
import { chartSimple } from "./Chartnode/pipeline"; // Demo chart state


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
    const chart = cloneDeep(chartSimple);
    console.log(chart.selected.type)
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <Content>

          <FlowChartWithState
          initialValue={chartSimple}
          Components={ {
            NodeInner: NodeInnerCustom,
          }}
          />
        </Content>

        <Sidebar>
          { chart.selected.type
          ? <Message>
              <div>Type: {chart.selected.type}</div>
              <div>ID: {chart.selected.id}</div>
            </Message>
          : <Message>Click on a Node, Port or Link</Message> }
        </Sidebar>
        <SidebarFeedback>
          <Message>A live message</Message>
        </SidebarFeedback>
      </LayoutContentWrapper>
    );
  }
}


function mapStateToProps(state) {

  return {

  };
}


export default connect(mapStateToProps, {})(Dashboard);
