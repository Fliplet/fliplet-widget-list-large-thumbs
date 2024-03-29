window.ui = window.ui || {};
Fliplet.Widget.instance('list-thumb-l', function(data) {
  var $container = $(this);
  var _this = this;

  Fliplet().then(function() {
    var swipeToSaveLabel = data.swipeToSaveLabel || T('widgets.list.largeThumbs.defaultListName');

    $container.translate({ swipeToSaveLabel: swipeToSaveLabel });

    if (data.swipeToSave) {
      ui['swipeSavedList' + $container.attr('data-list-thumb-l-uuid')] = new SwipeSaveList(_this, {
        savedListLabel: swipeToSaveLabel
      });
    }
  });

  function authenticateImages() {
    _.forEach(data.items, function(item) {
      if (!_.get(item, 'imageConf.url') || !Fliplet.Media.isRemoteUrl(item.imageConf.url)) {
        return;
      }

      $container.find('.has-image[data-thumb-l-item-id="' + item.id + '"] .list-image').css({
        backgroundImage: 'url(' + Fliplet.Media.authenticate(item.imageConf.url) + ')'
      });
    });
  }

  $container.on('click', '.linked[data-thumb-l-item-id]', function(event) {
    event.preventDefault();

    if ($(this).parents('.list-swipe.swiping').length) {
      return;
    }

    var itemData = _.find(data.items, {
      id: $(this).data('thumb-l-item-id')
    });

    if (_.get(itemData, 'linkAction') && !_.isEmpty(itemData.linkAction)) {
      Fliplet.Navigate.to(itemData.linkAction);
    }
  });

  Fliplet().then(authenticateImages);
});
