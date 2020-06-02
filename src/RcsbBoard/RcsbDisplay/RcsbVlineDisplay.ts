import {RcsbCoreDisplay} from "./RcsbCoreDisplay";
import {Selection, BaseType} from "d3-selection";
import {RcsbDisplayInterface} from "./RcsbDisplayInterface";
import {MoveVlineInterface, PlotVlineInterface} from "../RcsbD3/RcsbD3DisplayManager/RcsbD3VlineManager";
import {RcsbFvTrackDataElementInterface} from "../../RcsbDataManager/RcsbDataManager";

export class RcsbVlineDisplay extends RcsbCoreDisplay implements RcsbDisplayInterface{


    plot(elements:Selection<SVGGElement,RcsbFvTrackDataElementInterface,BaseType,undefined>): void {
        super.plot(elements);
        const config: PlotVlineInterface = {
            elements: elements,
            xScale: this.xScale,
            color: this._displayColor,
            height: this._height
        };
        this.d3Manager.plotVlineDisplay(config);
    }

    move(): void{
        const elements: Selection<SVGGElement,RcsbFvTrackDataElementInterface,BaseType,undefined> = this.getElements();
        const config: MoveVlineInterface = {
            elements: elements,
            xScale: this.xScale,
        };
        this.d3Manager.moveVlineDisplay(config);
    }

}