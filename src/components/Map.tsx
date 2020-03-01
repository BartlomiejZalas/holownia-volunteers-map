import React from 'react';
import ReactDOM from 'react-dom';

import { markers } from '../data/markers';

import ol from 'openlayers';
import 'openlayers/css/ol.css';
import { SimpleDate } from '../data/simpleDate';
import { City } from '../data/cities';

import './Map.css';

interface Props {
    hour: number;
    city: City;
    date: SimpleDate;
}

export class Map extends React.Component<Props, any> {

    componentDidUpdate() {
        const markersFiltered = markers.filter(m =>
            m.city.name === this.props.city.name &&
            this.props.hour < m.hourEnd &&
            this.props.hour > m.hourStart);

        var layer = new ol.source.Vector({
            features: markersFiltered.map(m => new ol.Feature(
                { 
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([m.long, m.lat])),
                    description:  m.description,
                }))
        });
        this.state.featuresLayer.setSource(layer);
    }
    componentDidMount() {
        const content = (ReactDOM.findDOMNode(this) as HTMLElement)!.parentElement!.querySelector('#popup-content')!;
        const container = (ReactDOM.findDOMNode(this) as HTMLElement)!.parentElement!.querySelector('#popup')!;
        const closer: any = (ReactDOM.findDOMNode(this) as HTMLElement)!.parentElement!.querySelector('#popup-closer')!;

        closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
          };

        var actionStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                src: require('../img/marker.png'),
                scale: 0.5,
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
            })),
        });
        var constantStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                scale: 0.6,
                src: require('../img/icon.png'),
            })),
        });
        var featuresLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: []
            }),
            style: actionStyle,
        }); 
        var featuresLayer2 = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [new ol.Feature(
                    { 
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([17.038538, 51.107883])),
                        description:  'HEJECZKA KONSTA',
                    })]
            }),
            style: constantStyle,
        }); 
        
        var overlay = new ol.Overlay({
            element: container,
            autoPan: true,
          });
        var map = new ol.Map({
            target: this.refs.mapContainer,
            layers: [
                new ol.layer.Tile({ source: new ol.source.OSM() }),
                featuresLayer,
                featuresLayer2,
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([17.038538, 51.107883]),
                zoom: 9,
            }),
            overlays: [overlay],
        } as any);

        map.on('singleclick', function(evt: any) {
            var feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
            if (feature) {
                content.innerHTML = feature.get('description');
                var coordinate = evt.coordinate;
                overlay.setPosition(coordinate);
            } else {
                overlay.setPosition(undefined);
            }
            
          });

        this.setState({
            map: map,
            featuresLayer: featuresLayer
        });

    }

    render() {
        return (
            <>
                <div ref="mapContainer" style={{ width: '100%', height: '100%', position: 'fixed' }} />
               
                <div id="popup" className="ol-popup">
                    <span id="popup-closer" className="ol-popup-closer" />
                    <div id="popup-content">hejka</div>
                </div>
            </>
        );
    }

}