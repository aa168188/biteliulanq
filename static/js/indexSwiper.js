//获取cookie值的函数
function getCookie(cname) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    // console.log(c)
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
  }
  return ''
}

// 前往注册页
function reglink() {
  var callback = function () {
    const currentLanguage = getCookie('currentLanguage')
    if (currentLanguage) {
      var url = `https://client.bitbrowser.cn/register?lang=${currentLanguage}`
      var code = getCookie('code')
      if (code) {
        url = url + '&code=' + code
      }
      window.open(url)
    }
  }
  callback()
  return false
}

$(function () {
  // 行业资讯导航菜单高亮
  var tag = window.location.pathname
  if (tag.includes('/blog/') || tag.includes('/news/')) {
    $('.subMenuBlog').show().siblings('ul').hide()
    $('.blogTitle').show().siblings('span').hide()
    if (tag.includes('/blog/')) {
      $('#navMenu .on').removeClass('on')
      $('#navMenu .blogtag').addClass('on')
    } else if (tag.includes('/news/')) {
      $('#navMenu .on').removeClass('on')
      $('#navMenu .newstag').addClass('on')
    }
  }
  const caseDetailMenu = ['dzsw', 'ggct', 'rcsx', 'wlpc', 'lltl']
  if (tag.includes('/morecase/')) {
    $('.subMenuCase').show().siblings('ul').hide()
    $('.caseTitle').show().siblings('span').hide()
    caseDetailMenu.forEach(item => {
      if (tag.includes(item)) {
        $('.' + item)
          .siblings('li')
          .removeClass('on')
        $('.' + item).addClass('on')
      }
    })
  }
  if (tag.includes('/updatelog/')) {
    $('.subMenuLog').show().siblings('ul').hide()
    $('.logTitle').show().siblings('span').hide()
  }
  const code = getQueryVariable('code')
  if (code) {
    const codeResult = code.match(/^[a-z0-9]+/)
    if (codeResult) {
      setCookie('code', codeResult[0], 365)
    }
  }
  showSignupPopup()
  $('#signpopup').on('click', toRegisterAndClose)
  $('#priceRegister').on('click', reglink)
  $('#bannerRegister').on('click', reglink)
  // 显示signup弹出框
  function showSignupPopup() {
    const url = new URL(document.location)
    if (url.searchParams.get('signup') === '1') {
      $('.signup-popup').show()
    }
    // 点X关闭signup弹出框
    $('.signup-popup .close').on('click', () => {
      $('.signup-popup').hide()
    })
  }
  // 前往注册页病关闭signup弹出框
  function toRegisterAndClose() {
    reglink()
    $('.signup-popup').hide()
  }

  //获取url 参数
  function getQueryVariable(variable) {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false
  }
  //设置cookie值的函数
  function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + d.toGMTString()
    document.cookie = cname + '=' + cvalue + ';' + expires
  }
})
window.onload = function () {
  // 生态轮播
  const ecoSwiper = new Swiper('.ecology-container .swiper-container', {
    loop: false,
    spaceBetween: 30,
    on: {
      slideChange: function () {
        let li = $('.ecology-container .nav ul li')
        $(li).siblings().removeClass('activeLi')
        $(li[this.activeIndex]).addClass('activeLi')
      }
    }
  })
  $('.ecology-container .nav ul li').on('mouseenter', function () {
    $(this).addClass('activeLi')
    $(this).siblings().removeClass('activeLi')
    ecoSwiper.slideTo($(this).index())
  })
  // 客户轮播
  const swiper = new Swiper('#everyUser .swiper-container', {
    slidesPerView: window.outerWidth <= 768 ? 1 : 3,
    spaceBetween: 24,
    grabCursor: true
  })
  const bannerSwiper = new Swiper('#banner-swiper', {
    on: {
      slideChange: function () {
        $('#banner-swiper').off('click', '#bannerRegister')
        // 确保轮播后重新绑定点击事件
        $('#banner-swiper').on('click', '#bannerRegister', reglink)
      }
    },
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      autoplayStopOnLast: false
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true // 允许点击分页器切换
    }
  })
  bannerSwiper.el.addEventListener('mouseenter', () => {
    bannerSwiper.autoplay.stop()
  })
  bannerSwiper.el.addEventListener('mouseleave', () => {
    bannerSwiper.autoplay.start()
  })
}
