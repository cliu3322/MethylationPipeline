import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Upload, Form, Progress, Row, Col, Icon, Modal, Button} from 'antd';
import SuperFetch from '../../helpers/superFetch';
import reqwest from 'reqwest';


const FormItem = Form.Item;


class FormUpload extends Component {


  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      uploading: false,
    };

  }

  handleCancel = (file) => {
    console.log('file',file);

    const { fileList } = this.state;

    console.log('fileList',fileList);

    this.setState({ previewVisible: false })
  }

  click= () =>{
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    formData.append('id', this.props.id);

    this.setState({
      uploading: true,
    });

    //SuperFetch.post('uploadfile',formData).then(res => console.log(res))


    //uploadFile(formData);
    // You can use any AJAX library you like
    reqwest({
      url: '/api/uploadfile',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }


  render() {
    const {file1completed, file2completed} = this.state

    const { previewVisible, previewImage } = this.state;

    const props1 = {
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      onRemove: (file) => {

        const { fileList } = this.state;
        fileList.splice( fileList.indexOf(file), 1 );

        this.setState({ fileList: fileList })

      },
      listType:"picture-card",
      multiple: true,
      onPreview:(file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
          beforeUpload:false
        });
      },

    };

    return (
      <Form >
        <Upload {...props1}>
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>

        <Button type="primary" htmlType="submit"
        disabled = {(this.state.fileList.length>0)?false:true}
        onClick = {this.click}
        >
          Save
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {

  return {

  };
}

const WrappedFormUpload = Form.create()(FormUpload);
export default connect(mapStateToProps,{  } )(WrappedFormUpload);
