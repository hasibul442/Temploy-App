import React from 'react'
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html'

function JobDescription({ description }) {
  const { width } = useWindowDimensions();
  return (
    <>
      <RenderHTML contentWidth={width} source={{ html: description }} />
    </>
  )
}

export default JobDescription