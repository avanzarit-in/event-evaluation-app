
import React, { Component } from 'react';
import ImageViewer from 'react-image-viewer-zoom';
import 'react-image-viewer-zoom/dist/style.css'; 
import Modal from 'react-modal';
import logo from './Zoom.png'


export default class MyModal extends React.Component {
  constructor (props) {
    super();
    this.state = {
      showModal: false,
      src: props.src
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render () {
    console.log(this.state.src);
    return (
      <div >
       <div style={{marginLeft:40,height:250,width:250}}>
    <img src={this.state.src}  style={{height:200,width:250}}/>
       <button onClick={this.handleOpenModal}>Zoom</button>
        <Modal 

           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close</button>
            <div className='my-modal' >
                <ImageViewer
           
                    activeIndex={0}
                    images={[{src:this.state.src}]}/>
            </div>
        </Modal>
        </div>
      </div>
    );
  }
}
