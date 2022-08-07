import { LatLngBounds, LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import * as React from 'react'
import { useState, useEffect } from 'react';
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvents } from 'react-leaflet'
import { post } from "./utils"

interface AppProps { }
enum LoadingState {
	Loading,
	Error,
	Complete
}

const MapBounds = ({ setBounds }: { setBounds: React.Dispatch<React.SetStateAction<LatLngBounds | null>> }) => {
	const map = useMapEvents({
		moveend: () => {
			const bottomLeft = map.getBounds().getNorthWest()
			const topRight = map.getBounds().getSouthEast()
			const bounds = new LatLngBounds(bottomLeft, topRight)
			setBounds(bounds)
		},
	})

	return null
}

const App = (props: AppProps) => {
	// @TODO: get inital bounds 
	const [bounds, setBounds] = useState<LatLngBounds | null>(null);
	const [apiState, setApiState] = useState<LoadingState>(LoadingState.Complete);
	const [markers, setMarkers] = useState<[]>([]);
	const initialPosition: LatLngTuple = [-32.93, 151.72]

	useEffect(() => {
		async function sendBounds() {
			if (!bounds) return;
			setApiState(LoadingState.Loading)
			try {
				// @TODO - better types for expected sent/received data
				post<{ points: any }>('points', {
					topLeft: bounds.getNorthWest(),
					topRight: bounds.getNorthEast(),
					bottomRight: bounds.getSouthEast(),
					bottomLeft: bounds.getSouthWest()
				})
					.then(res => {
						setApiState(LoadingState.Complete)
						setMarkers(res.points)
					})
			} catch (err) {
				setApiState(LoadingState.Error)
				console.error(err)
			}
		}
		sendBounds();
	}, [bounds]);

	return (
		<main className="container my-5">
			<h1>{apiState === 1 && <h1>Loading</h1>}</h1>
			<MapContainer center={initialPosition} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapBounds setBounds={setBounds} />
				{markers.map(({ lat, lng }, i) => (
					<CircleMarker
						key={`marker-${i}`}
						center={[lat, lng]}
						pathOptions={{ color: 'red' }}
						radius={10}>
					</CircleMarker>
				)}
			</MapContainer>
		</main>
	);
};

export default App;