import React from 'react';
import axios from 'axios';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

class SlideCreator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      youTubeUrl: '',
      text: '',
      quizUrl: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit (event) {
    event.preventDefault();
    var sliceFrom = this.state.youTubeUrl.indexOf('=');
    var youTubeUrl = this.state.youTubeUrl.slice(sliceFrom + 1);
    youTubeQueryToServer(youTubeUrl);

    axios.post('/slides', this.state)
    .then(result => {
      console.log(result);
      this.props.fetch(result);
    });
  }

  changeName (event) {
    this.setState({
      name: event.target.value
    })
  }

  changeYouTubeUrl (event) {
    this.setState({
      youTubeUrl: event.target.value
    })
  }

  changeText (event) {
    this.setState({
      text: event.target.value
    })
  }

  changeQuizUrl (event) {
    this.setState({
      quizUrl: event.target.value
    })
  }

  render () {
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup>
          <Col smOffset={2} sm={2}>
            <ControlLabel>Slide Creator</ControlLabel>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Slide Name</Col>
          <Col sm={10}>
            <FormControl type='text' placeholder='Slide Name'
              value={this.state.name}
              onChange={this.changeName.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Slide youTubeUrl</Col>
          <Col sm={10}>
            <FormControl type='text' placeholder='Slide youTube Url'
              value={this.state.youTubeUrl}
              onChange={this.changeYouTubeUrl.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Slide Text</Col>
          <Col sm={10}>
            <FormControl type='text' placeholder='Slide Text'
              value={this.state.text}
              onChange={this.changeText.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Slide QuizUrl</Col>
          <Col sm={10}>
            <FormControl type='Quiz Url' placeholder='Quiz Url'
              value={this.state.quizUrl}
              onChange={this.changeQuizUrl.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={2}>
            <FormControl type="submit" value='Submit All' />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={2}>
            <Button onClick={this.props.changeCreateState}>
              Stop Creating
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

}

function youTubeQueryToServer(searchString) {
  axios.get('/something', { params: { string: searchString } })
  .then((result) => {
    console.log('YOUTUBE', result);
  })
  .catch((err) => {
    console.log('badddddddd', err);
  })
}

export default SlideCreator;