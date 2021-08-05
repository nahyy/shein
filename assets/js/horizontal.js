!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});


(function() {
  const wrapper = document.getElementById("fold-effect");

  const folds = Array.from(document.getElementsByClassName("fold"));

  const baseContent = document.getElementById("base-content");

  let state = {
    disposed: false,
    targetScroll: 0,
    scroll: 0
  };

  function lerp(current, target, speed = 0.1, limit = 0.001) {
    let change = (target - current) * speed;
    if (Math.abs(change) < limit) {
      change = target - current;
    }
    return change;
  }
  let scaleFix = 0.992;

  class FoldedDom {
    constructor(wrapper, folds = null, scrollers = null) {
      this.wrapper = wrapper;
      this.folds = folds;
      this.scrollers = [];
    }
    setContent(baseContent, createScrollers = true) {
      const folds = this.folds;
      if (!folds) return;

      let scrollers = [];

      for (let i = 0; i < folds.length; i++) {
        const fold = folds[i];
        const copyContent = baseContent.cloneNode(true);
        copyContent.id = "";
        let scroller;
        if (createScrollers) {
          let sizeFixEle = document.createElement("div");
          sizeFixEle.classList.add("fold-size-fix");
          // sizeFixEle.style.transform = `scaleY(${scaleFix})`;

          scroller = document.createElement("div");
          scroller.classList.add("fold-scroller");
          sizeFixEle.append(scroller);
          fold.append(sizeFixEle);
        } else {
          scroller = this.scrollers[i];
        }
        scroller.append(copyContent);

        scrollers[i] = scroller;
      }
      this.scrollers = scrollers;
    }
    updateStyles(scroll) {
      const folds = this.folds;
      const scrollers = this.scrollers;

      for (let i = 0; i < folds.length; i++) {
        const scroller = scrollers[i];

        // Scroller fixed so its aligned
        // scroller.style.transform = `translateY(${100 * -i}%)`;
        // And the content is the one that scrolls
        scroller.children[0].style.transform = `translateX(${scroll}px)`;
      }
    }
  }

  let insideFold;

  const mainFold = folds[folds.length - 1];
  let tick = () => {
    if (state.disposed) return;

    // Calculate the scroll based on how much the content is outside the mainFold

    // state.targetScroll = -(
    //   document.documentElement.scrollLeft || document.body.scrollLeft
    // );
    state.targetScroll = Math.max(
      Math.min(0, state.targetScroll),
      -insideFold.scrollers[0].children[0].clientWidth + mainFold.clientWidth
    );
    state.scroll += lerp(state.scroll, state.targetScroll, 0.1, 0.0001);

    insideFold.updateStyles(state.scroll);

    requestAnimationFrame(tick);
  };
  /** ATTACH EVENTS */
  let lastClientX = null;
  let isDown = false;

  let onDown = ev => {
    // console.log(
    //   Math.max(
    //     state.targetScroll,
    //     -insideFold.scrollers[0].children[0].clientWidth + mainFold.clientWidth
    //   )
    // );
    console.log(
      "s",
      -insideFold.scrollers[0].children[0].clientWidth + mainFold.clientWidth
    );
    isDown = true;
  };
  let onUp = ev => {
    isDown = false;
  };

  window.addEventListener("mousedown", onDown);
  window.addEventListener("mouseup", onUp);
  window.addEventListener("mouseout", ev => {
    var from = ev.relatedTarget || ev.toElement;
    if (!from || from.nodeName == "HTML") {
      // stop your drag event here
      // for now we can just use an alert
      isDown = false;
    }
  });
  window.addEventListener("touchstart", onDown);
  window.addEventListener("touchend", onUp);
  window.addEventListener("touchcancel", onUp);

  window.addEventListener("mousemove", ev => {
    if (lastClientX && isDown) {
      state.targetScroll += ev.clientX - lastClientX;
    }
    lastClientX = ev.clientX;
  });

  window.addEventListener("touchmove", ev => {
    let touch = ev.touches[0];
    if (lastClientX && isDown) {
      state.targetScroll += ev.clientX - lastClientX;
    }
    lastClientX = ev.clientX;
  });

  window.addEventListener("wheel", ev => {
    // Fixefox delta is like 1px and chrome 100
    state.targetScroll += -Math.sign(ev.deltaY) * 30;
  });
  
  /***********************************/
  /********** Preload stuff **********/

  // Preload images
  const preloadImages = () => {
    return new Promise((resolve, reject) => {
      imagesLoaded(document.querySelectorAll('.content__img'), resolve);
    });
  };
  
  // And then..
  preloadImages().then(() => {
    // Remove the loader
    document.body.classList.remove('loading');
    // INITIALIZE
    insideFold = new FoldedDom(wrapper, folds);
    insideFold.setContent(baseContent);

    tick();
  });
})();
