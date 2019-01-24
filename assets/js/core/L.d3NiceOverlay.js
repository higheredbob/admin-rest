(function (factory) {
if (typeof define === 'function' && define.amd) {
       define(['leaflet', 'd3'], factory);
   } else if (typeof module === 'object' && module.exports) {
       module.exports = factory(require('leaflet', 'd3'));
   } else {
       factory(L, d3);
   }
}(function (L, d3) {

d3.select('head')
    .append("style").attr("type", "text/css")
    .text("g.niceOverlay *{pointer-events: visiblePainted;}");
L.NiceAnlayer = L.SVG.extend({
    includes: L.Evented || L.Mixin.Events,
    _undef: function(a){ return typeof a == undefined },
    _options : function(options) {
        if (this._undef(options)) {
            return this.options;
        }

        options.radius = this._undef(options.radius ) ? 10 : options.radius;
        options.opacity = this._undef(options.opacity ) ? 0.9 : options.opacity;
        options.duration = this._undef(options.duration ) ? 20000 : options.duration;
        options.zoomhide = this._undef(options.zoomhide ) ? false : options.zoomhide;
        options.zoomdraw = this._undef(options.zoomdraw ) ? true : options.zoomdraw;
        options.colorScaleExtent = this._undef(options.colorScaleExtent ) ? [1, undefined] : options.colorScaleExtent;
        options.radiusScaleExtent = this._undef(options.radiusScaleExtent ) ? [1, undefined] : options.radiusScaleExtent;
        options.timeScaleExtent = this._undef(options.timeScaleExtent ) ? [1, undefined] : options.timeScaleExtent;
        options.distanceScaleExtent = this._undef(options.distanceScaleExtent ) ? [1, undefined] : options.distanceScaleExtent;
        options.colorDomain = this._undef(options.colorDomain ) ? null  : options.colorDomain;
        options.timeDomain = this._undef(options.timeDomain ) ? null : options.timeDomain;
        options.distanceDomain = this._undef(options.distanceDomain ) ? null : options.distanceDomain;
        options.radiusDomain = this._undef(options.radiusDomain ) ? null : options.radiusDomain;
        options.colorRange = this._undef(options.colorRange ) ? ['#f7fbff', '#08306b'] : options.colorRange;
        options.radiusRange = this._undef(options.radiusRange ) ? [4, 14] : options.radiusRange;
        options.pointerEvents = this._undef(options.pointerEvents ) ? 'all' : options.pointerEvents;
        options.drawCb = this._undef(options.drawCb ) ?  d3.select('niceOverlay').append('g') : options.drawCb;
        return this.options = options;
    },
    _disableRounding: function(){
        this._l_round = L.Point.prototype._round;
        L.Point.prototype._round = function(){ return this; };
    },

    _enableRounding: function(){
        L.Point.prototype._round = this._l_round;
    },
    draw: function () {
        this._disableRounding();
        this._drawCb(this.selection, this.projection, this.map.getZoom());
        this._enableRounding();
    },
    initialize: function(drawCb, options) {

        this._fn = {
            x: function(d) {return d[1]; },
            y: function(d) {return d[0]; },
            xx: function(d) {return [d[1], d[0]]; },
            yy: function(d) {return [d[1], d[0]]; },
            cVal: function(d) { return d.color; },
            rVal: function(d) { return d.rad; },
            tVal: function(d) { return (d.time / 60000); },
            dVal: function(d) {return d.distance }
        };

        this._scale = {
                color: d3.scaleLinear(),
                radius: d3.scaleLinear(),
                time: d3.scaleTime()
        };
        this._dispatch = d3.dispatch('mouseover', 'mouseout', 'click');
        this._data = [];
        //this._scale.color
        //    .range(this._options.colorRange)
        //    .clamp(true);

        //this._scale.radius
        //    .range(this._options.radiusRange)
        //    .clamp(true);
        this._options(options || {});
        this._drawCb = drawCb;
        },
        _zoomChange: function (e) {
            this._disableRounding();
            /*
            var newZoom = this._undef(e.zoom) ? this.map._zoom : e.zoom; // "viewreset" event in Leaflet has not zoom/center parameters like zoomanim
            this._zDiff = newZoom - this._zoom;
            this._scale = Math.pow(2, this._zDiff);
            this.project.scale = this._scale;
            this._shift = this.map.latLngToLayerPoint(this._wgsOrigin)
                ._subtract(this._wgsShift.multiplyBy(this._scale));

            var shift = ["translate(", this._shift.x, ",", this._shift.y, ") "];
            var scale = ["scale(", this._scale, ",", this._scale,") "];
            this._selectGrp.attr("transform", shift.concat(scale).join(""));

            if (this.options.zoomdraw) { this.draw() }
                */
            this._enableRounding();
        },
        onAdd : function(map) {
            //L.prototype.onAdd.call(this);
            this._map = map;
            map.on({'moveend': this.draw}, this);

            this._projectionSVG(map);
        },
        onRemove : function(map) {
            L.SVG.prototype.onRemove.call(this);
            this._destroyContainer();
            map.off({'moveend': this.redraw}, this);
            this._map = null

        },
        _initContainer : function(){
            L.SVG.prototype._initContainer.call(this);
            this._d3Container = d3.select(this._container).select('g');
        },
        _destroyContainer: function(){

        },
        redraw: function() {
            var that = this;
            if(!that._map) {
                return;
            }
            var data = that._data.map(function(d) {
                var lng = that._fn.lng(d);
                var lat = that._fn.lat(d);
                var point = that._projet([lng, lat]);
                return { o: d, point: point};
            });
            var jo = this._d3Container.selectAll('g.nicemarkers')
                    .data([ this._map.getZoom()], function(d) {return d;});
            var jm = this._d3Container.selectAll('g.nicelines')
                    .data([ this._map.getZoom() ], function(d) {return d; });

            var enta = jo.enter().append('g')
                .attr('class', function(d) {return 'nicemarker zoom-'+d; });
             var entr = jm.enter().append('g')
                .attr('class', function(d) {return 'nicelines zoom-' + d; });

            var entajo = enta.merge(jo);
            var enterUp = entr.merge(jm);
            jo.exit().remove();
            jm.exit().remove();
            this._createLines(enterUp, data);
            this._createMarkers(entajo, data);

        },
        _projectionSVG(map) {
            this.map = map
            var _layer = this;

        //this._svg = L.SVG.create('svg');//L.svg();
        //this.getPane().appendChild(this._svg);
        // this._svg.setAttribute('pointer-events', 'none');

        //if (this.options.zIndex !== undefined) {
        //            this._svg.style.zIndex = this.options.zIndex;
        //}

        //L.DomUtil.setOpacity(this._svg, this.options.opacity);
        //map.addLayer(this._svg);

        this._selectGrp = d3.select(this._svg._selectGrp).classed('niceOverlay', true);
        this.selection = this._selectGrp
        //.append('g');
        //this._selectGrp.classed('leaflet-zoom-hide', this.options.zoom);
        this.selection = this._svg;;
        this._pixels = map.getPixelOrigin();
        this._wgsOrigin = L.latLng([0,0]);
        this.wgsShift = this.map.latLngToLayerPoint(this._wgsOrigin);
        //this._zoom = this.map.getZoom();
        this._shift = L.point(0,0);
        this._scale = 1;
        this.projection = {
            coordsToPoint: function (latlng) {
                var projectedPoint = _layer.map.project(L.latLng(latlng))._round();
                return projectedPoint._subtract(_layer._pixels);
            },
            pointToCoords: function (point) {
                var projectedPoint = L.point(point).add(_layer._pixels);
                return _layer.map.unproject(projectedPoint);
            },
            applyToLayer: function (d) {
                var projectedPoint = _layer.map.project(new L.LatLng(d[1], d[0]))._round();
                return projectedPoint._subtract(_layer._pixels);
            },
            transitionTween: function(path, transitionPT){
                path.transition()
                    .duration(function(d) {
                        if(d.properties.dur !== undefined){
                            return d.properties.dur
                        } else if(d.properties.ddur !== undefined){
                            return d.properties.ddur
                        } else if(d.properties.duration !== undefined){
                            return d.properties.duration
                        } else if(d.properties.distance !== undefined) {
                            return d.properties.distance + 50 * 45;
                        } else if(d.properties.dist4 !== undefined) {
                            return d.properties.dist4 + 50 * 45;
                        } else {
                            return 45000;
                        }
                    })
                    .attrTween('stroke-dasharray', transitionPT);
                    return this;
            },
            geopathing: function(x, y) {
                var point = _layer.map.latLngtoLayerPoint(new L.LatLng(y, x));
                var str = this.stream.point(point.x, point.y);
                return str;
            },
            applyTwo: function(d) {
                var y = d[1];
                var x = d[0];
                return _layer.map.latLngttoLayerPoint(new L.LatLng(y, x));
            },
            map: _layer.map,
            layer: _layer,
            scale: 1
        };

        this.projection._projectPoint = function(x, y) {
            var point = _layer.projection.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        };

        this.projection.fromGeojson = d3.geoPath().projection(d3.geoTransform({point: this.projection._projectPoint}));
        this.selection = this._selectGrp;
        this.draw();
        },

    onRemove: function (map) {
        this._selectGrp.remove()
    },
    getLatLngs: function (pnts) {
        var that = this;
            this.pnts = this._fn(pnts);
        return this.pnts.map(function(d) {
            return L.latLng(that._fn.x(d), that._fn.y(d));
        });

    },
    addTo: function(map) {
        map.addLayer(this);
        return this;
    },
    toGeoJSON: function () {
        return L.GeoJSON.getFeature(this, {
            type: 'LineString',
            coordinates: L.GeoJSON.latLngsToCoords(this.getLatLngs(), 0)
        });
    },
    _project: function(coord) {
        var point = this._map.latLngToLayerPoint([ coord[1], coord[0]]);
        this._st = this.stream.point(point.x, point.y);
        return this._st;
    }
});
L.NiceLayer = L.Layer.extend({
    includes: L.Mixin.Events,
    _undef: function(a){return typeof a == "undefined"},

    options: function (options) {
        if (this._undef(options)) {
            return this.options;
        }

        options.opacity = this._undef(options.opacity) ? 1.0 : options.opacity;
        options.zIndex = this._undef(options.zIndex) ? undefined : options.zIndex;
        options.layerType = this._undef(options.layerType) ? 'svg' : options.layerType;
        options.rounding = this._undef(options.rounding) ? true : options.rounding;
        options.transform = this._undef(options.transform) ? true : options.transform;

        return this.options = options;
    },


    initialize: function (options) { // (Function(selection, projection)), (Object)options
        L.setOptions(this, options);

    },


    onAdd: function (map) {
        //L.SVG.prototype.onAdd.call(this);
        //map ref, used here and below
        this.map = map;
        this._initPathRoot();

    },
    onRemove: function(map) {
        this._unititPathRoot();
        //L.SVG.prototype.onRemove.call(this);
        //this._destroyContainer();
        map.off({'moveend': this.redraw}, this);
        this._map = null;
    },
    getPathRoot: function () {
        return this._pathRoot;
    },
    getMap: function () {
        return this._map;
    },
    _initPathRoot: function () {
        if (!this._pathRoot) {
            this._pathRoot = L.SVG.create('svg');
            this.getPane().appendChild(this._pathRoot);
            this._pathRoot.setAttribute('pointer-events', 'none');

            if (this.options.zIndex !== undefined) {
                this._pathRoot.style.zIndex = this.options.zIndex;
            }
            L.DomUtil.setOpacity(this._pathRoot, this.options.opacity);
            if (this._map.options.zoomAnimation && L.Browser.any3d) {
                L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-animated');
            } else {
                L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-hide');
            }
            this._svg = this._pathRoot;
            L.DomUtil.addClass(this._pathRoot, 'niceSvg');
            this._updateSvgViewport();
        }

    },
    setOpacity: function (opacity) {
        this.options.opacity = opacity;
        if (this._pathRoot) {
            L.DomUtil.setOpacity(this._pathRoot, this.options.opacity);
        }
        return this;
    },
    setZIndex: function (zIndex) {
        if (zIndex) {
            this.options.zIndex = zIndex;
            if (this._pathRoot) {
                this._pathRoot.style.zIndex = this.options.zIndex;
            }
        }
        return this;
    },
    _unititPathRoot: function () {
        if (this._pathRoot) {
            this.getPane().removeChild(this._pathRoot);
            this.PathRoot = null;
        }
    },

    _initContainer: function() {
        L.SVG.prototype._initContainer.call(this);
        this._d3Container = d3.select(this._container).select('g');
    },

    getEvents: function() {
            var events = {
                moveend: this._updateSvgViewport,
                zoom: this.reset,
                zoomend: this._zoomChange
            };
            if (this._map.options.zoomAnimation && L.Browser.any3d) {
                events.zoomanim = this._animationPathZoom;
                events.zoomend = this._endPathZoom;
                };
         return events;
     },
     _animatePathZoom: function (e) {
        this._pathZooming = true;
        this._updateTransform(e.center, e.zoom);
     },
     _updateTransform: function (center, zoom) {
        var scale = this.map.getZoomScale(zoom, this._zoom),
            position = L.DomUtil.getPosition(this._pathRoot),
            viewHalf = this._map.getSize().multiplyBy(0.5 + this.CLIP_PADDING),
            currentCenterPoint = this._map.projet(this._center, zoom),
            destCenterPoint = this._map.project(center, zoom),
            centerOffset = destCenterPoint.subtract(currentCenterPoint),
            topLefOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);
            L.DomUtil.setTransform(this._pathRoot, topLeftOffset, scale);
     },
     _endPathZoom: function () {
        this._pathZooming = false;
     },
     CLIP_PADDING: (function () {
        var max = L.Browser.mobile ? 1280 : 2000,
        target = (max / Math.max(window.outerWidth, window.outerHeight) - 1) / 2;
            return Math.max(0, Math.min(0.5, target));
     })(),
     _updatePathViewport: function () {

            var p = this.CLIP_PADDING,
                size = this._map.getSize(),
                panePos = L.DomUtil.getPosition(this._map._mapPane),
                min = panePos.multiplyBy(-1)._subtract(size.multiplyBy(p)._round()),
                max = min.add(size.multiplyBy(1 + p * 2)._round());

            this._pathViewport = new L.Bounds(min, max);
        },

        resetSvg: function () {
        },

        reset: function () {
            this.resetSvg(this);
        },
        _updateSvgViewport: function () {
            this._center = this._map.getCenter();

            if (this._pathZooming) {
                // Do not update SVGs while a zoom animation is going on otherwise the animation will break.
                // When the zoom animation ends we will be updated again anyway
                // This fixes the case where you do a momentum move and zoom while the move is still ongoing.
                return;
            }

            this._updatePathViewport();

            var vp = this._pathViewport,
                min = vp.min,
                max = vp.max,
                width = max.x - min.x,
                height = max.y - min.y,
                root = this._pathRoot,
                pane = this.getPane();

            // Hack to make flicker on drag end on mobile webkit less irritating
            if (L.Browser.mobileWebkit) {
                pane.removeChild(root);
            }

            L.DomUtil.setPosition(root, min);
            root.setAttribute('width', width);
            root.setAttribute('height', height);
            root.setAttribute('viewBox', [min.x, min.y, width, height].join(' '));

            if (L.Browser.mobileWebkit) {
                pane.appendChild(root);
            }
        },

        addTo: function (map) {
            map.addLayer(this);
            return this;
        },

});


L.niceOverlay = function (drawCb, options) {
    return new L.NiceAnlayer(drawCb, options);
};
L.niceLayer =  function (options) {
    return new L.NiceLayer(options);
};

}));
