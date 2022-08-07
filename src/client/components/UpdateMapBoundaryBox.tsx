import * as React from 'react'
import { LatLngBounds } from 'leaflet';
import { useMapEvents } from 'react-leaflet'

export const UpdateMapBoundaryBox = ({ setBounds }: { setBounds: any }): null => {
  const setMapBoundary = (mapEvent) => {
    const bottomLeft = mapEvent.getBounds().getNorthWest()
    const topRight = mapEvent.getBounds().getSouthEast()
    const bounds = new LatLngBounds(bottomLeft, topRight)
    setBounds(bounds)
  }

  const mapEvent = useMapEvents({
    load: () => {
      setMapBoundary(mapEvent)
    },
    moveend: () => {
      setMapBoundary(mapEvent)
    },
  })

  return null
}
