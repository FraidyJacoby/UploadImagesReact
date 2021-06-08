import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <h4 className="text-success">Welcome! Click the links above to navigate this site.</h4>
    );
  }
}
