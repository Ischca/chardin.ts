export class Chardin {

  constructor(private element: HTMLElement, private idAttr: string = 'id') {
    window.addEventListener('resize', () => this.refresh());
  }

  start = () => {
    if (this._overlay_visible) {
      return this;
    }
    this._add_overlay_layer();
    let ref = this.element.querySelectorAll<HTMLElement>('*[data-intro]');
    ref.forEach(el => {
      if (this.isVisible(el)) {
        this._show_element(el);
      }
    });
    this.element.dispatchEvent(new Event('chardinJs:start'));
  };

  toggle = () => {
    if (!this._overlay_visible) {
      this.start();
    } else {
      this.stop();
    }
  };

  refresh = () => {
    if (this._overlay_visible) {
      let ref = this.element.querySelectorAll<HTMLElement>('*[data-intro]');
      let results = [];
      ref.forEach(el => {
        results.push(this._position_helper_layer(el));
      });
    }
  };

  stop = () => {
    this.element.querySelectorAll<HTMLElement>(".chardinjs-overlay").forEach(e => this.fadeOutEffect(e));
    this.element.querySelectorAll('.chardinjs-helper-layer').forEach(e => e.remove());
    this.element.querySelectorAll('.chardinjs-show-element').forEach(e => e.classList.remove('chardinjs-show-element'));
    this.element.querySelectorAll('.chardinjs-relative-position').forEach(e => e.classList.remove('chardinjs-relative-position'));
    let ref = this.element.querySelectorAll<HTMLElement>('*[data-intro]');
    ref.forEach(el => {
      el.dataset.helper_layer = null;
      el.dataset.tooltip_layer = null;
    });
    window.removeEventListener("keydown", window.onkeydown, true);
    this.element.dispatchEvent(new Event('chardinJs:stop'));
  };

  private fadeOutEffect = (element: HTMLElement) => {
    const fadeEffect = setInterval(() => {
      if (!element.style.opacity) {
        element.style.opacity = '1';
      }
      let opacity = Number(element.style.opacity);
      if (opacity > 0) {
        element.style.opacity = String(opacity - 0.1);
      } else {
        clearInterval(fadeEffect);
        element.remove();
      }
    }, 50);
  };

  private get _overlay_visible() {
    return this.element.querySelectorAll('.chardinjs-overlay').length !== 0;
  }

  private _add_overlay_layer = () => {
    if (this._overlay_visible) {
      return false;
    }
    let overlay_layer = document.createElement("div");
    let styleText = "";
    overlay_layer.className = "chardinjs-overlay";
    if (this.element.tagName === "BODY") {
      styleText += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;";
      overlay_layer.setAttribute("style", styleText);
    } else {
      let element_position = this._get_offset(this.element);
      if (element_position) {
        styleText += "width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px;left: " + element_position.left + "px;";
        overlay_layer.setAttribute("style", styleText);
      }
    }
    this.element.appendChild(overlay_layer);
    overlay_layer.onclick = (_this => {
      return () => _this.stop();
    })(this);
    return setTimeout(() => {
      styleText += "opacity: .8;opacity: .8;-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=80)';filter: alpha(opacity=80);";
      return overlay_layer.setAttribute("style", styleText);
    }, 10);
  };

  private _get_position = (element: HTMLElement): string => element.getAttribute('data-position') || 'bottom';

  private _place_tooltip = (element: HTMLElement, tooltip_layer = this.element.querySelector<HTMLElement>('div.chardinjs-tooltip')) => {
    let tooltip_layer_position = this._get_offset(tooltip_layer);
    tooltip_layer.style.top = null;
    tooltip_layer.style.right = null;
    tooltip_layer.style.bottom = null;
    tooltip_layer.style.left = null;
    switch (this._get_position(element)) {
      case "top":
      case "bottom": {
        let target_element_position = this._get_offset(element);
        let target_width = target_element_position.width;
        tooltip_layer.style.left = ((target_width / 2) - (tooltip_layer_position.width / 2)) + "px";
        break;
      }
      case "left":
      case "right": {
        let target_element_position = this._get_offset(element);
        let target_height = target_element_position.height;
        tooltip_layer.style.top = ((target_height / 2) - (tooltip_layer_position.height / 2)) + "px";
      }
    }
    switch (this._get_position(element)) {
      case "left":
        return tooltip_layer.style.left = "-" + (tooltip_layer_position.width - 34) + "px";
      case "right":
        return tooltip_layer.style.right = "-" + (tooltip_layer_position.width - 34) + "px";
      case "bottom":
        return tooltip_layer.style.bottom = "-" + tooltip_layer_position.height + "px";
      case "top":
        return tooltip_layer.style.top = "-" + tooltip_layer_position.height + "px";
    }
  };

  private _position_helper_layer = (element: HTMLElement, helper_layer = this.element.querySelector<HTMLElement>(`div.chardinjs-helper-layer[data-id='${this.getId(element)}']`)) => {
    let element_position = this._get_offset(element);
    if (this.isVisible(element) && helper_layer) {
      return helper_layer.setAttribute("style", "display: block; width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px; left: " + element_position.left + "px;");
    }
    if (this.isVisible(element) && !helper_layer) {
      return this._show_element(element);
    }
    if (!this.isVisible(element) && helper_layer) {
      return helper_layer.setAttribute("style", "display: none; width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px; left: " + element_position.left + "px;");
    }
  };

  private isHidden = (element: HTMLElement): boolean => {
    const width = element.offsetWidth,
        height = element.offsetHeight;

    return (width === 0 && height === 0) ||
        ((element.style && element.style.display) || document.defaultView.getComputedStyle(element, 'display')) === "none";
  };

  private isVisible = (element: HTMLElement): boolean => !this.isHidden(element);

  private _show_element = (element: HTMLElement) => {
    let helper_layer = document.createElement("div");
    let tooltip_layer = document.createElement("div");
    let id = this.getId(element);
    if (id) {
      helper_layer.setAttribute("data-id", id);
    }
    helper_layer.className = "chardinjs-helper-layer chardinjs-" + (this._get_position(element));
    this._position_helper_layer(element, helper_layer);
    this.element.appendChild(helper_layer);
    tooltip_layer.className = "chardinjs-tooltip chardinjs-" + (this._get_position(element));
    tooltip_layer.innerHTML = "<div class='chardinjs-tooltiptext'>" + (element.getAttribute('data-intro')) + "</div>";
    helper_layer.appendChild(tooltip_layer);
    this._place_tooltip(element, tooltip_layer);
    element.className += " chardinjs-show-element";
    let current_element_position = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
      current_element_position = document.defaultView.getComputedStyle(element, null).getPropertyValue("position");
    }
    current_element_position = current_element_position.toLowerCase();
    if (current_element_position !== "absolute" && current_element_position !== "relative") {
      return element.className += " chardinjs-relative-position";
    }
  };

  private _get_offset = (element: HTMLElement): ClientRect => {
    let element_position = {
      width: element.offsetWidth,
      height: element.offsetHeight,
      top: 0,
      left: 0
    };
    element_position.top = element.getBoundingClientRect().top;
    element_position.left = element.getBoundingClientRect().left;
    return element.getBoundingClientRect();
  };

  private getId = (element: HTMLElement): string | undefined => {
    if (element.id) {
      return element.id;
    } else if (element.hasAttribute(this.idAttr)) {
      return element.getAttribute(this.idAttr);
    } else {
      return undefined;
    }
  };
}
