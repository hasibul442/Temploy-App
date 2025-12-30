import React from 'react'
import RenderHTML from 'react-native-render-html'

function JobDescription({description}) {
  return (
    <>
    <RenderHTML source={{ html: description }} />
    </>
  )
}

export default JobDescription