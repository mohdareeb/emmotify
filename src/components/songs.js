import React from 'react'

export default function songs(props) {
    // let {title,description,imageUrl,newsUrl,author,publishedAt}=this.props;

    return (
      <div className='container my-3'>
            
            <div className="card" style={{width: "18rem"}}>
                <img src={props.src} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Singer Name :</h5>
                    <p className="card-text">Published At : </p>
                    <a href={props.link} target="_blank" rel="noreferrer" className="btn btn-primary">Click to play</a>
                </div>
            </div>
      </div>
    )
  
}
