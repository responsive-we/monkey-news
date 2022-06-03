import React from 'react'

const NewsItem =(props)=>{
        let { title, description, imageUrl, newsUrl, author, publishedAt,source } = props
        return (
            <div>
                <div className=" my-2 card" >
                    <div className='d-flex position-absolute justify-content-end end-0'>
                    <span className="badge rounded-pill bg-dark text-light">
                        {source}
                    </span>
                    </div>
                    <img src={!imageUrl ? 'https://www.pngitem.com/pimgs/b/181-1815246_cinch-gaming-png.png' : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author}, Published at {new Date(publishedAt).toGMTString()}</small></p>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem