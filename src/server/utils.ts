
/**
 * Given a bounding box, returns a random point within the bounding box.
 * 
 * @param topLeft - The top left corner of the rectangle
 * @param topRight - The top right corner of the rectangle
 * @param bottomLeft - The bottom left corner of the rectangle
 * @param bottomRight - The bottom right corner of the rectangle
 * @returns 
 */
export const generateRandomPoints = (topLeft, topRight, bottomLeft, bottomRight) => {
  const longWidth = Math.abs(topLeft.lng - topRight.lng)
  const latWidth = Math.abs(topRight.lat - bottomRight.lat)
  const randomPoints: { lat: number, lng: number }[] = [];

  for (let i = 0; i < 5; i++) {
    const randomWidth = ((longWidth * 1000) * Math.random() / 1000)
    const randomHeight = ((latWidth * 1000) * Math.random() / 1000)
    randomPoints.push({ 'lat': bottomLeft.lat + randomHeight, 'lng': topRight.lng - randomWidth })
  }

  return randomPoints;
}