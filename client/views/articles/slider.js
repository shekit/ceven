var sign;

sign = function(x) {
  if (x >= 0) {
    return 1;
  } else {
    return -1;
  }
};

Template.wrapper.helpers({
  templateNames: function() {
    var templateNames;
    templateNames = ['timeToRead', 'articleOne', 'articleTwo', 'articleThree', 'articleFour', 'articleFive', 'articleSix', 'articleSeven', 'rateDigest'];
    return templateNames;
  }
});

Template.slider.helpers({
  pages: function() {
    var pages;
    pages = _.map(this.templateNames, function(name) {
      return {
        name: name,
        template: Template[name]
      };
    });
    return pages;
  }
});

Template.slider.rendered = function() {
  var _ref, _ref1;
  this.numPages = (_ref = this.data) != null ? (_ref1 = _ref.templateNames) != null ? _ref1.length : void 0 : void 0;
  this.startX = 0;
  this.mouseDown = false;
  this.mouseX = 0;
  return this.posX = 0;
};

Template.slider.events({
  'mousedown .pages': function(e, t) {
    var clickX, pages;
    console.log("mousedown");
    pages = $(e.currentTarget);
    pages.removeClass('animate');
    clickX = e.pageX;
    t.startX = clickX;
    t.mouseX = clickX;
    return t.mouseDown = true;
  },
  'touchstart .pages': function(e, t) {
    var clickX, pages;
    console.log("touchstart");
    pages = $(e.currentTarget);
    pages.removeClass('animate');
    console.log(e);
    clickX = e.originalEvent.touches[0].pageX;
    t.startX = clickX;
    t.mouseX = clickX;
    return t.mouseDown = true;
  },
  'mousemove .pages': function(e, t) {
    var changeX, mouseX, pageWidth, pages, posX, width;
    if (t.mouseDown) {
      console.log("move");
      pages = $(e.currentTarget);
      width = pages.width();
      pageWidth = width / t.numPages;
      mouseX = e.pageX;
      t.velX = mouseX - t.mouseX;
      t.mouseX = mouseX;
      changeX = mouseX - t.startX;
      t.changeX = changeX;
      posX = changeX + t.posX;
      posX = Math.min(0, posX);
      posX = Math.max(-(width - pageWidth), posX);
      return $(e.currentTarget).css('transform', 'translate3d(' + posX + 'px,0,0)');
    }
  },
  'touchmove .pages': function(e, t) {
    var changeX, mouseX, pageWidth, pages, posX, width;
    e.preventDefault();
    if (t.mouseDown) {
      console.log("move");
      pages = $(e.currentTarget);
      width = pages.width();
      pageWidth = width / t.numPages;
      mouseX = e.originalEvent.touches[0].pageX;
      t.velX = mouseX - t.mouseX;
      t.mouseX = mouseX;
      changeX = mouseX - t.startX;
      t.changeX = changeX;
      posX = changeX + t.posX;
      posX = Math.min(0, posX);
      posX = Math.max(-(width - pageWidth), posX);
      $(e.currentTarget).css('transform', 'translate3d(' + posX + 'px,0,0)');
    }
    return false;
  },
  'mouseup, mouseout': function(e, t) {
    var momentum, pageIndex, pageWidth, pages, posX, snapX;
    if (t.mouseDown) {
      console.log("up");
      posX = t.changeX + t.posX;
      pages = $(t.find('.pages'));
      pageWidth = pages.width() / t.numPages;
      momentum = Math.abs(10 * t.velX) || 0;
      momentum = Math.min(momentum, pageWidth / 2);
      momentum = momentum * sign(t.velX);
      pageIndex = Math.round((-posX - momentum) / pageWidth);
      pageIndex = Math.min(Math.max(0, pageIndex), t.numPages - 1);
      snapX = (-pageWidth * pageIndex) || 0;
      t.posX = snapX;
      pages.addClass('animate').css('transform', 'translate3d(' + snapX + 'px,0,0)');
      t.velX = 0;
      t.startX = 0;
      t.mouseX = 0;
      t.changeX = 0;
      return t.mouseDown = false;
    }
  },
  'touchend, touchcancel': function(e, t) {
    var momentum, pageIndex, pageWidth, pages, posX, snapX;
    if (t.mouseDown) {
      console.log("up");
      posX = t.changeX + t.posX;
      pages = $(t.find('.pages'));
      pageWidth = pages.width() / t.numPages;
      momentum = Math.abs(10 * t.velX) || 0;
      momentum = Math.min(momentum, pageWidth / 2);
      momentum = momentum * sign(t.velX);
      pageIndex = Math.round((-posX - momentum) / pageWidth);
      pageIndex = Math.min(Math.max(0, pageIndex), t.numPages - 1);
      snapX = (-pageWidth * pageIndex) || 0;
      t.posX = snapX;
      pages.addClass('animate').css('transform', 'translate3d(' + snapX + 'px,0,0)');
      t.velX = 0;
      t.startX = 0;
      t.mouseX = 0;
      t.changeX = 0;
      return t.mouseDown = false;
    }
  }
});