import React from 'react'
import TestModal from './TestModal'
import { connect } from 'react-redux'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal
}

const mapStateToProps = state => ({
  currentModal: state.modals
})

const ModalManager = ({currentModal}) => {
  let renderedModal

  if(currentModal){
    const {modalType, modalProps} = currentModal
    const ModalComponent = modalLookup[modalType]
    renderedModal = <ModalComponent {...modalProps}/>
  }
  return <>{renderedModal}</>
}

export default connect(mapStateToProps)(ModalManager)
