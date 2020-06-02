import {RcsbDisplayInterface} from "./RcsbDisplayInterface";
import {ScaleLinear} from "d3-scale";
import {LocationViewInterface} from "../RcsbBoard";
import {RcsbD3Manager} from "../RcsbD3/RcsbD3Manager";
import {
    RcsbFvTrackData,
    RcsbFvTrackDataElementInterface,
    RcsbFvTrackDataMap
} from "../../RcsbDataManager/RcsbDataManager";

interface DisplayElementInterface {
    display: RcsbDisplayInterface;
    id: string;
}
export class RcsbCompositeDisplay implements RcsbDisplayInterface{
    private innerDisplays: Array<DisplayElementInterface> = new Array<DisplayElementInterface>();
    private _height: number = null;
    private _data: RcsbFvTrackDataMap = null;
    private _bgColor: string = null;
    private compositeHeight: number = 0;
    elementClickCallBack: ()=>void = null;
    elementEnterCallBack: ()=>void = null;
    includeTooltip: boolean = null;

    setElementClickCallBack: (f:(d?:RcsbFvTrackDataElementInterface)=>void)=>void = null;
    setElementEnterCallBack: (f:(d?:RcsbFvTrackDataElementInterface)=>void)=>void = null;
    setUpdateDataOnMove: (f:(d:LocationViewInterface)=>Promise<RcsbFvTrackData>)=>void = null;
    setTooltip: (flag: boolean)=>void = null;

    setCompositeHeight(h: number): void{
        this.compositeHeight = h;
    }

    mouseoutCallBack(): void{
        this.innerDisplays.forEach(id=>{
            if(typeof id.display.mouseoutCallBack === "function") {
                id.display.mouseoutCallBack();
            }
        });
    }

    mouseoverCallBack(): void{
        this.innerDisplays.forEach(id=>{
            if(typeof id.display.mouseoverCallBack === "function") {
                id.display.mouseoverCallBack();
            }
        });
    }

    mousemoveCallBack(): void{
        this.innerDisplays.forEach(id=>{
            if(typeof id.display.mousemoveCallBack === "function") {
                id.display.mousemoveCallBack();
            }
        });
    }

    reset(): void{
        this.innerDisplays.forEach(de=>{
            de.display.reset();
        });
    }

    init(width: number, scale:ScaleLinear<number,number>): void{
        this.innerDisplays.forEach((de)=>{
            de.display.init(width, scale, true, this.compositeHeight);
        });
    }

    update(where: LocationViewInterface): void{
        this.innerDisplays.forEach(de=>{
            de.display.update(where, de.id);
        });
    }

    move(): void{
        this.innerDisplays.forEach(de=>{
            de.display.move();
        });
    }

    addDisplay(displayId: string, display: RcsbDisplayInterface){
        this.innerDisplays.push({id: displayId, display: display} as DisplayElementInterface);
    }

    setD3Manager(d3Manager: RcsbD3Manager){
        this.innerDisplays.forEach(de=>{
            de.display.setD3Manager(d3Manager);
        });
    }

    setBoardHighlight(f: (d:RcsbFvTrackDataElementInterface, propFlag?: boolean) => void){
        this.innerDisplays.forEach(de=>{
            de.display.setBoardHighlight(f);
        });
    }

    height(h?: number){
        if(typeof h === "number"){
            this._height = h;
        }
        this.innerDisplays.forEach(de=>{
            de.display.height(h);
        });
        return this._height;
    }

    trackColor(c?: string): string{
        if(typeof c === "string"){
            this._bgColor = c;
        }
        this.innerDisplays.forEach(de=>{
            de.display.trackColor(c);
        });
        return this._bgColor;
    }

    load(d?: RcsbFvTrackDataMap): RcsbFvTrackDataMap{
        if(d !== undefined) {
            this._data = d;
        }
        this.innerDisplays.forEach(de=>{
            de.display.load(d.get(de.id));
        });
        return this._data;
    }

    highlightRegion(d:RcsbFvTrackDataElementInterface): void {
        if(this.innerDisplays.length > 0 ){
            this.innerDisplays[0].display.highlightRegion(d);
        }
    }
}
