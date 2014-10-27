window.SNB = window.SNB || {};
SNB.helpers = {
  parseLongUrl: function (text) {
    if (!text) {
      return text;
    }
    var display_url = "",
      display_url_pre = "",
      display_url_suf = "";

    var changeUrl = function (match_url, all) {
      //过滤雪球链接以及又拍云链接
      if (match_url.match(/xueqiu.com|xqdoc.b0.upaiyun.com/i)) {
        return all;
      }
      if (match_url) {

        if (match_url.indexOf("http://") !== -1 || match_url.indexOf("https://") !== -1) {
          display_url_pre = match_url.indexOf("http://") !== -1 ? "http://" : "https://";
        }
        var match_url_length = match_url.length;
        var display_url_pre_len = display_url_pre.length;
        var display_url_last_len = display_url_pre_len + 30 < match_url_length ? display_url_pre_len + 30 + 1 : match_url_length;
        display_url = match_url.substr(display_url_pre_len, display_url_last_len);

        var display_url_len = display_url.length;
        display_url_suf = match_url.substr(display_url_len + display_url_pre_len);

      }

      var url_html = ""
        + '<a href="' + match_url + '" class="xueqiu_timleine_link" target="_blank" title="' + match_url + '" >'
        + '<span class="" >' + display_url_pre + '</span>'
        + '<span class="js-display-url">' + display_url + '</span>';

      if (display_url_suf) {
        url_html += ""
          + '<span class="url_invisible" >' + display_url_suf + '</span>'
          + '<span class="url_ellipsis">'
          + '<span class="url_invisible" >&nbsp;</span>'
          + '…'
          + '</span>';
      }

      url_html += '</a>';
      return url_html;
    };

    var LinkReg = /<a href=(['"].+?['"\s])[^>]*>[^<]+<\/a>/g;
    text = text.replace(LinkReg, function (all, match_url) {
      match_url = match_url.substr(1, match_url.length - 2);
      all = changeUrl(match_url, all);
      return all;
    });

    return text;
  },
  queryUrl: function (url, separator, key) {
    url = url.replace(/^[^?=]*\?/ig, '').split('#')[0];
    separator = separator || '&';
    key = key || '';
    var json = {};
    url.replace(new RegExp('(^|' + separator + ')([^' + separator + '=]+)=([^' + separator + ']*)', 'g'), function (a, b, key, value) {
      try {
        key = decodeURIComponent(key).replace(/^[\s\uFEFF\xa0\u3000]+|[\uFEFF\xa0\u3000\s]+$/g, "");
      } catch (e) {
      }
      try {
        value = decodeURIComponent(value);
      } catch (e) {
      }
      if (!(key in json)) {
        json[key] = /\[\]$/.test(key) ? [value] : value;
      }
      else if (json[key] instanceof Array) {
        json[key].push(value);
      }
      else {
        json[key] = [json[key], value];
      }
    });
    return key ? json[key] : json;
  },
  keys: (function () {
    return Object.keys || function (obj) {
      var a = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          a.push(key);
        }
      }
      return a;
    };
  })()
};

SNB.Image = SNB.Image || {
  default_30: "community/default/avatar.png!30x30.png",
  default_50: "community/default/avatar.png!50x50.png",
  default_180: "community/default/avatar.png!180x180.png",
  zoomIn: function (imageElm) {
    var image_zoomIn = imageElm.attr("src"),
      endIndex = image_zoomIn.indexOf("%21custom.jpg") != -1 ? image_zoomIn.indexOf("%21custom.jpg") : image_zoomIn.indexOf("!custom.jpg");
    if (endIndex == -1) {
      return;
    }
    var image_zoomOut = image_zoomIn.substr(0, endIndex),
      $html = "<a class='zoom' href='" + image_zoomOut + "'target='_blank'><i></i><span>查看原图</span></a>";
    if (imageElm.next().is('br')) {
      imageElm.next().remove();
    }
    imageElm.after($html);
  },
  lazyload: function (text) {
    return text.replace(/<img(.*?)src="?(https?:\/\/xqimg.*?custom.jpg)"?(.*?)\/?>/gi, '<img$1src="http://assets.imedao.com/images/blank.png" data-image="$2"$3/>');
  },
  getProfileImage: function (profile_image_url, size) {
    profile_image_url = profile_image_url && profile_image_url.split(",") || [];
    var img = SNB.domain.photo + "/" + (profile_image_url.length > 3 ? profile_image_url[3] : (profile_image_url.length == 1 ? profile_image_url[0] : 'community/default/avatar.png!30x30.png'));
    img = typeof size !== "undefined" ? img.replace(/([0-9]+)x([0-9]+)/, size + "x" + size) : img;
    return img;
  }
};

//默认的ajax注入filter
//自动携带access_token
//jQuery.ajaxPrefilter(function (s) {
//  if (s.type.toLowerCase() !== 'get' || s.dataType === 'script') {
//    return;
//  }
//  if (s.url.search('http://api.xueqiu.com') === 0) {
//    s.url = s.url.substr(21);
//  }
//  if (!s.data) {
//    s.data = 'access_token=' + SNB.Util.getAccessToken();
//  }
//  if (s.data && s.data.indexOf('access_token=') === -1) {
//    s.data += '&access_token=' + SNB.Util.getAccessToken();
//  }
//});

/*
 * jQuery插件
 * */

//让jQuery在高等浏览器下支持原生动画
(function ($) {

  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap'),
          transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd otransitionend',
            'transition': 'transitionend'
          }, ret;

        for (var name in transEndEventNames) {
          if (el.style[name] !== undefined) {
            ret = transEndEventNames[name];
          }
        }
        return ret;
      }());

      return transitionEnd && {
        end: transitionEnd
      };

    })();

  });

})(window.jQuery);

//序列化Form
(function ($) {
  function serialize(form) {
    if (!form) {
      return;
    }
    form = $(form);
    var nodeList = [].slice.call(form.find('select,input,textarea'), 0),
      ret = {};
    $.each(nodeList, function () {
      var el = this,
        type = el.type;
      if (!el.name || el.disabled || type == 'submit' || type == 'reset' || type == 'file' || type == 'image') {
        return;
      }
      var name = el.name,
        value = (function () {
          if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) {
            return '';
          }
          if (el.value && $.trim(el.value) !== '') {
            return el.value;
          }
          return '';
        })();
      if (name && typeof ret[name] === 'undefined') {
        ret[name] = '';
      }
      if (value !== '') {
        if (ret[name] === '') {
          ret[name] = value;
        } else {
          if (typeof ret[name] === 'string') {
            ret[name] = [ret[name]];
          }
          ret[name].push(value);
        }
      }
    });
    return ret;
  }

  $.fn.formSerialize = function () {
    var form = this[0];
    return (form && form.tagName.toLowerCase() === 'form') ? serialize(form) : {};
  };

  // TODO
  // fix $.browser
  $.browser = {};

  $.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
  $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
  $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
  $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
})(jQuery);
