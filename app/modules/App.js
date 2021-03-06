import React, { Component } from 'react';
import Canvas from './canvas/CanvasContainer';
import Options from './options/OptionsContainer';
import Header from './header/Header';
import './appStyle.css'
 
export default class App extends Component {
  render() {
    return(
      <div className="">
        <Header />
        <div className="top-level-container container">
          <div className="row" style={{
            height: '100%',
          }}>
            <div className="option-parent col s12 m12 l2">
              <Options />
            </div>
            <div className="canvas-parent col s12 m12 l9">
              <Canvas />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
