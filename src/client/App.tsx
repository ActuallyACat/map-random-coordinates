import { LatLngBounds, LatLngTuple } from 'leaflet';
import * as React from 'react'
import { useState, useEffect } from 'react';
import { CircleMarker, MapContainer, TileLayer } from 'react-leaflet'
import { post } from "./utils"
import { UpdateMapBoundaryBox } from "./components/UpdateMapBoundaryBox"

interface AppProps { }

enum LoadingState {
	Loading,
	Error,
	Complete
}
type Marker = { lat: number, lng: number }

const App = (props: AppProps) => {
	// @TODO: get inital bounds 
	const [bounds, setBounds] = useState<LatLngBounds | null>(null);
	const [apiState, setApiState] = useState<LoadingState>(LoadingState.Complete);
	const [markers, setMarkers] = useState<Marker[]>([]);
	const initialPosition: LatLngTuple = [-32.93, 151.72]

	useEffect(() => {
		async function sendBounds() {
			if (!bounds) return;
			setApiState(LoadingState.Loading)
			try {
				post<{ points: Marker[] }>('points', {
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
				<UpdateMapBoundaryBox setBounds={setBounds} />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{markers.map(({ lat, lng }, i) => (
					<CircleMarker
						key={`marker-${i}`}
						center={[lat, lng]}
						pathOptions={{ color: 'red' }}
						radius={10}>
					</CircleMarker>
				))}
			</MapContainer>
		</main>
	);
};

export default App;