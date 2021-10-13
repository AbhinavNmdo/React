import React, { Component } from "react";
// import catimage from '../catPlace.png';

export class NewsCards extends Component {
  render() {
    let { title, desc, image, url, published } = this.props;
    return (
      <div
        className="card mb-5"
        style={{ borderRadius: "25px", border: "0.01rem solid grey" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={!image?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3CYHQoeCjsHpgXuHOtcbVV3ds9vx7digmkg&usqp=CAU":image}
              className="img-fluid"
              alt="..."
              style={{ borderRadius: "25px", height: '14rem'}}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text mt-4">{desc}</p>
              <a href={url} className="btn btn-sm btn-info">
                Read More
              </a>
              <div className="bottom-align-text">
                <p className="card-text">
                  <small className="text-muted">Published At: {new Date(published).toLocaleString()}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsCards;
