import * as React from 'react'
import { Dimensions, Image, ImageSourcePropType, Platform } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import ImageA from '../assets/bring-a-friend.jpeg'
import ImageB from '../assets/fiat-gateway.jpeg'
import ImageC from '../assets/dollar-cost-average.png'
import ImageD from '../assets/bring-a-friend-2.jpeg'
import ImageE from '../assets/bring-a-friend-3.jpeg'
import { View } from './index'
import { AppIcon } from './icons/AppIcon'
import { ThemedText } from './themed'
import { useThemeContext } from '../contexts/ThemeProvider'
import { tailwind } from '../tailwind'
import { theme } from '../tailwind.config'

interface CarouselImage {
  image: ImageSourcePropType
  title: string
  secondTitle: string
  subtitle: string
}

const slides: JSX.Element[] = [
  <ImageSlide
    image={ImageA}
    key={1}
    secondTitle='1/bring-a-friend.jpeg: of your digital assets'
    subtitle='Nobody owns your keys and wallet except you.'
    title='Take full control'
  />,
  <ImageSlide
    image={ImageB}
    key={2}
    secondTitle='2/fiat-gateway.jpeg: potential of your finances'
    subtitle='Transact, liquidity mine, swap and many more features as a fully-decentralized wallet'
    title='Unlock the highest'
  />,
  <ImageSlide
    image={ImageC}
    key={3}
    secondTitle='3/dollar-cost-average.png: potential of your finances'
    subtitle='Transact, liquidity mine, swap and many more features as a fully-decentralized wallet'
    title='Unlock the highest'
  />,
  <ImageSlide
    image={ImageD}
    key={4}
    secondTitle='4/bring-a-friend-2.jpeg: potential of your finances'
    subtitle='Transact, liquidity mine, swap and many more features as a fully-decentralized wallet'
    title='Unlock the highest'
  />,
  <ImageSlide
    image={ImageE}
    key={5}
    secondTitle='5/bring-a-friend-3.jpeg: of up to 90% with DEX'
    subtitle='Supply liquidity to BTC, ETH, and many other pool pairs. You can also withdraw anytime!'
    title='Earn high yields'
  />]

// Needs for it to work on web. Otherwise, it takes full window size
// TODO: what width to set here for the web? upon copying this from wallet this used to be 375px
const { width } = Platform.OS === 'web' ? { width: '800px' } : Dimensions.get('window')

export function ImageSlide ({ image, title, secondTitle, subtitle }: CarouselImage): JSX.Element {
  return (
    <View style={tailwind('flex-1 items-center justify-center py-8 px-5')}>
      <View style={tailwind('h-2/6 items-center justify-center')}>
        <ThemedText style={tailwind('text-2xl font-bold text-center')}>
          {/* TODO it used to be: translate('screens/OnboardingCarousel', title) */}
          {title}
        </ThemedText>

        <ThemedText style={tailwind('text-2xl font-bold text-center')}>
          {/* TODO it used to be: translate('screens/OnboardingCarousel', secondTitle) */}
          {secondTitle}
        </ThemedText>

        <ThemedText
          dark={tailwind('text-gray-400')}
          light={tailwind('text-gray-500')}
          style={tailwind('font-normal text-center mt-1 mb-8')}
        >
          {/* TODO it used to be: translate('screens/OnboardingCarousel', subtitle) */}
          {subtitle}
        </ThemedText>
      </View>

      <Image
        source={image}
        style={{ width, height: '100%' }}
      />
    </View>
  )
}

export function OnboardingCarousel (): JSX.Element {
  // TODO: TypeError: _useThemeContext is undefined
  // const { isLight } = useThemeContext()
  const { isLight } = true

  return (
    <Carousel
      data={slides}

      renderItem={({ item }) => (
        <View style={{ width }}>
          {
            item
          }
        </View>
      )}

      sliderWidth={ 800 }
      itemWidth={ 800 }

      loop
      autoplay
      autoplayDelay={ 1000 }
      autoplayInterval={ 1800 }
    />
  )
}
