import {Selection, BaseType} from "d3-selection";
import {ScaleLinear} from "d3-scale";
import {RcsbD3Constants} from "../RcsbD3Constants";
import {RcsbD3DisplayManagerInterface} from "./RcsbD3DisplayManagerInterface"
import {RcsbFvTrackDataElementInterface} from "../../../RcsbDataManager/RcsbDataManager";

export interface PlotVlineInterface {
    elements: Selection<SVGGElement,RcsbFvTrackDataElementInterface,BaseType,undefined>;
    xScale: ScaleLinear<number,number>;
    color?: string;
    height: number;
}

export interface MoveVlineInterface {
    elements: Selection<SVGGElement,RcsbFvTrackDataElementInterface,BaseType,undefined>;
    xScale: ScaleLinear<number,number>;
}

export class RcsbD3VlineManager implements RcsbD3DisplayManagerInterface{
    plot(config: PlotVlineInterface){
        config.elements.append (RcsbD3Constants.LINE)
            .attr(RcsbD3Constants.X1, (d:RcsbFvTrackDataElementInterface) => {
                return config.xScale(d.begin);
            })
            .attr(RcsbD3Constants.X2, (d:RcsbFvTrackDataElementInterface)=> {
                return config.xScale(d.begin);
            })
            .attr(RcsbD3Constants.Y1, 0)
            .attr(RcsbD3Constants.Y2, config.height)
            .style(RcsbD3Constants.STROKE, config.color)
            .style(RcsbD3Constants.STROKE_WIDTH, 4);

    }

    move(config:MoveVlineInterface){
        config.elements.select(RcsbD3Constants.LINE)
            .attr(RcsbD3Constants.X1, (d:RcsbFvTrackDataElementInterface) => {
                return config.xScale(d.begin);
            })
            .attr(RcsbD3Constants.X2, (d:RcsbFvTrackDataElementInterface) => {
                return config.xScale(d.begin);
            });
    }

}