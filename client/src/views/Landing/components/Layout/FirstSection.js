import React, { Component, createElement } from 'react'
import { inject, observer } from 'mobx-react'
import QueueAnim from 'rc-queue-anim'
import { Row, Col } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'


@inject('stores')
@observer
class FirstSection extends Component {
  render () {
    const { firstSection } = this.props.stores.landing.currentLangData

    const listChildren = firstSection.block.map((item, i) => {
      return (
        <Col
          key={i.toString()} className='block'
          md={8} xs={24}
        >
          <div className='icon'>
            <img src={item.iconLink} width='100%' alt='img' />
          </div>
          <h3 className='content0-title'>{item.title}</h3>
          <div>{item.description}</div>
        </Col>
      )
    })

    return (
      <div className='home-page-wrapper content0-wrapper'>
        <div className='home-page content0'>
          <div className='title-wrapper'>
            {firstSection.title.map(item =>
              createElement(item.name.indexOf('title') === 0 ? 'h1' : 'div',
                {
                  key: item.key,
                  className: item.name.indexOf('title') === 0 ? 'title-h1' : 'title-content'
                },
                typeof item.text === 'string' && item.text.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
                  ? createElement('img', {
                    src: item.text,
                    height: '100%',
                    alt: 'img'
                  })
                  : item.text))}
          </div>
          <OverPack playScale={0.3} className=''>
            <QueueAnim
              className='block-wrapper'
              type='bottom'
              key='block'
              leaveReverse
              component={Row}
            >
              {listChildren}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    )
  }
}

export default FirstSection
