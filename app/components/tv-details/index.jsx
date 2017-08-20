import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import globalStyles from 'global-styles'
import cn from 'classnames'
import styles from './styles'
import Genres from '../genres'
import { rating, resolveUrl } from '../../utils'
import Cast from '../cast/async'
import Images from '../image-grid/async'
import MovieCard from '../movie-cards/async'
import Seasons from '../seasons-list/async'


@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
class Details extends Component {

  render () {
    const {
      data,
    } = this.props
    const video = data.videos.results
      .filter(x => ['trailer', 'teaser'].indexOf(x.type.toLowerCase()) > -1)[0]
    const certificatefiltered = data
      .content_ratings
      .results
      .filter(x => x.iso_3166_1 === 'US')[0]
    const certificates = certificatefiltered || {}
    const upcoming = data.status.toLowerCase() !== 'released'
    const start = data.first_air_date
      && data.first_air_date.split('-')[0]
    const end = !data.in_production
      && data.last_air_date
      && data.last_air_date.split('-')[0]
    return (
      <div styleName="details">
        {
          upcoming
          && <div styleName="upcoming">Upcoming</div>
        }
        <div styleName="title">
          {data.name}
        </div>
        <div styleName="cert-runtime">
          {
            certificates.rating
            && <span styleName="cert">
              {certificates.rating}
            </span>
          }
          <span>
            {start} - {end}
          </span>
          <span>
            {data.number_of_seasons} Seasons
          </span>
          <span>
            {data.number_of_episodes} Episodes
          </span>
        </div>
        <div styleName="rating-container">
          <span styleName={cn('rating', rating(data.vote_average))}>
            {data.vote_average.toFixed(1)}
          </span>
          <span styleName="total">
            / 10
          </span>
          <span styleName="votes">
            ({data.vote_count} votes)
          </span>
        </div>
        <div className="genres">
          <Genres data={data.genres} />
        </div>
        <div styleName="description">
          {data.overview}
        </div>
        <div styleName="button-container">
          {
            video
            && <a
              href={`https://youtube.com/watch?v=${video.key}`}
              target="_blank">
              <button styleName="button-primary">
                <i styleName="nc-icon nc-small-triangle-right" />
                <span>{video.type}</span>
              </button>
            </a>
          }
          <a
            target="_blank"
            href={`http://imdb.com/title/${data.imdb_id}`}>
            <button styleName="button-primary imdb">
              <i styleName="nc-icon nc-small-triangle-right" />
              <span>IMDB</span>
            </button>
          </a>
        </div>
        <div styleName="sub-section">
          <h2>Seasons</h2>
          <Seasons
            limit={4}
            tvId={data.id}
            data={data.seasons} />
        </div>
        <div styleName="cast">
          <h2>Top Cast</h2>
          <Cast
            limit={7}
            data={data.credits.cast} />
        </div>
        <div styleName="images">
          <h2>Posters & Photos</h2>
          <Images
            limit={5}
            data={data.images.posters} />
        </div>
        {
          data.recommendations.results.length > 0
          && <div styleName="images">
            <h2>Recommended</h2>
            <MovieCard
              force="tv"
              resolveLink={resolveUrl}
              type="thumbnail"
              limit={6}
              results={data.recommendations.results} />
          </div>
        }
      </div>
    )
  }
}

export default Details