import * as d3 from 'd3';

export class Tooltip {
  create(
    parentElement: any,
    value: string,
    tooltiptext: string,
    position: 'bottom' | 'top' | 'left' | 'right' = 'top'
  ): d3.Selection<d3.BaseType, unknown, HTMLElement, any> {
    const tooltip = d3
      .select(parentElement)
      .append('div')
      .attrs({
        class: 'tooltip'
      })
      .text(value);

    tooltip
      .append('span')
      .attrs({
        class: `tooltiptext tooltip-${position}`
      })
      .text(tooltiptext);

    return tooltip;
  }
}
