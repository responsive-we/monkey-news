import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import axios from 'axios';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `Monkey News -${handleTitlecase(props.category)}`

    
    const handleTitlecase = (Text) => {
        let newText = Text.toLowerCase().split(" ");
        for (var i = 0; i < newText.length; i++) {
            newText[i] = newText[i].charAt(0).toUpperCase() + newText[i].slice(1);
        }
        return newText.join(' ')
    }

    const updateNews = async () => {
        props.setProgress(0)
        const location = await axios.get('https://geolocation-db.com/json/')
        const countryCode = await location.data.country_code.toLowerCase();
        props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        props.setProgress(39)
        let data = await fetch(url)
        props.setProgress(60)
        let parsedData = await data.json()
        props.setProgress(75)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        props.setProgress(100)
        setLoading(false)
    }
    useEffect(() => {
        updateNews()
        //eslint-disable-next-line
    },[])
    const fetchMoreData = async () => {
        const location = await axios.get('https://geolocation-db.com/json/')
        const countryCode = await location.data.country_code.toLowerCase();
        let url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${props.category}&apiKey=${props.apiKey}&page=${page +1}&pageSize=${props.pageSize}`
        setPage(page + 1 )
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }
        return (

            <>
                <h1 className='text-center' style={{marginTop:'70px',}} >{`Monkey News - Top ${handleTitlecase(props.category)} headlines `}</h1>
                {loading && <Loading/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Loading/>}
                >
                    < div className='container my-3'>
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url} >
                                <NewsItem title={element.title ? element.title.slice(0, 45) + '....' : ""} source={element.source.name} author={element.author} publishedAt={element.publishedAt} newsUrl={element.url} description={element.description ? element.description.slice(0, 88) + '....' : ""} imageUrl={element.urlToImage?element.urlToImage:'data:image/png;base64,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'} />
                            </div>
                        })}
                        </div>
                    </div>
                    </InfiniteScroll>
                    
            </>
        )

}
News.defaultProps = {
    pageSize: 8,
    category: 'general',
    querry: ''
}
News.propTypes = {
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    querry: PropTypes.string,
    apiKey:PropTypes.string.isRequired
}
export default News