import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { placeholderImage, translate, truncateText } from '../../utils'
import { useState } from 'react'
import VideoPlayerModal from '../videoplayer/VideoPlayerModal'
import { BsFillPlayFill } from 'react-icons/bs'
import AdSpaces from '../view/adSpaces/AdSpaces'
import CommonViewMoreDiv from './CommonViewMoreDiv'

const StyleTwo = ({ Data }) => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [Video_url, setVideo_url] = useState()
  const [modalShow, setModalShow] = useState(false)
  const [typeUrl, setTypeUrl] = useState(null)

  const navigate = useRouter()

  const handleVideoUrl = url => {
    setModalShow(true)
    setVideo_url(url)
  }

  const TypeUrl = type => {
    setTypeUrl(type)
  }

  return (
    <>
      {/* videos */}
      {Data.videos && Data.videos?.length > 0 ? (
        <div className='new_video_style_two'>
          <div className='container'>
            {/* ad spaces */}
            {Data.ad_spaces && Data.id === Data.ad_spaces.ad_featured_section_id ? (
              <>
                <AdSpaces ad_url={Data.ad_spaces.ad_url} ad_img={Data.ad_spaces.web_ad_image} style_web={'two'} />
              </>
            ) : null}
            <div id='hns-head' className='row'>
              <CommonViewMoreDiv title={Data && Data.title} desc={Data && Data.short_description} link={`/video-news-view/${Data.slug}`} />
            </div>
            <div className='row'>
              <div className='col-md-3'>
                {Data.videos[0] ? (
                  <div
                    className='video_first_top card card_hover'
                    onClick={() => {
                      handleVideoUrl(Data.videos[0].content_value)
                      TypeUrl(Data.videos[0].type)
                    }}
                  >
                    <img src={Data.videos[0] && Data.videos[0].image} alt={Data.videos[0] && Data.videos[0].title} onError={placeholderImage} />
                    <div className='video_button'>
                      <BsFillPlayFill className='pulse' fill='white' size={50} />
                    </div>
                    <div className='content'>
                      <p>{Data.videos[0] && Data.videos[0].title}</p>
                    </div>
                  </div>
                ) : null}

                {Data.videos[1] ? (
                  <div
                    className='video_seond_top card card_hover'
                    onClick={() => {
                      handleVideoUrl(Data.videos[1].content_value)
                      TypeUrl(Data.videos[1].type)
                    }}
                  >
                    <img src={Data.videos[1] && Data.videos[1].image} alt={Data.videos[1] && Data.videos[1].title} onError={placeholderImage} />
                    <div className='video_button'>
                      <BsFillPlayFill className='pulse' fill='white' size={50} />
                    </div>
                    <div className='content'>
                      <p>{Data.videos[1] && Data.videos[1].title}</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='col-md-6'>
                {Data.videos[2] ? (
                  <div
                    className='video_center card card_hover'
                    onClick={() => {
                      handleVideoUrl(Data.videos[2].content_value)
                      TypeUrl(Data.videos[2].type)
                    }}
                  >
                    <img src={Data.videos[2] && Data.videos[2].image} alt={Data.videos[2] && Data.videos[2].title} onError={placeholderImage} />
                    <div className='video_button'>
                      <BsFillPlayFill className='pulse' fill='white' size={50} />
                    </div>
                    <div className='content'>
                      <p>{Data.videos[2] && Data.videos[2].title}</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='col-md-3'>
                {Data.videos[3] ? (
                  <div
                    className='video_top_right card card_hover'
                    onClick={() => {
                      handleVideoUrl(Data.videos[3].content_value)
                      TypeUrl(Data.videos[3].type)
                    }}
                  >
                    <img src={Data.videos[3] && Data.videos[3].image} alt={Data.videos[3] && Data.videos[3].title} onError={placeholderImage} />
                    <div className='video_button'>
                      <BsFillPlayFill className='pulse' fill='white' size={50} />
                    </div>
                    <div className='content'>
                      <p>{Data.videos[3] && Data.videos[3].title}</p>
                    </div>
                  </div>
                ) : null}

                {Data.videos[4] ? (
                  <div
                    className='video_bottom_right card card_hover'
                    onClick={() => {
                      handleVideoUrl(Data.videos[4].content_value)
                      TypeUrl(Data.videos[4].type)
                    }}
                  >
                    <img src={Data.videos[4] && Data.videos[4].image} alt={Data.videos[4] && Data.videos[4].title} />
                    <div className='video_button'>
                      <BsFillPlayFill className='pulse' fill='white' size={50} onError={placeholderImage} />
                    </div>
                    <div className='content'>
                      <p>{Data.videos[4] && Data.videos[4].title}</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <VideoPlayerModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                // backdrop="static"
                keyboard={false}
                url={Video_url}
                type_url={typeUrl}
              // title={Data[0].title}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* news */}
      {Data && Data.news?.length > 0 ? (
        <div className='new_video_style_two'>
          <div className='container'>
            {/* ad spaces */}
            {Data && Data.ad_spaces && Data.id === Data.ad_spaces.ad_featured_section_id ? (
              <>
                <AdSpaces ad_url={Data.ad_spaces.ad_url} ad_img={Data.ad_spaces.web_ad_image} style_web={'two'} />
              </>
            ) : null}
            <div id='hns-head' className='row'>
              <CommonViewMoreDiv title={Data && Data.title} desc={Data && Data.short_description} link={`/view-all/${Data.slug}`} />
            </div>
            <div className='row'>

              <div className='col-md-3'>
                {Data.news[0] ? (
                  <Link
                    href={{ pathname: `/news/${Data.news[0].slug}`, query: { language_id: Data.news[0].language_id } }}
                    as={`/news/${Data.news[0].slug}`}
                  >
                    <div
                      className='video_first_top card card_hover'
                    >
                      <img src={Data.news[0] && Data.news[0].image} alt={truncateText(Data.news[0].category_name, 10)} onError={placeholderImage} />

                      <div className='content'>
                        <span>{truncateText(Data.news[0].category_name, 10)}</span>
                        <p>{Data.news[0] && Data.news[0].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}

                {Data.news[1] ? (
                  <Link
                    href={{ pathname: `/news/${Data.news[1].slug}`, query: { language_id: Data.news[1].language_id } }}
                    as={`/news/${Data.news[1].slug}`}
                  >
                    <div
                      className='video_seond_top card card_hover'
                    >
                      <img src={Data.news[1] && Data.news[1].image} alt={truncateText(Data.news[1].category_name, 10)} onError={placeholderImage} />

                      <div className='content'>
                        <span>{truncateText(Data.news[1].category_name, 10)}</span>
                        <p>{Data.news[1] && Data.news[1].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
              <div className='col-md-6'>
                {Data.news[2] ? (
                  <Link
                    href={{ pathname: `/news/${Data.news[2].slug}`, query: { language_id: Data.news[2].language_id } }}
                    as={`/news/${Data.news[2].slug}`}
                  >
                    <div
                      className='video_center card card_hover'
                    >
                      <img src={Data.news[2] && Data.news[2].image} alt={truncateText(Data.news[2].category_name, 10)} onError={placeholderImage} />

                      <div className='content'>
                        <span>{truncateText(Data.news[2].category_name, 10)}</span>
                        <p>{Data.news[2] && Data.news[2].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
              <div className='col-md-3'>
                {Data.news[3] ? (
                  <Link
                    href={{ pathname: `/news/${Data.news[3].slug}`, query: { language_id: Data.news[3].language_id } }}
                    as={`/news/${Data.news[3].slug}`}
                  >
                    <div
                      className='video_top_right card card_hover'
                    >
                      <img src={Data.news[3] && Data.news[3].image} alt={truncateText(Data.news[3].category_name, 10)} onError={placeholderImage} />

                      <div className='content'>
                        <span>{truncateText(Data.news[3].category_name, 10)}</span>
                        <p>{Data.news[3] && Data.news[3].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}

                {Data.news[4] ? (
                  <Link
                    href={{ pathname: `/news/${Data.news[4].slug}`, query: { language_id: Data.news[4].language_id } }}
                    as={`/news/${Data.news[4].slug}`}
                  >
                    <div
                      className='video_bottom_right card card_hover'
                    >
                      <img src={Data.news[4] && Data.news[4].image} alt={truncateText(Data.news[4].category_name, 10)} onError={placeholderImage} />

                      <div className='content'>
                        <span>{truncateText(Data.news[4].category_name, 10)}</span>
                        <p>{Data.news[4] && Data.news[4].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* breaking news */}
      {Data && Data.breaking_news?.length > 0 ? (
        <div className='new_video_style_two'>
          <div className='container'>
            {/* ad spaces */}
            {Data.ad_spaces && Data.id === Data.ad_spaces.ad_featured_section_id ? (
              <>
                <AdSpaces ad_url={Data.ad_spaces.ad_url} ad_img={Data.ad_spaces.web_ad_image} style_web={'two'} />
              </>
            ) : null}
            <div id='hns-head' className='row'>
              <CommonViewMoreDiv title={Data && Data.title} desc={Data && Data.short_description} link={`/view-all/${Data.slug}`} />
            </div>
            <div className='row'>
              <div className='col-md-3'>
                {Data.breaking_news[0] ? (
                  <Link
                    href={{ pathname: `/breaking-news/${Data.breaking_news[0].slug}`, query: { language_id: Data.breaking_news[0].language_id } }}
                    as={`/breaking-news/${Data.breaking_news[0].slug}`}
                  >
                    <div
                      className='video_first_top card card_hover'
                    >
                      <img
                        src={Data.breaking_news[0] && Data.breaking_news[0].image}
                        alt={Data.breaking_news[0] && Data.breaking_news[0].title}
                        onError={placeholderImage}
                      />

                      <div className='content'>
                        <p>{Data.breaking_news[0] && Data.breaking_news[0].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}

                {Data.breaking_news[1] ? (
                  <Link
                    href={{ pathname: `/breaking-news/${Data.breaking_news[1].slug}`, query: { language_id: Data.breaking_news[1].language_id } }}
                    as={`/breaking-news/${Data.breaking_news[1].slug}`}
                  >
                    <div
                      className='video_seond_top card card_hover'
                    >
                      <img
                        src={Data.breaking_news[1] && Data.breaking_news[1].image}
                        alt={Data.breaking_news[1] && Data.breaking_news[1].title}
                        onError={placeholderImage}
                      />

                      <div className='content'>
                        <p>{Data.breaking_news[1] && Data.breaking_news[1].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
              <div className='col-md-6'>
                {Data.breaking_news[2] ? (
                  <Link
                    href={{ pathname: `/breaking-news/${Data.breaking_news[2].slug}`, query: { language_id: Data.breaking_news[2].language_id } }}
                    as={`/breaking-news/${Data.breaking_news[2].slug}`}
                  >
                    <div
                      className='video_center card card_hover'
                      onClick={() => navigate.push({ pathname: `/breaking-news/${Data.breaking_news[2].slug}` })}
                    >
                      <img
                        src={Data.breaking_news[2] && Data.breaking_news[2].image}
                        alt={Data.breaking_news[2] && Data.breaking_news[2].title}
                        onError={placeholderImage}
                      />

                      <div className='content'>
                        <p>{Data.breaking_news[2] && Data.breaking_news[2].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
              <div className='col-md-3'>
                {Data.breaking_news[3] ? (
                  <Link
                    href={{ pathname: `/breaking-news/${Data.breaking_news[3].slug}`, query: { language_id: Data.breaking_news[3].language_id } }}
                    as={`/breaking-news/${Data.breaking_news[3].slug}`}
                  >
                    <div
                      className='video_top_right card card_hover'
                      onClick={() => navigate.push({ pathname: `/breaking-news/${Data.breaking_news[3].slug}` })}
                    >
                      <img
                        src={Data.breaking_news[3] && Data.breaking_news[3].image}
                        alt={Data.breaking_news[3] && Data.breaking_news[3].title}
                        onError={placeholderImage}
                      />

                      <div className='content'>
                        <p>{Data.breaking_news[3] && Data.breaking_news[3].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}

                {Data.breaking_news[4] ? (
                  <Link
                    href={{ pathname: `/breaking-news/${Data.breaking_news[4].slug}`, query: { language_id: Data.breaking_news[4].language_id } }}
                    as={`/breaking-news/${Data.breaking_news[4].slug}`}
                  >
                    <div
                      className='video_bottom_right card card_hover'
                      onClick={() => navigate.push({ pathname: `/breaking-news/${Data.breaking_news[4].slug}` })}
                    >
                      <img
                        src={Data.breaking_news[4] && Data.breaking_news[4].image}
                        alt={Data.breaking_news[4] && Data.breaking_news[4].title}
                        onError={placeholderImage}
                      />

                      <div className='content'>
                        <p>{Data.breaking_news[4] && Data.breaking_news[4].title}</p>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default StyleTwo
