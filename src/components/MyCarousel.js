import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'

export const MyCarousel = ({ items, setPlaylist }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (items.length > 0) setPlaylist(items[activeIndex].id)
  }, [activeIndex])

  const setItem = index => {
    setActiveIndex(index)
  }

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setItem(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setItem(nextIndex)
  }

  const goToIndex = newIndex => {
    if (animating) return
    setItem(newIndex)
  }

  const slides = items.map(item => {
    return (
      <CarouselItem
        key={item.src}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <img src={item.src} alt={item.name} />
        <CarouselCaption captionText={item.name} />
      </CarouselItem>
    )
  })

  return (
    <Carousel
      interval={'10000'}
      pause={'hover'}
      // autoPlay={false}
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  )
}
