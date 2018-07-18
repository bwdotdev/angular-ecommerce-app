var bannerCarouselAutoPlayItems = [];

function bannerRight($banner, duration) {
  if($banner.data('animating')) return;

  duration = duration || 800;

  const $current = $banner.find('.banner.item.visible').removeClass('visible');
  const $next = $current.next();

  const left = $banner.scrollLeft();
  $banner.data('animating', true);
  $banner.animate({scrollLeft: left + $current.width()}, duration, function() {
    $current.appendTo($banner);
    $banner.scrollLeft(left);
    $banner.data('animating', false);
  });
  $next.addClass('visible');
}

function bannerLeft($banner, duration) {
  if($banner.data('animating')) return;

  duration = duration || 800;

  const $current = $banner.find('.banner.item.visible').removeClass('visible');
  const $next = $current.prev().length > 1 ? $current.prev() : $banner.find('.banner.item:last-child');
  const left = $banner.scrollLeft() + $next.width();

  $next.prependTo($banner);
  $banner.scrollLeft(left);

  $banner.data('animating', true);
  $banner.animate({scrollLeft: left - $current.width()}, duration, function() {
    $banner.data('animating', false);
  });
  $next.addClass('visible');
}

$.fn.bannerCarousel = function(args) {
  args = Object.assign({}, {
    autoPlay: false
  }, args);

  $(this).each(function() {
    const $this = $(this);
    const $bannerItems = $this.find('.banner.items');

    $bannerItems.find('.banner.item img').attr('draggable', 'false');
    $bannerItems.scrollLeft(0);
    $bannerItems.find('.banner.item:first-child').addClass('visible');

    $bannerItems.find('.banner.item:not(:first-child) img').each(function() {
      $.get(this.src); // Pre-load banner images
    });

    if(args.autoPlay) {
    bannerCarouselAutoPlayItems.push($bannerItems);
    }
  });

  $('.banner.container .right.button').on('click', function(e) {
    e.preventDefault();

    bannerRight($(this).siblings('.banner.items'));
  });
  $('.banner.container .left.button').on('click', function(e) {
    e.preventDefault();

    bannerLeft($(this).siblings('.banner.items'));
  });
};

setInterval(() => {
  bannerCarouselAutoPlayItems.forEach(function($elem) {
    bannerRight($elem);
  });
}, 3000);
