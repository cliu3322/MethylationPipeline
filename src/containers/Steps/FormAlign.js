import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, message } from 'antd';
//import {alignFiles} from '../../redux/actions/alignActions.js';


const FormItem = Form.Item;


class FormAlignment extends Component {


  constructor(props) {
    super(props);
    this.state = {
      alignCompleted:false,
    };

    this.click = this.click.bind(this);
  }



  click(e){
    e.preventDefault();

  }


  render() {
    const {file1completed, file2completed} = this.state

    return (
      <Form >
        <FormItem label="Start to trim" validateStatus="success">
          <Button type="primary" onClick={this.click} disabled={this.state.isloading}>
            Align
          </Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {

  return {

  };
}

const WrappedFormAlignment = Form.create()(FormAlignment);
export default connect(mapStateToProps,{  } )(WrappedFormAlignment);
