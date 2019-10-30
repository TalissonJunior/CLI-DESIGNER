import * as d3 from 'd3';

/**
 * https://codepen.io/billdwhite/pen/lCAdi
 * Minimap
 */
export class Minimap {
  minimapScale = 0.15;
  host = null;
  base = null;
  target;
  zoom: d3.ZoomBehavior<Element, unknown>;
  container;
  frame;
  width = 0;
  height = 0;
  x = 0;
  y = 0;

  constructor(selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
    this.base = selection;

    this.zoom = d3.zoom().scaleExtent([0.5, 5]);
    this.zoom.on('zoom', this.zoomHandler);

    var container = selection.append('g').attr('class', 'minimap');

    container.call(this.zoom);

    this.frame = container.append('g').attr('class', 'frame');

    this.frame
      .append('rect')
      .attr('class', 'background')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('filter', 'url(#minimapDropShadow_qPWKOg)');

    //this.updateMinimapZoomExtents();
  }

  // updates the zoom boundaries based on the current size and scale
  updateMinimapZoomExtents(): void {
    var scale = 0;
    var targetWidth = parseInt(this.target.attr('width'));
    var targetHeight = parseInt(this.target.attr('height'));
    var viewportWidth = this.host.width();
    var viewportHeight = this.host.height();
    this.zoom.translateExtent([
      [-viewportWidth / scale, -viewportHeight / scale],
      [
        viewportWidth / scale + targetWidth,
        viewportHeight / scale + targetHeight
      ]
    ]);
  }

  zoomHandler() {
    this.frame.attr('transform', d3.event.transform);
    // here we filter out the emitting of events that originated outside of the normal ZoomBehavior; this prevents an infinite loop
    // between the host and the minimap
    if (
      d3.event.sourceEvent instanceof MouseEvent ||
      d3.event.sourceEvent instanceof WheelEvent
    ) {
      // invert the outgoing transform and apply it to the host
      var transform = d3.event.transform;
      // ordering matters here! you have to scale() before you translate()
      var modifiedTransform = d3.zoomIdentity
        .scale(1 / transform.k)
        .translate(-transform.x, -transform.y);
      this.host.update(modifiedTransform);
    }

    this.updateMinimapZoomExtents();
  }

  update(hostTransform) {
    // invert the incoming zoomTransform; ordering matters here! you have to scale() before you translate()
    var modifiedTransform = d3.zoomIdentity
      .scale(1 / hostTransform.k)
      .translate(-hostTransform.x, -hostTransform.y);
    // call this.zoom.transform which will reuse the handleZoom method below
    this.zoom.transform(this.frame, modifiedTransform);
    // update the new transform onto the minimapCanvas which is where the zoomBehavior stores it since it was the call target during initialization
    this.container.property('__zoom', modifiedTransform);

    this.updateMinimapZoomExtents();
  }

  render() {
    // update the placement of the minimap
    this.container.attr(
      'transform',
      'translate(' + this.x + ',' + this.y + ')scale(' + this.minimapScale + ')'
    );
    // update the visualization being shown by the minimap in case its appearance has changed
    var node = this.target.node().cloneNode(true);
    node.removeAttribute('id');
    this.base.selectAll('.minimap .panCanvas').remove();

    d3.select(node).attr('transform', 'translate(0,0)');
    // keep the minimap's viewport (frame) sized to match the current visualization viewport dimensions
    this.frame
      .select('.background')
      .attr('width', this.width)
      .attr('height', this.height);
    this.frame.node().parentNode.appendChild(this.frame.node());
  }

  setWidth(value) {
    if (!arguments.length) return this.width;
    this.width = parseInt(value, 10);
    return this;
  }

  setHeight(value) {
    if (!arguments.length) return this.height;
    this.height = parseInt(value, 10);
    return this;
  }

  setX(value) {
    if (!arguments.length) return this.x;
    this.x = parseInt(value, 10);
    return this;
  }

  setY(value) {
    if (!arguments.length) return this.y;
    this.y = parseInt(value, 10);
    return this;
  }

  setHost(value) {
    if (!arguments.length) return this.host;
    this.host = value;
    return this;
  }

  setMinimapScale(value) {
    if (!arguments.length) return this.minimapScale;
    this.minimapScale = value;
    return this;
  }

  setTarget(value) {
    if (!arguments.length) return this.target;
    this.target = value;
    this.width = parseInt(this.target.attr('width'), 10);
    this.height = parseInt(this.target.attr('height'), 10);
    return this;
  }
}
