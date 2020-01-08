export declare class Chardin {
    private element;
    private idAttr;
    constructor(element: HTMLElement, idAttr?: string);
    start: () => this;
    toggle: () => void;
    refresh: () => void;
    stop: () => void;
    private fadeOutEffect;
    private get _overlay_visible();
    private _add_overlay_layer;
    private _get_position;
    private _place_tooltip;
    private _position_helper_layer;
    private isHidden;
    private isVisible;
    private _show_element;
    private _get_offset;
    private getId;
}
