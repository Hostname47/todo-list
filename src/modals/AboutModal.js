import React from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { switchAboutModal } from '../redux/modal/modalActions';

function AboutModal({ status, switchModal }) {
  console.log('--- Render About Modal ---', status)

  return status && ReactDOM.createPortal((
    <div className='absolute-full-screen full-center modal-box'>
      <div className='absolute-full-screen modal-overlay'></div>
      <div className='relative modal-style-1-container'>
        <div className='title-box'>
          <div className='align-center g6'>
            <svg className="size18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M65.4,453.77h85.53V512l55-24.76L261,512V453.77H446.6V0H65.4ZM231,465.61l-25-11.27-25,11.27V423.74H231ZM155.44,30H416.6V333.7H155.44Zm-60,0h30.05V333.7h-30Zm0,333.7H416.6v60.07H261v-30H150.93v30H95.4ZM301,231.9V161.85H241v30h30V231.9H241v30h90.07v-30ZM271,101.8h30v30H271Z"/></svg>
            <h2 className='title'>About</h2>
          </div>

          <button className='flex' onClick={ () => switchModal(false) }>
            <svg className="x" viewBox="0 0 24 24"><path d="M20.46.73,12,9.18,3.54.73.72,3.54,9.18,12,.72,20.46l2.82,2.81L12,14.82l8.46,8.45,2.82-2.81L14.82,12l8.46-8.46Z"/></svg>
          </button>
        </div>
        <div className='content-box fs13 line-height-18'>
          <p style={{ marginTop: 0 }}>I started learning <strong>ReactJS</strong> in the 1st august, and after a month exactly (1st septembre), I'm feeling much more comfortable with the basics concepts as well as the advanced ones like Hooks, HOCs, render optimization and so on. I learned the basics as well as the advanced topics following by all the common hooks, but as the saying goes, you cannot say you understand something until you build something including all the techniques offered by the technology and also it should be fine tuned.</p>
          <p>So I decided to create this simple todo list application since it includes all the areas where you can apply react concepts be more familare with React.</p>
          <p>You may find a lot of mess or features misuses if you take a look at the <a href="https://github.com/Hostname47/todo-list" target='_blank' rel="noreferrer" className='link'>source code</a> of this application but yeah, as I said I'm still practicing and I'm new to front-end realm. Feel free to clone or open a pull request if you find something wrong and I'll be very happy to merge you ass :)</p>
          <p><strong>Note</strong>: This application uses IndexedDB API to process and managed the data, and as you may already know, you should never rely on it, since the user could remove the local data, so this should only be used for performence purposes and simple use cases due to its limitations.</p>
          <p>Currently I noticed that managing global state (e.g. closing modals from task component) is really difficult to manage, and It causes children re-renders everytime the App state changes since it contains all the global state, so I decided to start using Redux to manage global state and maybe I'll refactore this project to use redux as soon as I get comfortable with redux.</p>
          <p className='full-center bold'><em>~ Mouad Nassri</em></p>
        </div>
      </div>
    </div>
  ), document.getElementById('modal'));
}

const mapStateToProps = state => {
  return {
    status: state.modal.aboutModalStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchModal: switchTo => dispatch(switchAboutModal(switchTo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal)