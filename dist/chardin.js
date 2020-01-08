var Chardin = /** @class */ (function () {
    function Chardin(element, idAttr) {
        var _this_1 = this;
        if (idAttr === void 0) { idAttr = 'id'; }
        this.element = element;
        this.idAttr = idAttr;
        this.start = function () {
            if (_this_1._overlay_visible) {
                return _this_1;
            }
            _this_1._add_overlay_layer();
            var ref = _this_1.element.querySelectorAll('*[data-intro]');
            ref.forEach(function (el) {
                if (_this_1.isVisible(el)) {
                    _this_1._show_element(el);
                }
            });
            _this_1.element.dispatchEvent(new Event('chardinJs:start'));
        };
        this.toggle = function () {
            if (!_this_1._overlay_visible) {
                _this_1.start();
            }
            else {
                _this_1.stop();
            }
        };
        this.refresh = function () {
            if (_this_1._overlay_visible) {
                var ref = _this_1.element.querySelectorAll('*[data-intro]');
                var results_1 = [];
                ref.forEach(function (el) {
                    results_1.push(_this_1._position_helper_layer(el));
                });
            }
        };
        this.stop = function () {
            _this_1.element.querySelectorAll(".chardinjs-overlay").forEach(function (e) { return _this_1.fadeOutEffect(e); });
            _this_1.element.querySelectorAll('.chardinjs-helper-layer').forEach(function (e) { return e.remove(); });
            _this_1.element.querySelectorAll('.chardinjs-show-element').forEach(function (e) { return e.classList.remove('chardinjs-show-element'); });
            _this_1.element.querySelectorAll('.chardinjs-relative-position').forEach(function (e) { return e.classList.remove('chardinjs-relative-position'); });
            var ref = _this_1.element.querySelectorAll('*[data-intro]');
            ref.forEach(function (el) {
                el.dataset.helper_layer = null;
                el.dataset.tooltip_layer = null;
            });
            window.removeEventListener("keydown", window.onkeydown, true);
            _this_1.element.dispatchEvent(new Event('chardinJs:stop'));
        };
        this.fadeOutEffect = function (element) {
            var fadeEffect = setInterval(function () {
                if (!element.style.opacity) {
                    element.style.opacity = '1';
                }
                var opacity = Number(element.style.opacity);
                if (opacity > 0) {
                    element.style.opacity = String(opacity - 0.1);
                }
                else {
                    clearInterval(fadeEffect);
                    element.remove();
                }
            }, 50);
        };
        this._add_overlay_layer = function () {
            if (_this_1._overlay_visible) {
                return false;
            }
            var overlay_layer = document.createElement("div");
            var styleText = "";
            overlay_layer.className = "chardinjs-overlay";
            if (_this_1.element.tagName === "BODY") {
                styleText += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;";
                overlay_layer.setAttribute("style", styleText);
            }
            else {
                var element_position = _this_1._get_offset(_this_1.element);
                if (element_position) {
                    styleText += "width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px;left: " + element_position.left + "px;";
                    overlay_layer.setAttribute("style", styleText);
                }
            }
            _this_1.element.appendChild(overlay_layer);
            overlay_layer.onclick = (function (_this) {
                return function () { return _this.stop(); };
            })(_this_1);
            return setTimeout(function () {
                styleText += "opacity: .8;opacity: .8;-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=80)';filter: alpha(opacity=80);";
                return overlay_layer.setAttribute("style", styleText);
            }, 10);
        };
        this._get_position = function (element) { return element.getAttribute('data-position') || 'bottom'; };
        this._place_tooltip = function (element, tooltip_layer) {
            if (tooltip_layer === void 0) { tooltip_layer = _this_1.element.querySelector('div.chardinjs-tooltip'); }
            var tooltip_layer_position = _this_1._get_offset(tooltip_layer);
            tooltip_layer.style.top = null;
            tooltip_layer.style.right = null;
            tooltip_layer.style.bottom = null;
            tooltip_layer.style.left = null;
            switch (_this_1._get_position(element)) {
                case "top":
                case "bottom": {
                    var target_element_position = _this_1._get_offset(element);
                    var target_width = target_element_position.width;
                    tooltip_layer.style.left = ((target_width / 2) - (tooltip_layer_position.width / 2)) + "px";
                    break;
                }
                case "left":
                case "right": {
                    var target_element_position = _this_1._get_offset(element);
                    var target_height = target_element_position.height;
                    tooltip_layer.style.top = ((target_height / 2) - (tooltip_layer_position.height / 2)) + "px";
                }
            }
            switch (_this_1._get_position(element)) {
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
        this._position_helper_layer = function (element, helper_layer) {
            if (helper_layer === void 0) { helper_layer = _this_1.element.querySelector("div.chardinjs-helper-layer[data-id='" + _this_1.getId(element) + "']"); }
            var element_position = _this_1._get_offset(element);
            if (_this_1.isVisible(element) && helper_layer) {
                return helper_layer.setAttribute("style", "display: block; width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px; left: " + element_position.left + "px;");
            }
            if (_this_1.isVisible(element) && !helper_layer) {
                return _this_1._show_element(element);
            }
            if (!_this_1.isVisible(element) && helper_layer) {
                return helper_layer.setAttribute("style", "display: none; width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px; left: " + element_position.left + "px;");
            }
        };
        this.isHidden = function (element) {
            var width = element.offsetWidth, height = element.offsetHeight;
            return (width === 0 && height === 0) ||
                ((element.style && element.style.display) || document.defaultView.getComputedStyle(element, 'display')) === "none";
        };
        this.isVisible = function (element) { return !_this_1.isHidden(element); };
        this._show_element = function (element) {
            var helper_layer = document.createElement("div");
            var tooltip_layer = document.createElement("div");
            var id = _this_1.getId(element);
            if (id) {
                helper_layer.setAttribute("data-id", id);
            }
            helper_layer.className = "chardinjs-helper-layer chardinjs-" + (_this_1._get_position(element));
            _this_1._position_helper_layer(element, helper_layer);
            _this_1.element.appendChild(helper_layer);
            tooltip_layer.className = "chardinjs-tooltip chardinjs-" + (_this_1._get_position(element));
            tooltip_layer.innerHTML = "<div class='chardinjs-tooltiptext'>" + (element.getAttribute('data-intro')) + "</div>";
            helper_layer.appendChild(tooltip_layer);
            _this_1._place_tooltip(element, tooltip_layer);
            element.className += " chardinjs-show-element";
            var current_element_position = "";
            if (document.defaultView && document.defaultView.getComputedStyle) {
                current_element_position = document.defaultView.getComputedStyle(element, null).getPropertyValue("position");
            }
            current_element_position = current_element_position.toLowerCase();
            if (current_element_position !== "absolute" && current_element_position !== "relative") {
                return element.className += " chardinjs-relative-position";
            }
        };
        this._get_offset = function (element) {
            var element_position = {
                width: element.offsetWidth,
                height: element.offsetHeight,
                top: 0,
                left: 0
            };
            element_position.top = element.getBoundingClientRect().top;
            element_position.left = element.getBoundingClientRect().left;
            return element.getBoundingClientRect();
        };
        this.getId = function (element) {
            if (element.id) {
                return element.id;
            }
            else if (element.hasAttribute(_this_1.idAttr)) {
                return element.getAttribute(_this_1.idAttr);
            }
            else {
                return undefined;
            }
        };
        window.addEventListener('resize', function () { return _this_1.refresh(); });
    }
    Object.defineProperty(Chardin.prototype, "_overlay_visible", {
        get: function () {
            return this.element.querySelectorAll('.chardinjs-overlay').length !== 0;
        },
        enumerable: true,
        configurable: true
    });
    return Chardin;
}());
export { Chardin };
//# sourceMappingURL=chardin.js.map