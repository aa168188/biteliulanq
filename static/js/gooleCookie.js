(function () {
  function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  }
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  var json_consent_status;
  var cookievalue = JSON.stringify(getCookie("consentstatus"))?.split('\\"');
  //默认意见
  if (cookievalue == undefined) {
    gtag("consent", "default", {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'wait_for_update': 500,
      region: [
          'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'
      ], // apply default to specific regions only
    });
  }
  //过往意见
  if (cookievalue != undefined) {
    if ((cookievalue == '"granted"')) {
      gtag("consent", "default", {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted',
        'wait_for_update': 500,
      });
    } else {
      gtag("consent", "default", {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'wait_for_update': 500,
      });
    }
  }

  function setCookies(json_consent_status) {
    var currentDate = new Date();
    var expirationDate = new Date(currentDate);
    expirationDate.setFullYear(currentDate.getFullYear() + 1);
    var expires = expirationDate.toUTCString();
    document.cookie = "consentstatus=" + json_consent_status + ";expires=" + expires + ";path=/";
  }
  //客户点击拒绝
  document.addEventListener('click', function (e) {
    const dom = e.target.closest('[class="button flex items-center justify-center border-bottom"]');
    json_consent_status = 'denied';
    setCookies(json_consent_status);
    gtag('consent', 'update', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied'
    });
  });
  //客户点击授权
  document.addEventListener('click', function (e) {
    const dom = e.target.closest('[class="button flex items-center justify-center"]');
    if (dom === null) return;
    json_consent_status = 'granted';
    setCookies(json_consent_status);
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
  });
})()
