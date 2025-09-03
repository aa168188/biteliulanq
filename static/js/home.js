$(function () {
  $('#banner-swiper .golink').on('click', function (e) {
    const link = $(this).data('golink')
    // 如果当前是首页 并且
    if (location.pathname === '/home' || location.pathname === '/') {
      if (link === 'phone') {
        let url = ''
        if (location.hostname === 'localhost') {
          url = 'cloudphonetep'
        } else {
          url = 'cloudphone'
        }
        window.open(url, '_blank')
      } else {
        window.open('/', '_self')
      }
    }
  })
  $('.gophone').each((item, el) => {
    const href = $(el).attr('href')
    $(el).attr('href', href)
  })
  $('#banner-swiper a').on('click', function (event) {
    event.stopPropagation()
  })
})
