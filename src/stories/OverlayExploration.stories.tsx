import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Meta} from '@storybook/react'

import {BaseStyles, Box, ThemeProvider} from '..'
import Heading from '../Heading'
import DropdownButton from '../Button'
import {AnchoredOverlay} from '../AnchoredOverlay'
import {registerPortalRoot} from '../Portal'

export default {
  title: 'Internal components/Overlay/Overlay explorations',
  decorators: [
    Story => {
      return (
        <ThemeProvider>
          <BaseStyles>
            <Story />
          </BaseStyles>
        </ThemeProvider>
      )
    }
  ]
} as Meta

const HeaderAndLayout = ({children}: {children: JSX.Element}) => {
  const scrollingElementRef = useRef(null)
  useEffect(() => {
    if (scrollingElementRef.current) {
      registerPortalRoot(scrollingElementRef.current)
    }
  }, [scrollingElementRef])
  return (
    <Box position="absolute" top={0} right={0} bottom={0} left={0} padding={4} backgroundColor="lavenderblush">
      <Heading>Header or some such</Heading>
      <Box
        ref={scrollingElementRef}
        position="absolute"
        top={10}
        right={4}
        bottom={4}
        left={4}
        overflow="scroll"
        backgroundColor="powderblue"
        className="scrolling-element"
      >
        {children}
      </Box>
    </Box>
  )
}

const ButtonWithAnchoredOverlay = () => {
  const [open, setOpen] = useState(false)

  return (
    <AnchoredOverlay
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      width="small"
      height="auto"
      renderAnchor={props => <DropdownButton {...props}>Kitten, please</DropdownButton>}
    >
      <Box width="100%" height="100%" backgroundColor="thistle" display="flex" flexDirection="column">
        <img src={`//placekitten.com/200/300`} alt="kitten" />
      </Box>
    </AnchoredOverlay>
  )
}
export const CurrentBehavior = () => {
  const rows = 40
  const columns = 20
  return (
    <HeaderAndLayout>
      <table>
        <tbody>
          {Array(rows)
            .fill(null)
            .map((_, i) => (
              <tr key={i}>
                {Array(columns)
                  .fill(null)
                  .map((_, j) => (
                    <td key={`${i}${j}`}>
                      <Box m={2}>
                        <ButtonWithAnchoredOverlay />
                      </Box>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </HeaderAndLayout>
  )
}
