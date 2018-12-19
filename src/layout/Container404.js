import React, { Component } from "react";
import MainContainer from "./MainContainer";

export default class Container404 extends Component {
  render() {
    return (
      <MainContainer>
        <div className="pf-l-bullseye">
          <div className="pf-l-bullseye__item">
            <div className="pf-c-card">
              <div className="pf-c-card__body">
                <p>We are looking for your page...but we can't find it</p>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    );
  }
}
