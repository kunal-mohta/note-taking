import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import './App.css';

const BASEURL = 'http://localhost:5000';

let isLogin = true;

const data = {
	username : "kunal",
	password : "mohta",
	data : {
		notes : [
			{
				title : "note1",
				content : "note1 content",
				labels : [
					"label1",
					"label2"
				],
				color : "green",
				created : "",
				updated : ""
			},
			{
				title : "note2",
				content : "note2 content",
				labels : [
					"label1"
				],
				color : "red",
				created : "",
				updated : ""
      }
		]
	}
};

let activeUserData = {
  notes: [
    {
      title : "note1",
      content : "note1 content",
      labels : [
        "label1",
        "label2"
      ],
      color : "green",
      created : "",
      updated : ""
    },
    {
      title : "note2",
      content : "note2 content",
      labels : [
        "label1"
      ],
      color : "red",
    }
  ],
  archived: []
}

class App extends Component {
  render () {
    return (
      <Router>
        <div className = 'App'>
          <Switch>
            <PrivateRoute exact path = '/dashboard' component = { Dashboard } />
            <Route path = '/login' component = { LoginPage } />
            <Route path = '/signup' component = { SignUpPage } />
          </Switch>
        </div>
      </Router>
    )
  }
}

class PrivateRoute extends Component {
  render () {
    if (isLogin) return <Route path = { this.props.path } component = { this.props.component }/>
    else return <Redirect to = { {pathname: '/login'} } />
  }
}

class UsersPage extends Component {
  render () {
    return (
      <div className = 'App__usersPage'>
        <div className = 'App__usersPage__container'>
          <div className = 'App__usersPage__container__header'>Note Taking App</div>
          <div className = 'App__usersPage__container__body'>
            <div className = 'App__usersPage__container__body__main'>
              <div className = 'App__usersPage__container__body__main__form'>
                <div>{ this.props.title }</div>
                <form>
                  <div>
                    <label>Username</label>
                    <input type = 'text' value = { this.props.username } onChange = { this.props.handleInputChange.bind(this, 'username') }></input>
                  </div>
                  <div>
                    <label>Password</label>
                    <input type = 'password' value = { this.props.password } onChange = { this.props.handleInputChange.bind(this, 'password') }></input>
                  </div>
                  <div className = 'button' onClick = { this.props.compFunc }>{ this.props.title }</div>
                </form>
              </div>
            </div>
            <hr />
            <div className = 'App__usersPage__container__body__oauth'>
              <div className = 'App__usersPage__container__body__oauth__wrap'>
                { this.props.oauthMsg }
              </div>
            </div>
          </div>
          <div className = 'App__usersPage__container__footer'>
            <div className = 'App__usersPage__container__footer__signuplink'>{ this.props.footerMsg } 
            <Link to = { this.props.footerLink }> { this.props.footerLinkMsg }</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      user: {
        username: '',
        password: ''
      }
    }
  }

  handleInputChange(property, event) {
    let user = this.state.user;
    user[property] = event.target.value;
    this.setState({ user: user });
  }

  login() {
    fetch(
      BASEURL + '/users/login',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.user.username,
          password: this.state.user.password
        })
      }
    )
    .then(
      (response) => {
        switch (response.status) {
          case 200:
            //Successful Login
            response.json()
            .then(
              (data) => {
                isLogin = true;
                this.props.history.push('/dashboard');
                activeUserData = data.userData
              }
            );
            break;

          case 403: 
            //Wrong username/password
            response.json()
            .then(
              (data) => console.log(data.message)
            );
            break;

          case 500:
            //Internal Server Error
            response.json()
            .then(
              (data) => console.log(data.message)
            );
            break;

          default: 
        }
      }
    )
  }

  render() {
    return (
      <UsersPage title = 'Login' oauthMsg = 'If you have already linked your account, then sign in with the following' footerMsg = 'Don&apos;t have and account yet?' footerLink = '/signup' footerLinkMsg = 'Sign up here!' compFunc = { this.login } username = { this.state.user.username } password = { this.state.user.password } handleInputChange = { this.handleInputChange }/>
    )
  }
}

class SignUpPage extends Component {
  constructor(props, context) {
    super(props);
    this.signup = this.signup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      user: {
        username: '',
        password: ''
      }
    }
  }

  handleInputChange(property, event) {
    let user = this.state.user;
    user[property] = event.target.value;
    this.setState({ user: user });
  }

  signup() {
    fetch(
      BASEURL + '/users/signup',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.user.username,
          password: this.state.user.password
        })
      }
    )
    .then(
      (response) => {
        switch (response.status) {
          case 200:
            //Successful Signup
            response.json()
            .then(
              (data) => {
                isLogin = true;
                this.props.history.push('/dashboard');
                activeUserData = data.userData
              }
            );
            break;

          case 409: 
            //User already exists
            response.json()
            .then(
              (data) => console.log(data.message)
            );
            break;

          case 500:
            //Internal Server Error
            response.json()
            .then(
              (data) => console.log(data.message)
            );
            break;

          default:
        } 
      }
    );
  }

  render() {
    return (
      <UsersPage title = 'Sign Up' oauthMsg = 'You can also directly sign up via the following' footerMsg = 'Already have an account?' footerLink = '/login' footerLinkMsg = 'Login here!' compFunc = { this.signup } username = { this.state.user.username } password = { this.state.user.password } handleInputChange = { this.handleInputChange }/>
    )
  }
}

class Dashboard extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: activeUserData,
      noteDialogVisibility: false,
      isHamOpen: false
    }

    this.openNoteDialog = this.openNoteDialog.bind(this);
    this.exitDialog = this.exitDialog.bind(this);
    this.openHam = this.openHam.bind(this);
    this.closeHam = this.closeHam.bind(this);
    this.updateState = this.updateState.bind(this);
    this.addColorFunction = this.addColorFunction.bind(this);
    this.addLabelFunction = this.addLabelFunction.bind(this);
    this.deleteLabelFunction = this.deleteLabelFunction.bind(this);

    //clicking anywhere outside note dialog should close the note dialog
    document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
      let isInsideDialog = ( e.target.parentElement.className === 'App__dashboard__addNoteDialog' || e.target.className === 'App__dashboard__addNoteDialog' );

      if (isInsideDialog) { }
      else {
        this.exitDialog();
      }
    });
  }

  openNoteDialog () {
    this.setState({ noteDialogVisibility: true });
  }

  exitDialog () {
    this.setState({ noteDialogVisibility: false });
  }

  openHam () {
    this.setState({ isHamOpen: true });
  }

  closeHam () {
    this.setState({ isHamOpen: false });
  }

  addNoteFunction (newNoteData, clearDialogData) {
    let newNote = {
      title: newNoteData.title,
      content: newNoteData.content,
      labels: [],
      color: '',
      created: '',
      updated: ''
    }
    activeUserData.notes.push(newNote);
    this.updateState();
    clearDialogData();
    this.exitDialog();
  }

  addLabelFunction (closeLabelPage, noteIndex, label) {
    activeUserData.notes[noteIndex].labels.push(label);
    this.updateState();
    closeLabelPage();
  }

  deleteLabelFunction (noteIndex, labelIndex) {
    activeUserData.notes[noteIndex].labels.splice(labelIndex, 1);
    this.updateState();
  }

  // archiveNoteFunction (index) {
  // }

  deleteNoteFunction (index) {
    activeUserData.notes.splice(index, 1);
    this.updateState();
  }

  addColorFunction (noteIndex, color) {
    activeUserData.notes[noteIndex].color = color;
    this.updateState();
  }

  updateState () {
    this.setState({ data: activeUserData });
  }

  render () {
    return (
      <div className = 'App__dashboard'>
        <div className = 'App__dashboard__header'>
          <div className = 'App__dashboard__header__title'>{ data.username }'s Notes</div>
          <SignOutButton class = 'App__dashboard__header__signOutButton' />
          <AddNoteButton onClickFunction = { this.openNoteDialog } class = 'App__dashboard__header__addNoteButton' />

          <div className = 'App__dashboard__header__hamburgericon' onClick = { this.openHam } style = { (this.state.isHamOpen) ? {display: 'none'} : {} }></div>
          <div className = 'App__dashboard__header__closeHamicon' onClick = { this.closeHam } style = { (this.state.isHamOpen) ? {} : {display: 'none'} }></div>
        </div>
        <div className = 'App__dashboard__maingrid'>
          <div className = 'App__dashboard__maingrid__sidebar'>
            <ul className = 'App__dashboard__maingrid__sidebar__options'>
              <li>Sort by
                <ul>

                </ul>
              </li>
              {/* <li>Archived Notes</li> */}
            </ul>
          </div>

          <div className = 'App__dashboard__maingrid__mainbody'>
            {
              this.state.data.notes.map(
                (note, index) => <Note key = { index } noteId = { index } title = { note.title } content = { note.content } color = { note.color } labels = { note.labels } addLabelFunc = { this.addLabelFunction } deleteNoteFunc = { this.deleteNoteFunction } addColorFunc = { this.addColorFunction.bind(null, index) } deleteLabelFunc = { this.deleteLabelFunction.bind(null, index) } parentContext = { this }/>
              )
            }
          </div>
        </div>

        <div className = 'App__dashboard__hamburger' style = { (this.state.isHamOpen) ? {left:'0vw'} : {left:'100vw'} }>
          <ul className = 'App__dashboard__hamburger__options'>
            <li>Sort By..</li>
            {/* <li>Archived Notes</li> */}
            <li>Sign Out</li>
          </ul>
        </div>

        <AddNoteDialog visible = { this.state.noteDialogVisibility } exitDialogFunc = { this.exitDialog } addNoteFunc = { this.addNoteFunction } parentContext = { this }/>
      </div>
    )
  }
}

class AddNoteDialog extends Component {
  constructor (props) {
    super(props);

    this.state = {
      noteData: {
        title: '',
        content: ''
      },
      visible: this.props.visible
    }
  }

  handleInputChange (property, event) {
    let noteData = this.state.noteData;
    noteData[property] = event.target.value;
    this.setState({ noteData: noteData });
  }

  clearDialogData () {
    this.setState({ 
      noteData: {
        title: '',
        content: ''
      }
    });
  }

  render () {
    return (
      <div className = 'App__dashboard__addNoteDialog' style = { (this.props.visible) ? {display:'grid'} : {display:'none'} } >
        <input type = 'text' placeholder = 'Note Title' value = { this.state.noteData.title } onChange = { this.handleInputChange.bind(this, 'title') } />
        <textarea placeholder = 'Note Content' value = { this.state.noteData.content } onChange = { this.handleInputChange.bind(this, 'content') }></textarea>
        <div className = 'App__dashboard__addNoteDialog__close' onClick = { this.props.exitDialogFunc }></div>
        <div className = 'App__dashboard__addNoteDialog__button' onClick = { this.props.addNoteFunc.bind(this.props.parentContext, this.state.noteData, this.clearDialogData.bind(this)) }>Add Note</div>
      </div>
    )
  }
}

class SignOutButton extends Component {
  constructor (props) {
    super(props);
    this.signOutFunction = this.signOutFunction.bind(this);
  }

  signOutFunction () {
    fetch(
      BASEURL + '/userData/update',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activeUserData)
      }
    )
    .then(
      (response) => {}
    )
  }

  render () {
    return (
      <div className = { this.props.class } title = 'Sign Out' onClick = { this.signOutFunction }>Sign Out</div>
    )
  }
}

class AddNoteButton extends Component {
  render () {
    return (
      <div className = { this.props.class } title = 'Add Note' onClick = { this.props.onClickFunction }></div>
    )
  }
}

class Note extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isLabelPage: false,
      isColorPage: false
    }

    this.openLabelPage = this.openLabelPage.bind(this);
    this.closeLabelPage = this.closeLabelPage.bind(this);
    this.openColorPage = this.openColorPage.bind(this);
    this.closeColorPage = this.closeColorPage.bind(this);
  }

  openLabelPage () {
    this.setState({ isLabelPage: true });
  }

  closeLabelPage () {
    this.setState({ isLabelPage: false });
  }

  openColorPage () {
    this.setState({ isColorPage: true });
  }

  closeColorPage () {
    this.setState({ isColorPage: false });
  }

  render () {
    return (
      <div className = 'note'>
        <div className = 'note__colorBar' style = { {background: this.props.color} }></div>
        <div className = 'note__title'>{ this.props.title }</div>
        <div className = 'note__body'>{ this.props.content }</div>
        <div className = 'note__labelSection'>
          {
            this.props.labels.map(
              (label, index) => <div key = { index } className = 'note__labelSection__label' style = { {background: this.props.color} } title = 'Remove Label' onClick = { this.props.deleteLabelFunc.bind(null, index) }>{ label }</div>
            )
          }
        </div>
        <div className = 'note__operations'>
          <div className = 'note__operations__addLabel' onClick = { this.openLabelPage } style = { {background: this.props.color} }>Add Label</div>
          
          <div className = 'note__operations__palette' title = 'Change Note Color' onClick = { this.openColorPage }></div>
          {/* <div className = 'note__operations__archive' title = 'Archive Note' onClick = { this.props.archiveNoteFunc.bind(this.props.parentContext, this.props.noteId) }></div> */}
          <div className = 'note__operations__delete' title = 'Delete Note' onClick = { this.props.deleteNoteFunc.bind(this.props.parentContext, this.props.noteId) }></div>
        </div>

        <LabelPage isOpen = { this.state.isLabelPage } closeFunc = { this.closeLabelPage } addLabelFunc = { this.props.addLabelFunc.bind(null, this.closeLabelPage) } noteId = { this.props.noteId } />
        <ColorPage isOpen = { this.state.isColorPage } closeFunc = { this.closeColorPage } addColorFunc = { this.props.addColorFunc }/>
      </div>
    );
  }
}

class NoteOptionPages extends Component {
  constructor (props) {
    super(props);
    this.state = {
      openStyle: { display: 'block' },
      closeStyle: { display: 'none' }
    }
  }

  render () {
    return (
      <div className = 'note__optionsPage' style = { (this.props.isOpen) ? this.state.openStyle : this.state.closeStyle } >
        <div className = 'note__optionsPage__close' onClick = { this.props.closeFunc }></div>
        <div className = 'note__optionsPage__content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}

class LabelPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      labelContent: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange (event) {
    this.setState({ labelContent: event.target.value });
  }

  render () {
    return (
      <NoteOptionPages isOpen = { this.props.isOpen } closeFunc = { this.props.closeFunc }>
        <div className = 'note__optionsPage__content__title'>
          What label do you want to add?
        </div>
        <input type = 'text' placeholder = 'Label Name' value = { this.state.labelContent } onChange = { this.handleInputChange } />
        <div className = 'note__optionsPage__content__addButton' onClick = { this.props.addLabelFunc.bind(null, this.props.noteId, this.state.labelContent) } >Add</div>

      </NoteOptionPages>
    )
  }
}

class ColorPage extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      colors: ['#5628b4', '#d80e70', '#f7b236', '#0f3057', '#ff561e', '#2a9c6e', '#8d1c40', '#e7455f', '#e43a19'],
      selectedColorIndex: null
    }
  }

  selectColor (color, index) {
    this.props.addColorFunc.bind(null, color)();

    this.setState({ selectedColorIndex: index });
  }

  render () {
    return (
      <NoteOptionPages isOpen = { this.props.isOpen } closeFunc = { this.props.closeFunc }>
        <div className = 'note__optionsPage__content__title'>
          Choose Note Color
        </div>
        <div className = 'note__optionsPage__content__colorPalette'>
          {
            this.state.colors.map(
              (color, index) => {
                if (index === this.state.selectedColorIndex) {
                  return (
                    <div key = { index } style = { {background: color, border: 'solid black 5px'} } className = 'note__optionsPage__content__colorPalette__color' onClick = { this.props.addColorFunc.bind(null, color) }>
                    </div>
                  );
                }
                else {
                  return (
                    <div key = { index } style = { {background: color} } className = 'note__optionsPage__content__colorPalette__color' onClick = { this.selectColor.bind(this, color, index) }>
                    </div>
                  );
                }
              }
              
            )
          }
        </div>
      </NoteOptionPages>
    )
  }
}

export default App;
