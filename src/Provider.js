import PropTypes from "prop-types";
import { Component, Children } from "react";

export default class Provider extends Component {
  static propTypes = {
    firebaseApp: PropTypes.object.isRequired,
    firestore: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  static childContextTypes = {
    firebaseApp: PropTypes.object,
    firestore: PropTypes.object
  };

  getChildContext() {
    return {
      firebaseApp: this.props.firebaseApp,
      firestore: this.props.firestore
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
